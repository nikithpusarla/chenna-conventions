'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(id: string, status: string) {
  try {
    if (status === "APPROVED") {
      const target = await prisma.booking.findUnique({ where: { id } });
      if (target) {
        const overlapping = await prisma.booking.findFirst({
          where: {
            status: "APPROVED",
            id: { not: id },
            AND: [
              { startDate: { lte: target.endDate } },
              { endDate: { gte: target.startDate } },
            ],
          },
        });
        if (overlapping) {
          return { error: "Cannot approve: Conflicts with an existing approved booking." };
        }
      }
    }

    await prisma.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/guest");
    return { success: true };
  } catch (error) {
    console.error("Failed to update booking status", error);
    return { error: "Database error." };
  }
}

export async function adminCreateBooking(formData: FormData) {
  const guestName = formData.get("guestName") as string;
  const eventType = formData.get("eventType") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;

  if (!guestName || !startDateStr || !endDateStr) {
    return { error: "Missing required fields." };
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate > endDate) {
    return { error: "Start date must be before end date." };
  }

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
    return { error: "These dates are already booked." };
  }

  try {
    await prisma.booking.create({
      data: {
        guestName: guestName + " (Admin)",
        guestEmail: "admin@chennaconventions.local",
        guestPhone: "N/A",
        eventType,
        startDate,
        endDate,
        status: "APPROVED", // Auto approve admin bookings
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/guest");
    return { success: true };
  } catch (error) {
    console.error("Admin booking error:", error);
    return { error: "Failed to create booking." };
  }
}
