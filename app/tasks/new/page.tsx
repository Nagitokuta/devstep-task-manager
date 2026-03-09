"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function NewTaskPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [task_detail, setTask_detail] = useState("")
  const [dueDate, setDueDate] = useState("")

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
      due_date: dueDate || null,
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
      <h1 className="text-2xl font-bold mb-6">タスク作成</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="タイトル"
          className="w-full border rounded-lg p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="詳細（任意）"
          className="w-full border rounded-lg p-3"
          value={task_detail}
          onChange={(e) => setTask_detail(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded-lg p-3"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          作成
        </button>

      </form>
    </>
  )
}