import { prisma } from "@/lib/prisma";
import AdminCalendar from "@/components/AdminCalendar";
import AdminBookingForm from "@/components/AdminBookingForm";
import AdminBookingRow from "@/components/AdminBookingRow";

export default async function AdminDashboard() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <AdminBookingForm />

      <section>
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Calendar View</h2>
        <AdminCalendar bookings={bookings} />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">All Bookings</h2>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="lowercase tracking-wider border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 font-medium text-zinc-500 dark:text-zinc-400">
              <tr>
                <th scope="col" className="px-6 py-4">Guest</th>
                <th scope="col" className="px-6 py-4">Dates</th>
                <th scope="col" className="px-6 py-4">Type</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-800 dark:text-zinc-200">
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No bookings found.
                  </td>
                </tr>
              )}
              {bookings.map((b) => (
               <AdminBookingRow key={b.id} b={b} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
