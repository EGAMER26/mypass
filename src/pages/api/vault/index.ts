import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/server/db";
import { decryptSecret, encryptSecret } from "@/server/vault";
import { vaultItemSchema } from "@/server/validation";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  const session = await getServerSession(req, res, authOptions as unknown as AuthOptions);
  const userId = session?.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const items = await db.vaultItem.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
    return res.status(200).json(items.map((item) => ({ id: item.id, name: item.name, password: decryptSecret(item.ciphertext), createdAt: item.createdAt })));
  }
  if (req.method === "POST") {
    const parsed = vaultItemSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid vault item" });
    const item = await db.vaultItem.create({ data: { userId, name: parsed.data.name, ciphertext: encryptSecret(parsed.data.password) } });
    return res.status(201).json({ id: item.id, name: item.name, password: parsed.data.password, createdAt: item.createdAt });
  }
  if (req.method === "PUT") {
    const items = z.array(vaultItemSchema).max(500).safeParse(req.body?.items);
    if (!items.success) return res.status(400).json({ error: "Invalid vault" });
    await db.$transaction([
      db.vaultItem.deleteMany({ where: { userId } }),
      db.vaultItem.createMany({ data: items.data.map((item) => ({ userId, name: item.name, ciphertext: encryptSecret(item.password) })) }),
    ]);
    return res.status(204).end();
  }
  return res.status(405).json({ error: "Method not allowed" });
}
