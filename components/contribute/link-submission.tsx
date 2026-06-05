"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Link as LinkIcon, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function LinkSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showLinkUrlForm, setShowLinkUrlForm] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        toast({
          title: "Contribution submitted!",
          description: "Thank you! We'll review and add it to the portal soon.",
          variant: "success",
        });
      }, 1500);
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("subject", "New Contribution: BCA Notes Portal");
    formData.append("from_name", "BCA Notes Portal");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        e.currentTarget.reset();
        toast({
          title: "Contribution submitted!",
          description: "Thank you! We'll review and add it to the portal soon.",
          variant: "success",
        });
      } else {
        setError(data.message || "An error occurred while submitting the form.");
        toast({
          title: "Submission failed",
          description: data.message || "An error occurred. Please try again.",
          variant: "error",
        });
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      toast({
        title: "Network error",
        description: "Could not submit. Please try again later.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-200">
      <button 
        className="w-full text-left hover:bg-muted/30 transition-colors"
        onClick={() => setShowLinkUrlForm(!showLinkUrlForm)}
        type="button"
      >
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="space-y-1.5 pr-4">
            <CardTitle className="text-xl">Submit Existing Link</CardTitle>
            <CardDescription>Already have the file in your Drive? Submit the public link below.</CardDescription>
          </div>
          <div className="p-2 shrink-0 flex items-center justify-center rounded-full bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
            {showLinkUrlForm ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </div>
        </CardHeader>
      </button>
      
      {showLinkUrlForm && (
        <CardContent className="animate-in slide-in-from-top-4 fade-in duration-300">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-fade-in">
            <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="size-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Thank you for contributing!</h3>
            <p className="text-muted-foreground text-sm max-w-[300px]">
              Your contribution has been submitted. We&apos;ll review and add it to the portal soon.
            </p>
            <Button 
              className="mt-6 px-6"
              onClick={() => setIsSuccess(false)}
              variant="outline"
            >
              Submit another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="size-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Your Name <span className="text-muted-foreground font-normal text-xs">(Optional)</span></label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. John Doe" 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Semester <span className="text-red-500">*</span></label>
                <select 
                  name="semester" 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Resource Type <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {['Notes', 'Practical', 'Question Paper'].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input type="radio" name="resource_type" value={type} className="peer sr-only" defaultChecked={type === 'Notes'} required />
                    <div className="rounded-md border border-input bg-transparent px-3 py-2 text-center text-sm hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all line-clamp-1">
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Subject Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
                <input 
                  type="text" 
                  name="subject" 
                  required
                  placeholder="e.g. Data Structures, Java..." 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Google Drive URL <span className="text-red-500">*</span></label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
                <input 
                  type="url" 
                  name="drive_link"
                  required 
                  placeholder="https://drive.google.com/file/d/..." 
                  className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Additional Message <span className="text-muted-foreground font-normal text-xs">(Optional)</span></label>
              <textarea 
                name="message" 
                rows={2}
                placeholder="Any additional info..." 
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]" 
              />
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full h-12 text-base transition-transform active:scale-[0.98] mt-4 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Submit Contribution <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
        )}
        </CardContent>
      )}
    </Card>
  );
}
