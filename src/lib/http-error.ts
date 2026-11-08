export class HttpError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export function errorResponse(error: unknown): Response {
  if (error instanceof HttpError) {
    return Response.json({ ok: false, error: error.message }, { status: error.status });
  }
  console.error(error);
  return Response.json(
    { ok: false, error: "Something went wrong. Please try again." },
    { status: 500 },
  );
}
