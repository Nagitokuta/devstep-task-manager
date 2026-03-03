import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LogoutButton from "@/app/components/LogoutButton"

export default async function TasksPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {

        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // const { data: tasks } = await supabase
  //   .from("tasks")
  //   .select("*")

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
    <h1 className="text-2xl font-bold text-center mb-6">Tasks</h1>

    <p className="text-center mb-6">
      ログイン中のユーザー: <span className="font-semibold">{user.email}</span>
    </p>

      {/* <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul> */}

    <div className="flex justify-center">
      <LogoutButton className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" />
    </div>
  </div>
</div>
  )
}