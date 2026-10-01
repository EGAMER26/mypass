import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";

type LegacyUser = { email?: string; nome?: string; senha?: string; profilePic?: string; typeAuth?: string; senhasSalvas?: Array<{ nome?: string; senha?: string }> };

async function main() {
  const source = process.env.MOCKAPI_URL ?? "https://683f2e401cd60dca33de8bbb.mockapi.io/users";
  const key = Buffer.from(process.env.VAULT_ENCRYPTION_KEY ?? "", "base64");
  if (key.length !== 32) throw new Error("VAULT_ENCRYPTION_KEY must contain 32 bytes in base64");

  function encryptSecret(secret: string) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
    return [iv, cipher.getAuthTag(), encrypted].map((part) => part.toString("base64url")).join(".");
  }

  const db = new PrismaClient();
  try {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Source API failed: ${response.status}`);
    const users = (await response.json()) as LegacyUser[];
    let migratedUsers = 0;
    let migratedItems = 0;

    for (const legacy of users) {
      if (!legacy.email) continue;
      const email = legacy.email.trim().toLowerCase();
      const passwordHash = legacy.senha?.startsWith("$2") ? legacy.senha : null;
      const user = await db.user.upsert({
        where: { email },
        update: { name: legacy.nome, image: legacy.profilePic || null, ...(passwordHash ? { passwordHash } : {}) },
        create: { email, name: legacy.nome, image: legacy.profilePic || null, passwordHash, provider: legacy.typeAuth === "google" ? "google" : "credentials" },
      });
      const existingItems = await db.vaultItem.count({ where: { userId: user.id } });
      if (existingItems === 0) for (const item of legacy.senhasSalvas ?? []) {
        if (!item.senha) continue;
        await db.vaultItem.create({ data: { userId: user.id, name: (item.nome || "Senha").slice(0, 120), ciphertext: encryptSecret(item.senha) } });
        migratedItems += 1;
      }
      migratedUsers += 1;
    }
    console.log(`Migration complete: ${migratedUsers} users and ${migratedItems} vault items.`);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Migration failed");
  process.exitCode = 1;
});
