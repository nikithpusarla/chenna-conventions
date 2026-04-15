'use client';

import { useActionState } from 'react';
import { adminCreateBooking } from '@/app/admin/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      {pending ? "Adding..." : "Add Booking"}
    </button>
  );
}

export default function AdminBookingForm() {
  const [state, formAction] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      return await adminCreateBooking(formData);
    },
    null
  );

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white p-6 shadow-sm dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Add Booking Directly</h3>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-900 dark:text-zinc-100">Guest Name</label>
            <input required name="guestName" type="text" className="w-full rounded-md border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-900 dark:text-zinc-100">Event Type</label>
            <select name="eventType" className="w-full rounded-md border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white">
              <option>Wedding</option>
              <option>Corporate Event</option>
              <option>Birthday Party</option>
              <option>Internal Admin Hold</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-900 dark:text-zinc-100">Start Date</label>
            <input required name="startDate" type="date" className="w-full rounded-md border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-900 dark:text-zinc-100">End Date</label>
            <input required name="endDate" type="date" className="w-full rounded-md border border-zinc-200 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="w-48">
              <SubmitButton />
            </div>
            <div className="flex-1">
                {state?.error && <p className="text-sm text-red-500 font-medium">{state.error}</p>}
                {state?.success && <p className="text-sm text-green-500 font-medium">Added successfully!</p>}
            </div>
        </div>
      </form>
    </div>
  );
}
