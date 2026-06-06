import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ isAdmin: false });
  }

  // Server-side only environment variable (not prefixed with NEXT_PUBLIC_)
  // This value stays on the server and is NEVER bundled to the browser.
  const adminEmailsString = process.env.ADMIN_EMAILS || "";
  const adminEmails = adminEmailsString
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const singleAdmin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (singleAdmin) {
    adminEmails.push(singleAdmin);
  }

  const isAdmin = adminEmails.includes(email.trim().toLowerCase());

  return NextResponse.json({ isAdmin });
}
