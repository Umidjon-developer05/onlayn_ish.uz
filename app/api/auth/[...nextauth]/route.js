import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Users from "@/models/Users";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const isAdminEmail = user.email === process.env.NEXT_PUBLIC_EMAIL;
        const isAdmin = isAdminEmail ? "Admin" : "User";
        await Users.create({
          IsAdmin: isAdmin,
        });
      } catch (error) {
        console.error("Error creating user:", error);
      }
      return true;
    },
    async jwt({ token }) {
      if (token.email === process.env.NEXT_PUBLIC_GitHub) {
        token.role = "admin";
      } else {
        token.role = "member";
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
