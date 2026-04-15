import Link from "next/link";

export default function SplashPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-6 font-sans">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Chenna Conventions
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Welcome to the portal. Please select your role to continue.
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* User / Guest Card */}
        <Link 
          href="/guest"
          className="group relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800 transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900 dark:text-zinc-50"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">User Portal</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Check availability and request a booking for your upcoming event.
            </p>
          </div>
        </Link>

        {/* Admin Card */}
        <Link 
          href="/admin/login"
          className="group relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800 transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900 dark:text-zinc-50"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Admin Panel</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Manage venue settings, calendars, and approve pending requests.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
