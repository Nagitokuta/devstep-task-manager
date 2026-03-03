"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import AuthCard from "@/app/components/AuthCard"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

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
    <AuthCard title="新規登録">
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
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          新規登録
        </button>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <p className="text-center mt-4 text-blue-500 hover:underline">
        <Link href="/login">ログインはこちら</Link>
      </p>
    </AuthCard>
  )
}