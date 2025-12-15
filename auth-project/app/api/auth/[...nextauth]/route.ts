import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { SignInResponse } from "@/types/auth";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const apiUrl = process.env.EXTERNAL_API_BASE_URL || "https://akil-backend.onrender.com";

                    const response = await axios.post<SignInResponse>(
                        `${apiUrl}/login`,
                        {
                            email: credentials.email,
                            password: credentials.password,
                        }
                    );

                    if (response.status === 200 && response.data.success) {
                        const { id, name, email, role, accessToken } = response.data.data;

                        return {
                            id,
                            name,
                            email,
                            role,
                            accessToken,
                        } as User & { role: string; accessToken: string };
                    }

                    return null;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const errorMessage = error.response?.data?.message || error.message;
                        console.error("Auth API Error:", error.response?.data || error.message);
                        throw new Error(errorMessage);
                    } else {
                        console.error("Authentication error:", error);
                        throw new Error("An unexpected error occurred");
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // On initial sign in, add user data to token
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            // Add custom fields to session
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
                (session as any).accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
