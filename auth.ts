import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    // User to be stored on session
    user: {
      id: string;
      token: string;
      firstName: string;
      lastName: string;
      picture: string;
      account_type: string;
    } & DefaultSession["user"];
  }

  // User returned from database
  interface User {
    user_id: string;
    token: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    account_type: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // Define credentials
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        try {
          // Get user from database
          const targetUser = await fetch(
            "https://sbareads.surprises.ng/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-app-version": "0.0.1",
                "x-device-id": "webapp",
                "x-platform": "ios",
                "x-app-id": "com.sbareads",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          // Check if user exist
          if (targetUser.status === 401 || targetUser.status === 400) {
            return user;
          }

          // Parse user response body
          const targetUserBody = await targetUser.json();
          console.log(targetUserBody);

          // Get user details from DB
          const userProfile = await fetch(
            `https://sbareads.surprises.ng/api/user/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${targetUserBody.data.token}`,
                "Content-Type": "application/json",
                "x-app-version": "0.0.1",
                "x-device-id": "9fb1a2b7-5ddf-429d-99a9-88ff47b419dd",
                "x-platform": "ios",
                "x-app-id": "com.sbareads",
              },
            }
          );

          // Parse user details
          const userProfileBody = await userProfile.json();
          console.log(userProfileBody);

          // Save merged user and session to user object
          user = { ...targetUserBody.data, ...userProfileBody.data };
          if (!user) {
            return null;
          }

          return user;
        } catch (e) {
          console.log(e);
          throw new Error("Server error");
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, trigger, user, session }) {
      if (user) {
        // User is available during sign-in
        // Extract data from database user returned
        token.id = user.user_id;
        token.token = user.token;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.picture = user.profilePhoto;
        token.account_type = user.account_type;
      }

      if (trigger === "update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        // Property that never needs to be updated are not listed such as userId

        if (session?.token) token.token = session.token;
        if (session?.firstName) token.firstName = session.firstName;
        if (session?.lastName) token.lastName = session.lastName;
        if (session?.picture) token.picture = session.picture;
      }
      return token;
    },

    session({ session, token }) {
      // Extract data from token to final session
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.picture = token.picture as string;
      session.user.account_type = token.account_type as string;

      return session;
    },

    // Required to enable conditional auth in middleware.ts
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },

  pages: {
    error: "/",
    signIn: "/",
  },
});
