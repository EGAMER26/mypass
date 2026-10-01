import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { db } from "@/server/db";
import { emailSchema, passwordSchema } from "@/server/validation";
import { rateLimit } from "@/server/rate-limit";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0] ?? "unknown";
  if (!rateLimit(`register:${ip}`, 5, 60_000)) return res.status(429).json({ error: "Too many requests" });

  const parsed = passwordSchema.safeParse(req.body?.password);
  const email = emailSchema.safeParse(req.body?.email);
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!parsed.success || !email.success || name.length < 1 || name.length > 120) {
    return res.status(400).json({ error: "Invalid account data" });
  }
  const exists = await db.user.findUnique({ where: { email: email.data } });
  if (exists) return res.status(409).json({ error: "Account already exists" });
  const passwordHash = await bcrypt.hash(parsed.data, 12);
  const user = await db.user.create({ data: { email: email.data, name, passwordHash, provider: "credentials" } });
  return res.status(201).json({ id: user.id, email: user.email, name: user.name });
}
