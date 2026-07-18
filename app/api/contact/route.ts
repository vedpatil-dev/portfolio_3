import { NextResponse } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

// In-memory rate limiting configuration
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const LIMIT = 3; // max requests
const WINDOW_MS = 3 * 60 * 1000; // 3 minutes window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Periodic pruning if memory map grows too large
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      val.timestamps = val.timestamps.filter((t) => now - t < WINDOW_MS);
      if (val.timestamps.length === 0) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record) {
    rateLimitMap.set(ip, { timestamps: [now] });
    return false;
  }

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((t) => now - t < WINDOW_MS);

  if (record.timestamps.length >= LIMIT) {
    return true;
  }

  record.timestamps.push(now);
  return false;
}

export async function POST(request: Request) {
  try {
    // Rate Limiting Check
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many owls sent. Please wait a few minutes before sending another." },
        { status: 429 }
      );
    }

    const { name, email, message } = await request.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "hello.vedpatil.in";

    if (!smtpUser || !smtpPass) {
      console.error("Error: SMTP_USER and SMTP_PASS environment variables are not configured.");
      return NextResponse.json(
        { error: "Server mail configuration is incomplete." },
        { status: 500 }
      );
    }

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Elegant, magic diary themed email HTML
    const emailHtml = `
      <div style="font-family: 'Georgia', serif; padding: 24px; background-color: #fcf8f2; color: #21170f; border: 1px solid #d6bd89; max-width: 600px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #681d18; border-bottom: 1px dashed #b9955b; padding-bottom: 12px; margin-top: 0; font-weight: normal; font-size: 22px;">
          🦉 An Owl Has Arrived!
        </h2>
        <p style="margin: 16px 0; font-size: 15px;">
          <strong>Sender:</strong> ${name}
        </p>
        <p style="margin: 16px 0; font-size: 15px;">
          <strong>Email:</strong> <a href="mailto:${email}" style="color: #967331; text-decoration: none; border-bottom: 1px dotted #967331;">${email}</a>
        </p>
        <div style="background-color: rgba(214,189,137,0.15); border-left: 4px solid #b9955b; padding: 16px; margin: 24px 0; font-style: italic; white-space: pre-wrap; line-height: 1.6; font-size: 16px;">
          ${message}
        </div>
        <p style="font-size: 12px; color: #59402b; margin-top: 32px; border-top: 1px solid #e6dcc5; padding-top: 12px; text-align: right; font-style: italic; opacity: 0.8;">
          ~ Mischief Managed • Developer Journal ~
        </p>
      </div>
    `;

    // Mail options
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Must send from the authenticated address in Gmail
      replyTo: email, // Reply-to should be the sender's email
      to: receiverEmail,
      subject: `📜 Portfolio Message from ${name}`,
      text: `🦉 New portfolio message from ${name} (${email}):\n\n${message}`,
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Owl dispatched successfully!" });
  } catch (error: any) {
    console.error("Error sending email via Nodemailer:", error);
    return NextResponse.json(
      { error: "Failed to dispatch owl. Please try again later." },
      { status: 500 }
    );
  }
}
