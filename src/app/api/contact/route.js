import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const rateLimitMap = new Map();

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();
    const COOLDOWN = 60 * 60 * 1000;

    if (rateLimitMap.has(ip)) {
      const lastSent = rateLimitMap.get(ip);
      if (now - lastSent < COOLDOWN) {
        const remainingMinutes = Math.ceil(
          (COOLDOWN - (now - lastSent)) / (1000 * 60),
        );
        return NextResponse.json(
          {
            error: `Too many requests. Please try again in ${remainingMinutes} minutes.`,
          },
          { status: 429 },
        );
      }
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <contact@coflyn.my.id>",
      to: ["riazrepo@gmail.com"],
      subject: `New Collaboration Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #c4a882;">New Message!</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Sent via coflyn Portfolio Contact Form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    rateLimitMap.set(ip, now);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
