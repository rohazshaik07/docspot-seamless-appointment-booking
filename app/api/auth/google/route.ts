import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url))
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${request.nextUrl.origin}/api/auth/google`,
      }),
    })

    const tokens = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || "Failed to exchange code for tokens")
    }

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const user = await userResponse.json()

    if (!userResponse.ok) {
      throw new Error("Failed to get user info")
    }

    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create user if they don't exist
    // 3. Create a session/JWT token
    // 4. Set secure cookies

    // For now, we'll just redirect to dashboard
    const response = NextResponse.redirect(new URL("/dashboard", request.url))

    // Set a simple session cookie (in production, use proper JWT/session management)
    response.cookies.set(
      "user",
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    )

    return response
  } catch (error) {
    console.error("Google OAuth error:", error)
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url))
  }
}
