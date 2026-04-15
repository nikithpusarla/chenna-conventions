'use client';

import { Booking } from "@prisma/client";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, isBefore, startOfDay } from "date-fns";
import { useState } from "react";

export default function PublicCalendar({ bookings }: { bookings: Booking[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Availability Calendar
        </h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {format(currentDate, "MMMM yyyy")}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-zinc-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const isPast = isBefore(day, startOfDay(new Date()));
          const dayBookings = bookings.filter(b => 
            new Date(b.startDate) <= day && new Date(b.endDate) >= day && b.status === "APPROVED"
          );
          const isBooked = dayBookings.length > 0;

          return (
            <div 
              key={idx} 
              className={`min-h-[100px] rounded-lg p-2 flex flex-col justify-between border transition-all duration-200
                ${isPast ? "bg-zinc-50 border-transparent text-zinc-400 dark:bg-zinc-950/50" : 
                  isBooked ? "bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 opacity-60" : 
                  "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500"}
              `}
            >
              <span className={`text-sm font-medium ${isBooked && !isPast ? "text-zinc-500" : "text-zinc-900 dark:text-zinc-100"}`}>
                {format(day, "d")}
              </span>
              {isBooked && (
                <div className="w-full mt-2 inline-flex items-center justify-center rounded bg-zinc-200 px-2 py-1 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                  Booked
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-end space-x-4 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700 mr-2"></span> Available</div>
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-700 mr-2"></span> Booked</div>
      </div>
    </div>
  );
}
