import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = NextResponse.redirect("/login")

    // Supabase で使う JWT Cookie を削除
    response.cookies.delete("sb-access-token")
    response.cookies.delete("sb-refresh-token")

    return response
  } catch (err) {
    console.error("Logout API error:", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}