import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "@/server/db";
import { z } from "zod";

const profileSchema = z.object({ name: z.string().trim().min(1).max(120), email: z.string().trim().toLowerCase().email().max(320) }).strict();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as unknown as AuthOptions);
  const userId = session?.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  if (req.method !== "PATCH") return res.status(405).json({ error: "Method not allowed" });
  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid profile" });
  const duplicate = await db.user.findFirst({ where: { email: parsed.data.email, NOT: { id: userId } } });
  if (duplicate) return res.status(409).json({ error: "Email already in use" });
  const user = await db.user.update({ where: { id: userId }, data: parsed.data });
  return res.status(200).json({ id: user.id, name: user.name, email: user.email });
}
