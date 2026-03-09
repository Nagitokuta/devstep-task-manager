import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { CheckSquare } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">

      <div className="flex items-center gap-3 mb-6">
        <CheckSquare className="w-14 h-14 text-blue-600" />
        <span className="font-extrabold text-3xl">TaskManager</span>
      </div>

      <AlertTriangle className="w-14 h-14 text-red-400 mb-4" />

      <h1 className="text-2xl font-bold mb-2">
        エラーが発生しました
      </h1>

      <p className="text-gray-500 mb-6">
        ページが見つからないか、削除された可能性があります。
      </p>

      <Link
        href="/tasks"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
      >
        タスク一覧に戻る
      </Link>

    </div>
  )
}