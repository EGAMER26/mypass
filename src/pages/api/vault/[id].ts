import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/server/db";
import { encryptSecret } from "@/server/vault";
import { z } from "zod";

const updateSchema = z.object({ name: z.string().trim().min(1).max(120).optional(), password: z.string().min(1).max(4096).optional() }).strict();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as unknown as AuthOptions);
  const userId = session?.user?.id;
  const id = typeof req.query.id === "string" ? req.query.id : "";
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const item = await db.vaultItem.findFirst({ where: { id, userId } });
  if (!item) return res.status(404).json({ error: "Not found" });
  if (req.method === "DELETE") {
    await db.vaultItem.delete({ where: { id: item.id } });
    return res.status(204).end();
  }
  if (req.method === "PATCH") {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid vault item" });
    const updated = await db.vaultItem.update({ where: { id: item.id }, data: { name: parsed.data.name, ...(parsed.data.password ? { ciphertext: encryptSecret(parsed.data.password) } : {}) } });
    return res.status(200).json({ id: updated.id, name: updated.name });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
