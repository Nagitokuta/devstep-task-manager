import { createServerClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import EditTaskForm from "./EditTaskForm"

export default async function EditPage({
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

console.log("error:", error)

  if (error || !task) {
    notFound()
  }

  return (
    <EditTaskForm task={task} />
  )
}