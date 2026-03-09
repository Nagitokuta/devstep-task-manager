"use client"

import { useState } from "react"
import LogoutButton from "./LogoutButton"

export default function UserMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
      >
        👤
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">{email}</p>

          <LogoutButton className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600" />
        </div>
      )}
    </div>
  )
}