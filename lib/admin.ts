/**
 * Checks if a given email has administrative privileges.
 * Admin emails are defined as a comma-separated list in the NEXT_PUBLIC_ADMIN_EMAILS environment variable,
 * or as a single email in the NEXT_PUBLIC_ADMIN_EMAIL environment variable.
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();

  // Get admin emails list from environment variable
  const adminEmailsString = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const adminEmails = adminEmailsString
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  // Support single admin email fallback variable
  const singleAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();
  if (singleAdmin) {
    adminEmails.push(singleAdmin);
  }

  return adminEmails.includes(normalizedEmail);
}

