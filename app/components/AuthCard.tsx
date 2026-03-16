"use client"
import { ReactNode } from "react"

type AuthCardProps = {
  title: string
  children: ReactNode
}

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2 sm:px-0">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 sm:p-8 mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}