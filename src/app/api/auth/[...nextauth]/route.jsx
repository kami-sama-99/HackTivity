// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // Ensure this import points to your Firebase client configuration

const handler = NextAuth({
  providers: [
    // Email/Password Authentication via Firebase
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const user = userCredential.user;

          if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in.");
          }

          return { email: user.email, id: user.uid };
        } catch (error) {
          console.error("Error during sign-in:", error.message);
          throw new Error(error.message || "Invalid credentials");
        }
      },
    }),

    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // GitHub OAuth Provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days session expiry
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id || token.id;
        token.email = user.email || token.email;
      }

      if (account && account.provider === "google") {
        // Store additional information for Google OAuth
        token.provider = "google";
      }

      if (account && account.provider === "github") {
        // Store additional information for GitHub OAuth
        token.provider = "github";
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          provider: token.provider || null, // Add provider information to session
        };
      }
      return session;
    },
  }
});

export { handler as GET, handler as POST };
