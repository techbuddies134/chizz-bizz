import { createReservation } from "@/db/queries";
import { errorResponse } from "@/lib/http-error";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }
    const reservation = await createReservation(body);
    return Response.json({ ok: true, reservation }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
