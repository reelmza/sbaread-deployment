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
      userType: string;
      enablePushNotifications: boolean;
      enableEmailNotifications: boolean;
    } & DefaultSession["user"];
  }

  // User returned from database
  interface User {
    userId: string;
    token: string;
    firstName: string;
    lastName: string;
    profilePhoto: string;
    userType: string;
    userPreferences: {
      enablePushNotifications: boolean;
      enableEmailNotifications: boolean;
    };
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
          const userSession = await fetch(
            "https://sbareads-apis.onrender.com/api",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json-patch+json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
          console.log(userSession);
          // Check if user exist
          if (userSession.status === 401 || userSession.status === 400) {
            return user;
          }

          // Parse user response body
          const userSessionBody = await userSession.json();

          // Get user details from DB
          const userProfile = await fetch(
            `https://ecoride-be-r8at.onrender.com/api/v1/Users/admin/${userSessionBody.data.userId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${userSessionBody.data.token}`,
                "Content-Type": "application/json-patch+json",
              },
              body: JSON.stringify({
                email: userSessionBody.data.email,
              }),
            }
          );

          // Parse user details
          const userProfileBody = await userProfile.json();

          // Save merged user and session to user object
          user = { ...userSessionBody.data, ...userProfileBody.data };
          console.log(user);
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
        token.id = user.userId;
        token.token = user.token;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.picture = user.profilePhoto;
        token.userType = user.userType;
        token.enablePushNotifications =
          user.userPreferences.enablePushNotifications;
        token.enableEmailNotifications =
          user.userPreferences.enableEmailNotifications;
      }

      if (trigger === "update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        if (session?.token) token.token = session.token;
        if (session?.firstName) token.firstName = session.firstName;
        if (session?.lastName) token.lastName = session.lastName;
        if (session?.picture) token.picture = session.picture;
        if (session?.enablePushNotifications !== undefined)
          token.enablePushNotifications = session.enablePushNotifications;
        if (session?.enableEmailNotifications !== undefined)
          token.enableEmailNotifications = session.enableEmailNotifications;
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
      session.user.userType = token.userType as string;
      session.user.enableEmailNotifications =
        token.enableEmailNotifications as boolean;
      session.user.enablePushNotifications =
        token.enablePushNotifications as boolean;

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
