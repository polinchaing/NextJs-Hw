// import { NextRequest, NextResponse } from "next/server";

// export default function middleware(req: NextRequest){
//     console.log("==========Middleware is Running========");
//     console.log("==> Next Respone URL", req.url);
//     console.log("==> Next Response Body", req.body);

//     const isLoggin = false;

//     if(!isLoggin && req.nextUrl.pathname.startsWith('/dashboard')){
//         // return NextResponse.redirect(new URL('/login',req.url))
//     }
//     return NextResponse.next();

// }

// // config matcher
// export const config={
//      matcher: ['/dashboard/:path* ']
// }


// import createMiddleware from "next-intl/middleware"

// export default createMiddleware({
//     locales: ["en","km"],
//     defaultLocale: "en"
// })

// export const config ={
//     matcher: ["/", "/(km|en)/:path*"]
// }


import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};