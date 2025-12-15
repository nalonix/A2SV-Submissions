import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
}

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await fetch(
                        "https://akil-backend.onrender.com/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (!response.ok || !data.success) {
                        return null;
                    }

                    return {
                        id: data.data.id,
                        email: data.data.email,
                        name: data.data.name,
                        accessToken: data.data.accessToken,
                    } as User;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = (user as User).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
});
