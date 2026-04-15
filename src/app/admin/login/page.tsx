import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-zinc-50 dark:bg-black">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-zinc-900 dark:bg-zinc-800 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <h2 className="text-2xl font-semibold">Chenna <br/> Conventions</h2>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
