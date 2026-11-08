import { getMenuItems } from "@/db/queries";
import { errorResponse } from "@/lib/http-error";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await getMenuItems();
    return Response.json({ ok: true, items });
  } catch (error) {
    return errorResponse(error);
  }
}
