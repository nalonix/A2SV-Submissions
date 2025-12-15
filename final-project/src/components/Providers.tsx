"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { BookmarkProvider } from "@/context/BookmarkContext";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <BookmarkProvider>{children}</BookmarkProvider>
        </SessionProvider>
    );
}
