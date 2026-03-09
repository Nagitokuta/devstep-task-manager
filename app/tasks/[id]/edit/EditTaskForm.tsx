"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import DatePicker from "@/app/components/DatePicker"

export default function EditTaskForm({ task }: { task: any }) {
  const router = useRouter()

  const [title, setTitle] = useState(task.title)
  const [task_detail, setTask_detail] = useState(task.task_detail ?? "")
  const [dueDate, setDueDate] = useState(task.due_date ?? "")
  const [completed, setCompleted] = useState(task.completed)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from("task")
      .update({
        title,
        task_detail,
        due_date: dueDate || null,
        completed,
        user_id: task.user_id
      })
      .eq("id", task.id)

    if (error) {
      alert(error.message)
      return
    }

    router.push(`/tasks/${task.id}`)
    router.refresh()
  }

  return (
<>
  <div className="max-w-xl mx-auto">

    {/* ヘッダー */}
    <Link
     href={`/tasks/${task.id}`}
     className="inline-flex items-center text-gray-600 hover:text-black mb-5"
     >
     <ArrowLeft className="w-5 h-5 mr-1" />
     タスク詳細へ戻る
    </Link>

    {/* カード */}
    <div className="bg-white shadow-md rounded-2xl border p-6">

    <h1 className="text-2xl font-bold mb-4">タスク編集</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* タイトル */}
        <div>
          <label className="text-sm text-gray-500">タイトル</label>

          <input
            className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 詳細 */}
        <div>
          <label className="text-sm text-gray-500">詳細</label>

          <textarea
            rows={4}
            className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={task_detail}
            onChange={(e) => setTask_detail(e.target.value)}
          />
        </div>

        {/* 期限 */}
        <div>
          <label className="text-sm text-gray-500">期限</label>

          {/* DatePicker使う */}
          <DatePicker
            date={dueDate}
            setDate={setDueDate}
          />
        </div>

        {/* 完了チェック */}
        <label className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">タスク完了</span>
        </label>

        {/* 更新ボタン */}
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition shadow-sm cursor-pointer"
        >
          更新する
        </button>

      </form>

    </div>
  </div>
</>
  )
}