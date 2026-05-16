"use client";

import { useState } from "react";
import { Link as LinkIcon, Send, CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const CATEGORIES = [
  { id: "notes", label: "Subject Notes", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "books", label: "E-Books Reference", color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "question-papers", label: "Question Papers", color: "text-green-500", bg: "bg-green-500/10" },
  { id: "practicals", label: "Solved Practicals", color: "text-orange-500", bg: "bg-orange-500/10" },
];

export function LinkSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("notes");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
    formData.append("category", selectedCategory);
    formData.append("form_name", "Link Submission - BCA YCMOU");

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
        setIsSuccess(true);
        toast({
          title: "Submission received!",
          description: "We'll review your link and add it to the archive soon.",
          variant: "success",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Submission failed",
          description: result.message || "Something went wrong. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Network error",
        description: "Something went wrong! Please try again later.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-green-500/20 bg-green-500/5 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 size-24 bg-green-500/10 rounded-full blur-2xl" />
        <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-4">
          <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-pulse">
            <CheckCircle2 className="size-8 text-green-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">Awesome contribution!</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Your link has been submitted for review. It will be added to the portal within 24-48 hours after verification.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsSuccess(false)}
            className="mt-4"
          >
            Submit another link
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm shadow-xl relative overflow-hidden group">
      {/* Aesthetic background elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 size-40 bg-blue-500/5 rounded-full blur-3xl" />
      
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <LinkIcon className="size-5 text-primary" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="size-3 text-yellow-500" /> Manual Review
          </div>
        </div>
        <CardTitle className="text-2xl tracking-tight">Submit via Link</CardTitle>
        <CardDescription>
          Prefer sharing your own Google Drive link? Paste it below and we&apos;ll do the rest.
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold flex items-center gap-1.5">
                Resource Title <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="e.g. SEM 1 - Discrete Mathematics Notes" 
                required 
                disabled={isSubmitting}
                className="bg-background/50 border-border/50 focus:border-primary/50 transition-all h-11"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Select Category</Label>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    disabled={isSubmitting}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center gap-1.5 ${
                      selectedCategory === cat.id 
                        ? `${cat.bg} border-primary/40 ring-2 ring-primary/10` 
                        : "bg-background/30 border-border/50 hover:bg-muted/50"
                    }`}
                  >
                    <span className={`text-xs font-bold uppercase tracking-tighter ${selectedCategory === cat.id ? cat.color : "text-muted-foreground"}`}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link" className="text-sm font-semibold flex items-center gap-1.5">
                Google Drive Link <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                <Input 
                  id="link" 
                  name="link" 
                  type="url"
                  placeholder="https://drive.google.com/..." 
                  required 
                  disabled={isSubmitting}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all h-11"
                />
              </div>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1.5 ml-1">
                <Info className="size-3" /> Make sure the link is set to &quot;Anyone with the link&quot;
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contributor" className="text-sm font-semibold">
                Your Name <span className="text-xs font-normal text-muted-foreground">(Optional, for credits)</span>
              </Label>
              <Input 
                id="contributor" 
                name="contributor" 
                placeholder="e.g. Sahil" 
                disabled={isSubmitting}
                className="bg-background/50 border-border/50 focus:border-primary/50 transition-all h-11"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 gap-2 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Contribution
                <Send className="size-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
