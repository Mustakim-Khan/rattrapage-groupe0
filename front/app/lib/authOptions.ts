import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions : NextAuthOptions = {
    secret: "Ua/Ll58z7qUZq9Uoyn88oUdhKkhJ7QFFW4YkTdvJKX0=",
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
              username: { label: "username", type: "text", placeholder: "jsmith" },
              password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
              const payload = {
                username: credentials?.username,
                password: credentials?.password,
              };
      
              const res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json',
                  'accept': 'application/json',
                },
              });
      
              const user = await res.json();
              if (!res.ok) {
                throw new Error(user.message);
              }
              // If no error and we have user data, return it
              if (res.ok && user) {
                return user;
              }
      
              // Return null if user data could not be retrieved
              return null;
            }
          }
        )
    ],
    pages: {
      signIn: '/authenticate',
    },
    callbacks: {
      // signIn: async ({ user, account, profile }: any ) => {
      //   // if (account.provider === "google") {
      //   //   if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
      //   //     return user
      //   //   }
      //   // }
      //   if (user) return true
      //   return false
      // },
      // redirect: async ({ url, baseUrl }: any) => {
      //   return baseUrl
      // },
      session: async ({ session, token } :any) => {
        session.user.accessToken = token.accessToken;
        
        return session;
      },
      jwt: async ({ user, token, account } : any) => {
        if (account && user) {
          return {
            ...token,
            accessToken: user.token,
            refreshToken: user.refreshToken,
          };
        }
  
        return token
      },
    },
}

export default authOptions;

// https://next-auth.js.org/getting-started/example#extensibility