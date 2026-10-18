import { NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterSignupSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = newsletterSignupSchema.safeParse(body);

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

    const subject = `[FindYourNCHome.com] New newsletter subscriber`;

    const lines = [
      `Email: ${data.email}`,
      data.firstName ? `First name: ${data.firstName}` : null,
      data.source ? `Source: ${data.source}` : null,
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
      console.error("Resend error (newsletter):", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
