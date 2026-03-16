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
  const [errors, setErrors] = useState<{
    title?: string
    task_detail?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: {
      title?: string
      task_detail?: string
    } = {}

    if (!title.trim()) {
      newErrors.title = "タイトルは必須です"
    } else if (title.length > 100) {
      newErrors.title = "タイトルは100文字以内で入力してください"
    }
  
    if (task_detail.length > 500) {
      newErrors.task_detail = "詳細は500文字以内で入力してください"
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
  
    setErrors({})

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
      <div className="max-w-xl mx-auto px-2 sm:px-0">

        {/* ヘッダー */}
        <Link
          href={`/tasks/${task.id}`}
          className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-black mb-4 sm:mb-5"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
          タスク詳細へ戻る
        </Link>

        {/* カード */}
        <div className="bg-white shadow-md rounded-2xl border p-4 sm:p-6">

          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">タスク編集</h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {/* タイトル */}
            <div>
              <label className="text-xs sm:text-sm text-gray-500">タイトル</label>
              <input
                className={`w-full mt-1 border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 ${
                    errors.title
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-blue-400"
                  }`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 font-medium">{errors.title}</p>
              )}
            </div>

            {/* 詳細 */}
            <div>
              <label className="text-xs sm:text-sm text-gray-500">詳細</label>
              <textarea
                rows={4}
                className={`w-full mt-1 border rounded-lg p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 ${
                  errors.task_detail
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                value={task_detail}
                onChange={(e) => setTask_detail(e.target.value)}
              />
               {errors.task_detail && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 font-medium">{errors.task_detail}</p>
              )}
            </div>

            {/* 期限 */}
            <div>
              <label className="text-xs sm:text-sm text-gray-500">期限</label>
              {/* DatePicker */}
              <DatePicker
                date={dueDate}
                setDate={setDueDate}
              />
            </div>

            {/* 完了チェック */}
            <label className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border hover:bg-gray-50 cursor-pointer text-sm sm:text-base">
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium">タスク完了</span>
            </label>

            {/* 更新ボタン */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer"
            >
              タスクを更新
            </button>

          </form>

        </div>
      </div>
    </>
  )
}