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
  <div className="max-w-xl mx-auto">

    <div className="mb-6 space-y-2">

<Link
  href="/tasks"
  className="inline-flex items-center text-gray-600 hover:text-black"
>
  <ArrowLeft className="w-5 h-5 mr-1" />
  タスク一覧へ戻る
</Link>

</div>

    {/* カード */}
    <div className="bg-white shadow-md rounded-2xl p-6 border">

    <h1 className="text-2xl font-bold mb-2">タスク作成</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* タイトル */}
        <div>
          <label className="text-sm text-gray-500">タイトル</label>
          <input
            type="text"
            placeholder="例：買い物に行く"
            className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* 詳細 */}
        <div>
          <label className="text-sm text-gray-500">詳細</label>
          <textarea
            placeholder="メモや補足を書けます"
            rows={4}
            className="w-full mt-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={task_detail}
            onChange={(e) => setTask_detail(e.target.value)}
          />
        </div>

        {/* 期限 */}
        <div>
          <label className="text-sm text-gray-500">期限</label>
          <DatePicker
           date={dueDate}
           setDate={setDueDate}
          />
        </div>

        {/* 作成ボタン */}
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition shadow-sm cursor-pointer"
        >
          タスクを作成
        </button>

      </form>

    </div>
  </div>
</>
  )
}