"use client"

import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import DatePicker from "@/app/components/DatePicker"
import Link from "next/link"

export default function NewTaskPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [task_detail, setTask_detail] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        router.push("/login")
        return
    }

    const { error } = await supabase.from("task").insert({
      title,
      task_detail,
      due_date: dueDate ? dueDate.toISOString().split("T")[0] : null,
      user_id: user.id,
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push("/tasks")
    router.refresh()
  }

  return (
    <>
      <div className="max-w-xl mx-auto px-2 sm:px-0">

        <div className="mb-4 sm:mb-6 space-y-2">

          <Link
            href="/tasks"
            className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            タスク一覧へ戻る
          </Link>

        </div>

        {/* カード */}
        <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 border">

          <h1 className="text-xl sm:text-2xl font-bold mb-2">タスク作成</h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* タイトル */}
            <div>
              <label className="text-xs sm:text-sm text-gray-500">タイトル</label>
              <input
                type="text"
                placeholder="例：買い物に行く"
                className="w-full mt-1 border rounded-lg p-2.5 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* 詳細 */}
            <div>
              <label className="text-xs sm:text-sm text-gray-500">詳細</label>
              <textarea
                placeholder="メモや補足を書けます"
                rows={4}
                className="w-full mt-1 border rounded-lg p-2.5 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                value={task_detail}
                onChange={(e) => setTask_detail(e.target.value)}
              />
            </div>

            {/* 期限 */}
            <div>
              <label className="text-xs sm:text-sm text-gray-500">期限</label>
              <DatePicker
                date={dueDate}
                setDate={setDueDate}
              />
            </div>

            {/* 作成ボタン */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
            >
              タスクを作成
            </button>

          </form>

        </div>
      </div>
    </>
  )
}