'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitBooking(formData: FormData) {
  const guestName = formData.get("guestName") as string;
  const guestEmail = formData.get("guestEmail") as string;
  const guestPhone = formData.get("guestPhone") as string;
  const eventType = formData.get("eventType") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;

  if (!guestName || !guestEmail || !startDateStr || !endDateStr) {
    return { error: "Missing required fields." };
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    return { error: "Start date must be before end date." };
  }

  // Prevent overlapping with approved bookings
  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      status: "APPROVED",
      AND: [
        { startDate: { lte: endDate } },
        { endDate: { gte: startDate } },
      ],
    },
  });

  if (overlappingBooking) {
    return { error: "These dates are already booked. Please choose another date." };
  }

  try {
    await prisma.booking.create({
      data: {
        guestName,
        guestEmail,
        guestPhone,
        eventType,
        startDate,
        endDate,
        status: "PENDING",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/guest");
    return { success: true };
  } catch (error) {
    console.error("Booking error:", error);
    return { error: "Failed to submit booking." };
  }
}
