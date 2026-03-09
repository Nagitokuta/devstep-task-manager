import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"
import {CheckSquare} from "lucide-react"
import UserMenu from "@/app/components/UserMenu"
import Link from "next/link"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">

    {/* 右上ユーザーメニュー */}
    <div className="flex justify-end p-4">
      <UserMenu email={user.email ?? ""} />
    </div>

    {/* 上部中央のアプリ名・アイコン・サブタイトル */}
    <div className="flex flex-col items-center mt-6 mb-6">
      <CheckSquare className="w-10 h-10 text-blue-600 mb-2" />
      <h1 className="text-3xl font-extrabold">TaskManager</h1>
      <p className="text-gray-500 mt-1 text-sm">タスクをシンプルに管理</p>
    </div>

    {/* メインカード */}
    <div className="flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        {children}
      </div>
    </div>

    {/* 右下タスク追加ボタン */}
    <Link
      href="/tasks/new"
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg text-2xl"
    >
      +
    </Link>

    </div>
  )
}