"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, UploadCloud, CheckCircle2, AlertCircle, Link as LinkIcon, GraduationCap, BookOpen, Clock, Heart, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function ContributePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [isUploadingDirect, setIsUploadingDirect] = useState(false);
  const [isUploadSuccessDirect, setIsUploadSuccessDirect] = useState(false);
  const [uploadErrorDirect, setUploadErrorDirect] = useState("");
  const [dragActive, setDragActive] = useState(false);
  
  const [showLinkUrlForm, setShowLinkUrlForm] = useState(false);

  const handleDrag = function(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async function(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploadingDirect(true);
    setUploadErrorDirect("");
    
    // Check file size limit (e.g. 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setUploadErrorDirect("File is too large. Please upload files under 20MB.");
      setIsUploadingDirect(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setIsUploadSuccessDirect(true);
      } else {
        setUploadErrorDirect(data.message || "Failed to upload file.");
      }
    } catch (err) {
      setUploadErrorDirect("Network error. Please try again later.");
    } finally {
      setIsUploadingDirect(false);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    // You should put your actual key in .env.local like: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Mock Success for demonstration until User adds Key
      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
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
      } else {
        setError(data.message || "An error occurred while submitting the form.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Contribute</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Help build the ultimate archive. Share your Google Drive link and help hundreds of BCA students prep for their exams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Info Column (Compact) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UploadCloud className="h-5 w-5" /> How it works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <UploadCloud className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">1. Upload to Drive</h3>
                  <p className="text-muted-foreground text-xs">Upload your file to your Google Drive.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                  <LinkIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">2. Copy Public Link</h3>
                  <p className="text-muted-foreground text-xs">Set access to "Anyone with the link".</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">3. Submit Form</h3>
                  <p className="text-muted-foreground text-xs">Drop the link here and we'll add it.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-primary" /> Direct Folder Upload <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">Recommended</span>
              </CardTitle>
              <CardDescription>
                Fastest way: Skip the form and drop your files directly into our community Google Drive folder.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isUploadSuccessDirect ? (
                 <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center animate-fade-in bg-green-500/5 rounded-xl border border-green-500/20">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-600 dark:text-green-400">File Uploaded successfully!</h3>
                    <p className="text-muted-foreground text-xs mt-1">It has been safely deposited in the Drive folder.</p>
                  </div>
                  <Button size="sm" onClick={() => setIsUploadSuccessDirect(false)} variant="outline">Upload another file</Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  {uploadErrorDirect && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <p>{uploadErrorDirect}</p>
                    </div>
                  )}
                  
                  <div 
                    className={`relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl transition-colors ${dragActive ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted/50"} ${isUploadingDirect ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={handleChange}
                      disabled={isUploadingDirect}
                    />
                    
                    {isUploadingDirect ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm font-medium text-primary animate-pulse">Uploading directly to Drive...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center px-4">
                        <div className="p-3 rounded-full bg-primary/10 mb-2">
                          <UploadCloud className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PDF, Images, or Documents (Max 20MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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
                  {showLinkUrlForm ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CardHeader>
            </button>
            
            {showLinkUrlForm && (
              <CardContent className="animate-in slide-in-from-top-4 fade-in duration-300">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold">Thank you for contributing!</h3>
                  <p className="text-muted-foreground text-sm max-w-[300px]">
                    Your contribution has been submitted. We'll review and add it to the portal soon.
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
                      <AlertCircle className="w-4 h-4 shrink-0" />
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
                      <BookOpen className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                      <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Contribution <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
