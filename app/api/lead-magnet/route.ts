import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadMagnetSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = leadMagnetSchema.safeParse(body);

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

    const subject =
      "[FindYourNCHome.com] Lead magnet: How to buy a home (first-time buyer)";

    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      typeof data.isFirstTimeBuyer === "boolean"
        ? `First-time buyer: ${data.isFirstTimeBuyer ? "Yes" : "No"}`
        : null,
      data.timeframe ? `Timeframe: ${data.timeframe}` : null,
      data.preferredLanguage
        ? `Preferred language: ${data.preferredLanguage}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      text: lines,
    });

    if (error) {
      console.error("Resend error (lead magnet):", error);
      return NextResponse.json(
        { error: "Failed to submit. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead magnet API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
