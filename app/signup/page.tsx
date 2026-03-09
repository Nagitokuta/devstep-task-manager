"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import AuthCard from "@/app/components/AuthCard"
import { CheckSquare } from "lucide-react"
import { LogIn } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 確認用パスワードが違う
    if (password !== confirmPassword) {
       setError("パスワードが一致しません。")
       return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      // パスワードが6文字未満
      if (error.message.includes("Password should be at least")) {
        setError("パスワードは6文字以上で設定してください。")
      }
      // 既に登録済みのメールアドレス
      else if (error.message.includes("already registered")) {
        setError("このメールアドレスは既に登録されています。")
      }
      // 無効なメール形式
      else if (error.message.includes("invalid email")) {
        setError("メールアドレスの形式が正しくありません。")
      }
      // それ以外のエラー
      else {
        setError("登録中にエラーが発生しました: " + error.message)
      }
    
      return
    }

    if (data.user) {
      router.push("/tasks")
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

    <h1 className="text-lg font-semibold mb-4">
        新規登録
    </h1>

    <form onSubmit={handleRegister} className="space-y-4">

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

      <input
        type="password"
        placeholder="パスワード（確認）"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-emerald-300 rounded-lg hover:bg-emerald-400 hover:text-white transition cursor-pointer"
      >
        新規登録
      </button>

    </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <p className="flex justify-center mt-4">
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          <LogIn className="w-4 h-4" />
          ログインはこちら
        </Link>
      </p>
    </AuthCard>
  )
}