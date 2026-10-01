import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email().max(320);
export const passwordSchema = z.string().min(12).max(256);
export const vaultItemSchema = z.object({
  name: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(4096),
}).strict();
