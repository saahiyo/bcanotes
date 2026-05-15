"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function DirectUpload() {
  const [isUploadingDirect, setIsUploadingDirect] = useState(false);
  const [isUploadSuccessDirect, setIsUploadSuccessDirect] = useState(false);
  const [uploadErrorDirect, setUploadErrorDirect] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

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
    setUploadProgress(0);
    
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload files under 20MB.",
        variant: "error",
      });
      setIsUploadingDirect(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.addEventListener("load", () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.success) {
          setIsUploadSuccessDirect(true);
          toast({
            title: "Upload successful!",
            description: "Your file has been uploaded to the Drive folder.",
            variant: "success",
          });
        } else {
          toast({
            title: "Upload failed",
            description: data.message || "Failed to upload file.",
            variant: "error",
          });
        }
      } catch {
        toast({
          title: "Upload failed",
          description: "Unexpected response from server.",
          variant: "error",
        });
      } finally {
        setIsUploadingDirect(false);
      }
    });

    xhr.addEventListener("error", () => {
      toast({
        title: "Network error",
        description: "Could not upload file. Please try again later.",
        variant: "error",
      });
      setIsUploadingDirect(false);
    });

    xhr.open("POST", "/api/upload");
    xhr.send(formData);
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <UploadCloud className="size-5 text-primary" /> Direct Folder Upload <span className="text-xs font-semibold bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">Recommended</span>
        </CardTitle>
        <CardDescription>
          Fastest way: Skip the form and drop your files directly into our community Google Drive folder.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isUploadSuccessDirect ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center animate-fade-in bg-green-500/5 rounded-xl border border-green-500/20">
            <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <CheckCircle2 className="size-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-green-600 dark:text-green-400">File Uploaded successfully!</h3>
              <p className="text-muted-foreground text-xs mt-1">It has been safely deposited in the Drive folder.</p>
            </div>
            <Button size="sm" onClick={() => setIsUploadSuccessDirect(false)} variant="outline">Upload another file</Button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {uploadErrorDirect && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="size-4 shrink-0" />
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
                <div className="flex flex-col items-center gap-4 w-full px-8">
                  <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-primary">Uploading to Server...</span>
                      <span className="text-primary tabular-nums">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center px-4">
                  <div className="p-3 rounded-full bg-primary/10 mb-2">
                    <UploadCloud className="size-8 text-primary" />
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
  );
}
