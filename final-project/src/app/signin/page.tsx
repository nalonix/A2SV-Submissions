"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500">Sign in to your account</p>
            </div>

            {registered && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-200 mb-5">
                    Account created successfully! Please sign in.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                        {error}
                    </div>
                )}

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <p className="text-center mt-6 text-slate-500 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Suspense
                    fallback={
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8" />
                            <div className="space-y-5">
                                <div className="h-12 bg-gray-200 rounded" />
                                <div className="h-12 bg-gray-200 rounded" />
                                <div className="h-12 bg-gray-200 rounded" />
                            </div>
                        </div>
                    }
                >
                    <SignInForm />
                </Suspense>
            </div>
        </main>
    );
}
