import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials) {
          throw new Error("Credentials not available");
        }

        try {
          // Make a POST request to your login API
          const response = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/signin`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          // Check if the response contains user data
          if (!response.data.verified) {
            // toast.error("Email not verified");
            throw new Error("Email not verified");
          }

          if (response.data) {
            return response.data; // Return the user object
          } else {
            throw new Error("Invalid email or password");
          }
        } catch (error: any) {
          // Log and throw the error
          throw new Error(error.response.data.error);
        }
      },
    }),
  ],

  // Optional: Add callbacks, session, and other configurations as needed
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Store user information in the token
      if (user) {
        token.id = user.id; // Store user ID
        token.name = user.name; // Store user name
        token.email = user.email; // Store user email
      }
      return token; // Return the token with user data
    },

    async session({ session, token }: { session: any; token: any }) {
      // Store token data in session
      session.user.id = token.id; // Include user ID in session
      session.user.name = token.name; // Include user name in session
      session.user.email = token.email; // Include user email in session
      return session; // Return the updated session
    },
  },
};
