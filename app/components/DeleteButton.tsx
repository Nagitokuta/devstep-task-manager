"use client"

import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    const ok = confirm("このタスクを削除しますか？")

    if (!ok) return

    const { error } = await supabase
      .from("task")
      .delete()
      .eq("id", id)

    if (error) {
      alert(error.message)
      return
    }

    router.push("/tasks")
    router.refresh()
  }
  
  return (
<button
  onClick={handleDelete}
  className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition cursor-pointer"
>
  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
  削除
</button>
  )
}