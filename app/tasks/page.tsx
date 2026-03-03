"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import LogoutButton from "@/app/components/LogoutButton"

export default function TasksPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUserEmail(data.user.email ?? null)
      } else {
        router.push("/login")
      }
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) return <p>Loading...</p>

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold text-center mb-6">Tasks</h1>

    <p className="text-center mb-6">
      ログイン中のユーザー: <span className="font-semibold">{userEmail}</span>
    </p>

    <div className="flex justify-center">
      <LogoutButton className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" />
    </div>
  </div>
</div>
  )
}