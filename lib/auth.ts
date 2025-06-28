export function getGoogleAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${window.location.origin}/api/auth/google`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  })

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

export function initiateGoogleLogin() {
  window.location.href = getGoogleAuthUrl()
}
