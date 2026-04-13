import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { getUsers, saveUsers } from "@/lib/users-db"
import { v4 as uuidv4 } from 'uuid'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true, // Requerido: vincula cuentas con el mismo email automáticamente
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const users = getUsers()
        const user = users.find((u: any) => u.email === credentials.email)

        if (!user) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        )

        if (!passwordMatch) return null

        return {
          id: user.id,
          name: user.full_name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Sincronización con DB local si el usuario entra por GitHub
      if (account?.provider === "github") {
        const users = getUsers()
        const existingUser = users.find((u: any) => u.email === user.email)
        
        if (!existingUser && user.email) {
          const newUser = {
            id: user.id || uuidv4(),
            full_name: user.name || "GitHub User",
            email: user.email,
            password_hash: "OAUTH_USER", 
            created_at: new Date().toISOString(),
          }
          users.push(newUser)
          saveUsers(users)
        }
        return true
      }
      return true
    },
  },
  pages: {
    signIn: "/login",
  },
})
