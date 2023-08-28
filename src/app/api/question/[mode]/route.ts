import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    mode: z.enum(["truth", "dare", "tod"]),
  }),
});

export async function GET(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context);
    let mode: "truth" | "dare" = "truth";

    if (params.mode === "tod") {
      mode = Math.random() < 0.5 ? "truth" : "dare";
    } else {
      mode = params.mode;
    }

    const { searchParams } = new URL(request.url);
    let rating = searchParams.get("rating");
    if (!rating) {
      rating = "pg13";
    }

    try {
      const res = await fetch(
        `https://api.truthordarebot.xyz/v1/${mode}?rating=${rating}`,
        {
          cache: "no-cache",
        },
      );
      if (res.ok) {
        const question = await res.json();
        return NextResponse.json(question, { status: 200 });
      } else {
        return new Response(null, { status: 400 });
      }
    } catch (error) {
      return new Response(null, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
