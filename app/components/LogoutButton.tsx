"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

type LogoutButtonProps = {
  className?: string
}

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LogoutButton({ className }: LogoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)

    await supabase.auth.signOut()

    window.location.href = "/login" // ← フルリロード必須
  }

  return (
    <button onClick={handleLogout} disabled={loading} className={className}>
      {loading ? "ログアウト中..." : "ログアウト"}
    </button>
  )
}