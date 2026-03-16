"use client"

import Link from "next/link"
import { AlertOctagon } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">

      <AlertOctagon className="w-14 h-14 text-red-500 mb-4" />

      <h1 className="text-2xl font-bold mb-2">
        エラーが発生しました
      </h1>

      <p className="text-gray-500 mb-6">
        予期しない問題が発生しました。もう一度お試しください。
      </p>

      <div className="flex gap-3">

        <button
          onClick={() => reset()}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          再読み込み
        </button>

        <Link
          href="/tasks"
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 rounded-lg transition"
        >
          タスク一覧へ
        </Link>

      </div>

    </div>
  )
}