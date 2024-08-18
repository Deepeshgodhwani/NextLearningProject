import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = path === "/signup" || path === "/login";
    console.log(path);
    const jwtToken = request.cookies.get("token")?.value
    if (isPublic && jwtToken)
        return NextResponse.redirect(new URL('/profile', request.nextUrl));

    if (!isPublic && !jwtToken)
        return NextResponse.redirect(new URL('/login', request.nextUrl));

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/signup',
        '/login',
        '/profile/:id*'
    ],
}