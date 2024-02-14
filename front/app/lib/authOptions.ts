import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const authOptions : NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET as string,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const res = await fetch("/your/endpoint", {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              })
              const user = await res.json()
              // If no error and we have user data, return it
              if (res.ok && user) {
                return user
              }
              // Return null if user data could not be retrieved
              return null
            }
        })
    ],
    pages: {
      signIn: '/authenticate',
    },
    callbacks: {
      signIn: async ({ user, account, profile }: any ) => {
        // if (account.provider ===  "Credentials") {
        //   return user
        // }
        return user
      },
      redirect: async ({ url, baseUrl }: any) => {
        return baseUrl
      },
      session: async ({ session, token } :any) => {
        // session.accessToken = token.accessToken
        return session;
      },
      jwt: async ({ user, token, account } : any) => {
        // token.accessToken = account.access_token
        return token
      },
    },
}

export default authOptions;

// https://next-auth.js.org/getting-started/example#extensibility