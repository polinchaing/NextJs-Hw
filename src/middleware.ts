import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
    console.log("==========Middleware is Running========");
    console.log("==> Request URL:", req.url);

    const { pathname } = req.nextUrl;

    // Skip for API routes and static files
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/trpc') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/_vercel') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // First, handle internationalization
    const intlResponse = intlMiddleware(req);
    
    // If internationalization redirected, use that response
    if (intlResponse?.status === 302) {
        return intlResponse;
    }

    // Then handle authentication
    const token = req.cookies.get('authToken')?.value;
    console.log("Auth check - Token present:", !!token);

    // Check for dashboard routes (with or without locale prefix)
    const isDashboard = pathname.includes('/dashboard');
    
    if (isDashboard && !token) {
        console.log("Unauthorized access to dashboard, redirecting to login");
        
        // Determine locale from current path
        const pathSegments = pathname.split('/');
        const hasLocale = pathSegments[1] && ['en', 'km'].includes(pathSegments[1]);
        const currentLocale = hasLocale ? pathSegments[1] : 'en';
        
        const loginUrl = new URL(`/${currentLocale}/login`, req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        
        return NextResponse.redirect(loginUrl);
    }

    // Return the intl response or continue
    return intlResponse || NextResponse.next();
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};