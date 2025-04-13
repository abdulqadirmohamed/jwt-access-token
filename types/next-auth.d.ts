import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    accessToken?: string; // Add this line
    refreshToken?: string; // Add this line
  }

  interface Session {
    user: User;
    accessToken?: string; // Optional: if you want to access accessToken from session
    refreshToken?: string; // Add this line
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string; // Add this line
    refreshToken?: string; // Add this line
  }
}
