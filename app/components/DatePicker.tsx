"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { addDays, isBefore, isToday } from "date-fns"

type Props = {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

const today = new Date()
const threeDaysLater = addDays(today, 3)

export default function DatePicker({ date, setDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={`w-full justify-start text-left font-normal ${
            date
            ? isBefore(date, new Date())
            ? "text-red-600"
            : isToday(date)
            ? "text-orange-500"
            : "text-gray-900"
            : "text-gray-500"
        }`}
      >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy/MM/dd") : "期限を選択"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4">
      <Calendar
  className="scale-110"
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={{ before: new Date() }}
  initialFocus
  modifiers={{
    urgent: (day) => isBefore(day, today) || isToday(day),
    soon: (day) => day > today && day <= threeDaysLater,
  }}
  modifiersClassNames={{
    urgent: "text-red-600 font-semibold",
    soon: "text-orange-500 font-semibold",
  }}
  classNames={{
    day_selected:
      "!bg-transparent border-2 border-blue-500 text-blue-600 hover:bg-blue-50",
  }}
/>
      </PopoverContent>
    </Popover>
  )
}
