import { prisma } from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";
import PublicCalendar from "@/components/PublicCalendar";
import Link from "next/link";

export default async function Home() {
  const approvedBookings = await prisma.booking.findMany({
    where: { status: "APPROVED" },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      status: true,
      guestName: false, // Don't expose PII
      guestEmail: false,
      guestPhone: false,
      eventType: false,
      createdAt: true,
      updatedAt: true,
    }
  });

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/50 px-6 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/50">
        <div className="text-xl font-bold tracking-tight">Chenna Conventions</div>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#venue" className="hover:text-zinc-500 transition-colors">Venue</Link>
          <Link href="#availability" className="hover:text-zinc-500 transition-colors">Availability</Link>
          <Link href="#book" className="hover:text-zinc-500 transition-colors">Book Now</Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12 md:py-24 space-y-32">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-6">
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
            The premier venue for your extraordinary events.
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            From majestic weddings to impactful corporate events, Chenna Conventions offers a state-of-the-art, elegant space tailored for perfection. 
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="#book" className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Request Booking
            </Link>
          </div>
        </section>

        {/* Availability Section */}
        <section id="availability" className="space-y-8 scroll-mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Check Availability</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">View our open dates to plan your event.</p>
          </div>
          <PublicCalendar bookings={approvedBookings as any} />
        </section>

        {/* Booking Form Section */}
        <section id="book" className="space-y-8 scroll-mt-24 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Book the Venue</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Reserve your date today. All requests are subject to approval.</p>
          </div>
          <BookingForm />
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Chenna Conventions. All rights reserved.</p>
        <Link href="/admin/login" className="mt-4 block hover:text-black dark:hover:text-white transition-colors">Admin Login</Link>
      </footer>
    </div>
  );
}
