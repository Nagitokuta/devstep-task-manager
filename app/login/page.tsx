"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import AuthCard from "@/app/components/AuthCard"
import { CheckSquare } from "lucide-react"
import { UserPlus } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("メールアドレスかパスワードが違います")
      return
    }

    if (data.user) {
      window.location.href = "/tasks"
    }
  }

  return (
    <AuthCard title="">
      {/* ロゴ */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <CheckSquare className="w-7 h-7 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          TaskManager
        </h1>
        <p className="text-sm text-gray-500 mt-1">
            タスクをシンプルに管理
        </p>
      </div>

      {/* ログインタイトル */}
      <h1 className="text-lg font-semibold mb-4">
        ログイン
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-300 rounded-lg hover:bg-blue-400 hover:text-white transition cursor-pointer"
        >
          ログイン
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <p className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 hover:text-gray-700 transition">
        <Link href="/signup" className="flex items-center gap-1">
          <UserPlus className="w-4 h-4" />
          新規登録はこちら
        </Link>
      </p>
    </AuthCard>
  )
}