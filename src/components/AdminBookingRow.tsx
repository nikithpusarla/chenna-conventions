'use client';

import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { updateBookingStatus } from "@/app/admin/actions";

export default function AdminBookingRow({ b }: { b: Booking }) {
  const handleAction = async (status: string) => {
    const result = await updateBookingStatus(b.id, status);
    if (result && result.error) {
      alert(result.error);
    }
  };

  return (
    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-semibold">{b.guestName}</div>
        <div className="text-xs text-zinc-500">{b.guestEmail} • {b.guestPhone}</div>
      </td>
      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
        {format(new Date(b.startDate), "MMM d, yyyy")} - {format(new Date(b.endDate), "MMM d, yyyy")}
      </td>
      <td className="px-6 py-4">{b.eventType}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold
            ${
              b.status === "APPROVED"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : b.status === "REJECTED"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            }
          `}
        >
          {b.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
           {b.status === "PENDING" && (
             <>
               <button
                 onClick={() => handleAction("APPROVED")}
                 className="text-white bg-black dark:bg-white dark:text-black px-3 py-1.5 rounded-md font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-xs"
               >
                 Approve
               </button>
               <button
                 onClick={() => handleAction("REJECTED")}
                 className="text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-md font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-xs"
               >
                 Reject
               </button>
             </>
           )}
        </div>
      </td>
    </tr>
  );
}
