'use client';

import { Booking } from "@prisma/client";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { useState } from "react";

export default function AdminCalendar({ bookings }: { bookings: Booking[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded transition-colors text-sm font-medium"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded transition-colors text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-zinc-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const dayBookings = bookings.filter(b => 
            new Date(b.startDate) <= day && new Date(b.endDate) >= day
          );

          return (
            <div key={idx} className="min-h-[80px] border border-zinc-100 dark:border-zinc-800/50 p-1 flex flex-col items-start bg-zinc-50/50 dark:bg-black/20">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-400 mb-1">
                {format(day, "d")}
              </span>
              <div className="flex flex-col gap-1 w-full">
                {dayBookings.map(b => (
                  <div
                    key={b.id}
                    title={`${b.guestName} - ${b.status}`}
                    className={`text-[10px] truncate px-1 rounded-sm w-full font-medium text-white
                      ${b.status === "APPROVED" ? "bg-green-600" : b.status === "REJECTED" ? "bg-red-600" : "bg-yellow-600"}
                    `}
                  >
                    {b.guestName.split(" ")[0]}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
