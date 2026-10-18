import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const firstError =
        result.error.errors[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !toEmail || !fromEmail) {
      console.error("Missing Resend configuration");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject = `[FindYourNCHome.com] ${data.service} inquiry from ${data.name}`;

    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.preferredLanguage
        ? `Preferred language: ${data.preferredLanguage}`
        : null,
      `Service: ${data.service}`,
      data.priceRange ? `Price range: ${data.priceRange}` : null,
      data.timeframe ? `Timeframe: ${data.timeframe}` : null,
      typeof data.needsIslamicFinancing === "boolean"
        ? `Interested in Islamic/Sharia-compliant financing: ${
            data.needsIslamicFinancing ? "Yes" : "No"
          }`
        : null,
      "",
      "Message:",
      data.message,
      "",
      `IP: ${ip}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <h2>New contact from FindYourNCHome.com</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${
        data.phone
          ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>`
          : ""
      }
      ${
        data.preferredLanguage
          ? `<p><strong>Preferred language:</strong> ${escapeHtml(
              data.preferredLanguage,
            )}</p>`
          : ""
      }
      <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
      ${
        data.priceRange
          ? `<p><strong>Price range:</strong> ${escapeHtml(
              data.priceRange,
            )}</p>`
          : ""
      }
      ${
        data.timeframe
          ? `<p><strong>Timeframe:</strong> ${escapeHtml(
              data.timeframe,
            )}</p>`
          : ""
      }
      ${
        typeof data.needsIslamicFinancing === "boolean"
          ? `<p><strong>Interested in Islamic/Sharia-compliant financing:</strong> ${
              data.needsIslamicFinancing ? "Yes" : "No"
            }</p>`
          : ""
      }
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
      <hr />
      <p><small>Submitted from IP: ${escapeHtml(ip)}</small></p>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      text: lines,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
