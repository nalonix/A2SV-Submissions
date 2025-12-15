"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get("email") || "";

    const [formData, setFormData] = useState({
        email: emailFromQuery,
        otp: "",
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
            const response = await fetch("https://akil-backend.onrender.com/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: formData.otp,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Verification failed");
                return;
            }

            // Redirect to signin on success
            router.push("/signin");
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Verify Email
                    </h1>
                    <p className="text-slate-500">
                        Enter the OTP sent to your email to verify your account.
                    </p>
                </div>

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
                            htmlFor="otp"
                            className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                            OTP Code
                        </label>
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            placeholder="Enter Code"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying..." : "Verify Account"}
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-500 text-sm">
                    Back to{" "}
                    <Link
                        href="/signin"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailForm />
            </Suspense>
        </main>
    );
}
