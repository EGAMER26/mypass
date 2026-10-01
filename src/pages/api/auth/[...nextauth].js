import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; // Certifique-se de ter instalado esta biblioteca
import { db } from "@/server/db";
import { emailSchema } from "@/server/validation";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // A label para o formulário de login
      name: "Email e Senha",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const parsedEmail = emailSchema.safeParse(credentials.email);
        if (!parsedEmail.success) return null;
        const email = parsedEmail.data;
        const password = String(credentials.password);
        const user = await db.user.findUnique({ where: { email } });

        if (!user?.passwordHash) return null;

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (passwordMatch) {
          return { id: user.id, email: user.email, name: user.name, tipeAuth: "trad" };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production" },
    },
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        const localUser = user.email ? await db.user.findUnique({ where: { email: user.email.toLowerCase() }, select: { id: true } }) : null;
        token.userId = localUser?.id ?? user.id;
        token.name = user.name;
        token.email = user.email;
        token.tipeAuth = user.tipeAuth ?? (account?.provider === "google" ? "google" : "trad");
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: String(token.userId),
        name: token.name,
        email: token.email,
        image: session.user?.image,
      };
      session.userId = String(token.userId);
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        await db.user.upsert({
          where: { email: user.email.toLowerCase() },
          update: { name: user.name, image: user.image, provider: "google" },
          create: { email: user.email.toLowerCase(), name: user.name, image: user.image, provider: "google" },
        });
      }
      return true;
    },
  },
  pages: {
    signIn: "/", // Página personalizada de login
  },
};

export default NextAuth(authOptions);
