"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

type LogoutButtonProps = {
  className?: string
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    if (error) {
      alert("ログアウト失敗: " + error.message)
    } else {
      router.push("/login")
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={className} // 外から渡せるようになった
    >
      {loading ? "ログアウト中..." : "ログアウト"}
    </button>
  )
}