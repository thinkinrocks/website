import type { APIRoute } from "astro";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  projectName: z.string().min(2, "Project name is required."),
  shortDescription: z.string().min(10, "Short description is too short."),
  helpNeeded: z.string().min(5, "Please describe what help you need."),
  email: z.string().email("Invalid email address."),
  github: z.string().optional().or(z.literal("")),
  telegram: z.string().optional().or(z.literal("")),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const json = await request.json();
    const data = applicationSchema.parse(json);

    await prisma.application.create({
      data: {
        fullName: data.fullName,
        projectName: data.projectName,
        shortDescription: data.shortDescription,
        helpNeeded: data.helpNeeded,
        email: data.email,
        github: data.github || null,
        telegram: data.telegram || null,
      },
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: error.issues[0]?.message || "Invalid form data." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.error("Apply API error:", error);

    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};