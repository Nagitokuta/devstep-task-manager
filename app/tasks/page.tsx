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
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
      タスク一覧
    </h1>
  
    {!task || task.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400 px-4">
        <ClipboardList className="w-10 h-10 mb-3" />
  
        <p className="text-base font-medium">タスクがありません</p>
        <p className="text-sm mt-1">新しいタスクを作成してみましょう</p>
      </div>
    ) : (
      <div className="space-y-2 px-2 sm:space-y-3 sm:px-0">
        {task.map((task) => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="block border rounded-lg p-3 sm:p-4 bg-white hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-semibold">{task.title}</h2>
  
                <div className="flex flex-wrap gap-1 mt-1 text-xs sm:text-sm text-gray-500">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.completed ? "完了" : "未完了"}
                  </span>
  
                  {task.due_date && (
                    <span className="text-xs sm:text-sm">
                      期限: {new Date(task.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
  
              <div className="mt-1 sm:mt-0 text-xs text-gray-400 text-right">
                <div className="text-left md:text-right">作成日</div>
                <div>{new Date(task.createdat).toLocaleDateString()}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </>
  )
}