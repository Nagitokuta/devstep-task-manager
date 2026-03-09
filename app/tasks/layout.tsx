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
    <div className="flex justify-end p-3 sm:p-4">
      <UserMenu email={user.email ?? ""} />
    </div>

    {/* 上部中央のアプリ名・アイコン・サブタイトル */}
    <div className="flex flex-col items-center mt-4 mb-4">
      <CheckSquare className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mb-1" />
      <h1 className="text-2xl sm:text-3xl font-extrabold">TaskManager</h1>
      <p className="text-gray-500 mt-1 text-xs sm:text-sm">タスクをシンプルに管理</p>
    </div>

    {/* メインカード */}
    <div className="flex justify-center px-2 sm:px-0">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl p-6 sm:p-8 mx-auto">
        {children}
      </div>
    </div>

    {/* 右下タスク追加ボタン */}
    <Link
      href="/tasks/new"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-lg text-xl sm:text-2xl"
    >
      +
    </Link>

    </div>
  )
}