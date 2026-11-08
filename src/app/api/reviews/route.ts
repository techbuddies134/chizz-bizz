import { createReview, getReviewsList } from "@/db/queries";
import { errorResponse } from "@/lib/http-error";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getReviewsList();
    return Response.json({ ok: true, reviews: items });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
    }
    const review = await createReview(body);
    return Response.json({ ok: true, review }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
