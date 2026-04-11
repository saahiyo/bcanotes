"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (response.status === 200) {
        setStatus("success");
        setMessage("Thank you for reaching out! We'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
        
        // Reset status after a few seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong! Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-2xl">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Have a question, suggestion, or want to contribute? We'd love to hear from you. Fill out the form below and we'll be in touch.
        </p>
      </div>

      <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Send a Message
          </CardTitle>
          <CardDescription>
            Fill in the details below and we&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  required 
                  disabled={status === "submitting"}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="pl-9 bg-background/50"
                    required 
                    disabled={status === "submitting"}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                name="subject" 
                placeholder="How can we help?" 
                required 
                disabled={status === "submitting"}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                name="message" 
                placeholder="Your deeply thoughtful message goes here..." 
                rows={5} 
                required 
                disabled={status === "submitting"}
                className="resize-none bg-background/50"
              />
            </div>

            {status !== "idle" && (
              <div className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${
                status === "success" ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20" : 
                status === "error" ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" : 
                ""
              }`}>
                {status === "success" && <CheckCircle2 className="h-5 w-5" />}
                {status === "error" && <AlertCircle className="h-5 w-5" />}
                {status === "submitting" ? "Sending message..." : message}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full gap-2 text-primary-foreground font-semibold"
              disabled={status === "submitting"}
              size="lg"
            >
              {status === "submitting" ? "Sending..." : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
