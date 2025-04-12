import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
        let user = null;
        user = {
          id: '1',
          name: "John Doe",
          email: "john@example.com",
        }

        if (!user) {
          console.log("User not found");
          return null;
        }
        return user;
      },
    }),
  ],
});
