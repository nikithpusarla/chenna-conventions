'use client';

import { useActionState } from 'react';
import { submitBooking } from '@/app/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {pending ? "Submitting..." : "Request Booking"}
    </button>
  );
}

export default function BookingForm() {
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await submitBooking(formData);
    },
    null
  );

  return (
    <form action={formAction} className="mt-8 space-y-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Full Name</label>
          <input required name="guestName" type="text" className="w-full rounded-md border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Email Address</label>
          <input required name="guestEmail" type="email" className="w-full rounded-md border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Phone Number</label>
          <input name="guestPhone" type="tel" className="w-full rounded-md border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Event Type</label>
          <select name="eventType" className="w-full rounded-md border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white">
            <option>Wedding</option>
            <option>Corporate Event</option>
            <option>Birthday Party</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">Start Date</label>
          <input required name="startDate" type="date" className="w-full rounded-md border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">End Date</label>
          <input required name="endDate" type="date" className="w-full rounded-md border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
        </div>
      </div>
      
      <SubmitButton />

      {state?.error && <p className="text-sm text-red-500 mt-2">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-500 mt-2">Booking request submitted successfully! We will contact you soon.</p>}
    </form>
  );
}
