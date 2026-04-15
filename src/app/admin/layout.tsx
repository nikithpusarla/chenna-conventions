import { signOut } from "@/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-black">
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
        <div className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Admin Panel</div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="text-sm rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 px-3 py-1.5 transition-colors font-medium text-zinc-600 dark:text-zinc-300">
            Sign Out
          </button>
        </form>
      </header>
      <div className="flex flex-1">
        <main className="flex-1 p-6 space-y-6">
            {children}
        </main>
      </div>
    </div>
  );
}
