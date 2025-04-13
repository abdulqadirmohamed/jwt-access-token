import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import GitHub from "next-auth/providers/github";
import { jwtDecode } from "jwt-decode";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const res = await fetch("http://localhost:5000/api/v1/auth/sign-in", {
            method: "POST",
            body: JSON.stringify({
              emaail: credentials.email,
              password: credentials.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!res.ok) {
            throw new Error("Invalid credentials");
          }
          const parsedResponse = await res.json();

          const accessToken = parsedResponse.accessToken;
          const refressToken = parsedResponse.refreshToken;
          const userInfo = parsedResponse.userInfo;

          return {
            accessToken,
            refressToken,
            email: userInfo.email,
            name: userInfo.name,
            role: userInfo.role,
          }

        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // user is only available the first time a user signs in authorized
      console.log(`In jwt callback - Token is ${JSON.stringify(token)}`);

      if (account && user) {
        console.log(
          `In jwt callback - User is ${JSON.stringify(user)}`
        );
        console.log(
          `In jwt callback - account is ${JSON.stringify(account)}`
        );
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user
        };
      }
      
      return token;

    },
    session: async ({ session, token }) => {
      console.log(
          `In session callback - Token is ${JSON.stringify(token)}`
      );
      if (token) {
          session.accessToken = token.accessToken;
          session.user = token.user as any;
      }
      return session;
  },
  }
});
