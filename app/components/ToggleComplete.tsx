"use client"

import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export default function ToggleComplete({
  id,
  completed,
}: {
  id: number
  completed: boolean
}) {
  const router = useRouter()

  const toggle = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    await supabase
      .from("task")
      .update({ completed: !completed })
      .eq("id", id)

    router.refresh()
  }

  return (
    <input
      type="checkbox"
      checked={completed}
      onChange={toggle}
      className="w-4 h-4 cursor-pointer accent-green-600"
    />
  )
}