import { createServerClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function TasksPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)

  const { data: task } = await supabase
    .from("task")
    .select("id, title")

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>

      <div className="space-y-2">
        {task?.map((task) => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="block border rounded-lg p-4 hover:bg-gray-50"
          >
            {task.title}
          </Link>
        ))}
      </div>
    </>
  )
}