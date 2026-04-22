import type { APIRoute } from "astro";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
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

const redisUrl =
  import.meta.env.KV_REST_API_URL || import.meta.env.UPSTASH_REDIS_REST_URL;
const redisToken =
  import.meta.env.KV_REST_API_TOKEN || import.meta.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(5, "1 h"),
        analytics: false,
        prefix: "ratelimit:apply",
      })
    : null;

const getClientIp = (request: Request): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") || "anonymous";
};

const formatRetryAfter = (seconds: number): string => {
  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"}`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    if (ratelimit) {
      const ip = getClientIp(request);
      const { success, reset } = await ratelimit.limit(ip);
      if (!success) {
        const retryInSeconds = Math.max(
          1,
          Math.ceil((reset - Date.now()) / 1000)
        );
        return new Response(
          JSON.stringify({
            error: `Too many submissions. Please try again in ${formatRetryAfter(retryInSeconds)}.`,
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(retryInSeconds),
            },
          }
        );
      }
    }

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