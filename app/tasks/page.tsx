import { createServerClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { ClipboardList } from "lucide-react"
import Link from "next/link"

export default async function TasksPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)

  const { data: task, error } = await supabase
    .from("task")
    .select("id, title, completed, due_date, createdat")

    console.log(task)
    console.log(error)

  return (
   <>
      <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>

      {!task || task.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">

          <ClipboardList className="w-12 h-12 mb-4" />

          <p className="text-lg font-medium">
            タスクがありません
          </p>

          <p className="text-sm mt-1">
            新しいタスクを作成してみましょう
          </p>

        </div>
      ) : (
        <div className="space-y-3">
          {task.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="block border rounded-xl p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-lg font-semibold">{task.title}</h2>

                  <div className="flex gap-3 mt-2 text-sm text-gray-500">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.completed ? "完了" : "未完了"}
                    </span>

                    {task.due_date && (
                      <span>
                        期限: {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-400 text-right">
                  <div>作成日</div>
                  <div>
                    {new Date(task.createdat).toLocaleDateString()}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
   </>
  )
}