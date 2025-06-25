import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";
import Error from "./error";
import Link from "next/link";

export default function DashbaordLayout({
    children
    ,team,
    user,
    login
}: {
    children: React.ReactNode
    team: React.ReactNode
    user:React.ReactNode
    login:React.ReactNode
}) {

    const isLoggin = false;
    if(!isLoggin){
        return login
    }

    return (
        
        <div>
            <Link href={'/dashboard'}> Dashboard </Link>
            <Link href={'/dashboard/settings'}>Setting Page</Link>
          <ErrorBoundary errorComponent={Error}>
              {children}
              {team}
              {user}
          </ErrorBoundary>
        </div>
    )
}