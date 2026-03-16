import { createServerClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import Link from "next/link"
import DeleteButton from "../../components/DeleteButton"
import { ArrowLeft } from "lucide-react"
import { Pencil, Trash2 } from "lucide-react"

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const cookieStore = await cookies()
  const supabase = createServerClient(cookieStore)

  const { data: task, error } = await supabase
    .from("task")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !task) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 px-2 sm:space-y-6 sm:px-0">

      {/* 戻る */}
      <Link
        href="/tasks"
        className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        タスク一覧へ戻る
      </Link>

      {/* カード */}
      <div className="bg-white border rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">

        {/* タイトル */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">タイトル</p>
          <h1 className="text-xl sm:text-2xl font-bold break-words">
            {task.title}
          </h1>
        </div>

        {/* 詳細 */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500 mb-1">詳細</p>

          {task.task_detail ? (
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {task.task_detail}
            </p>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">詳細はありません</p>
          )}
        </div>

        {/* 情報グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* 期限 */}
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">期限</p>
            <p className="text-gray-800 font-medium text-sm sm:text-base">
              {task.due_date ?? "なし"}
            </p>
          </div>

          {/* 状態 */}
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">状態</p>

            <span
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                task.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.completed ? "完了" : "未完了"}
            </span>

          </div>

        </div>

        {/* 操作 */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">

          <Link
            href={`/tasks/${task.id}/edit`}
            className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
            編集
          </Link>

          <DeleteButton id={task.id} />

        </div>

      </div>

    </div>
  )
}