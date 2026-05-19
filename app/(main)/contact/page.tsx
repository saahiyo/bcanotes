import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Contact Us | BCA YCMOU",
  description: "Get in touch with the BCA YCMOU team for questions, suggestions, or contributions. We're here to help you succeed.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-2xl">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Have a question, suggestion, or want to contribute? We&apos;d love to hear from you. Fill out the form below and we&apos;ll be in touch.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
