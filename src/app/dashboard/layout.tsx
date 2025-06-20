import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";
import Error from "./error";


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <ErrorBoundary errorComponent={Error}>
                {children}
            </ErrorBoundary>
        </div>
    )
}