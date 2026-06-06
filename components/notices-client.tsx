"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { isAdmin } from "@/lib/admin";
import { toast } from "@/hooks/use-toast";
import { 
  Bell, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  Search, 
  X, 
  Megaphone, 
  AlertCircle, 
  Sparkles, 
  CheckCircle, 
  ExternalLink, 
  Lock,
  Loader2,
  Info
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "notice" | "update" | "alert" | "event";
  important?: boolean;
  link?: string;
  createdAt: Timestamp;
}

const typeConfig = {
  alert: {
    label: "Alert",
    icon: AlertCircle,
    styles: "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400 ring-red-500/20",
    gradient: "from-red-500/10 to-transparent",
    dot: "bg-red-500",
  },
  update: {
    label: "Update",
    icon: Sparkles,
    styles: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
    gradient: "from-emerald-500/10 to-transparent",
    dot: "bg-emerald-500",
  },
  event: {
    label: "Event",
    icon: Calendar,
    styles: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 ring-amber-500/20",
    gradient: "from-amber-500/10 to-transparent",
    dot: "bg-amber-500",
  },
  notice: {
    label: "Notice",
    icon: Megaphone,
    styles: "border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 ring-blue-500/20",
    gradient: "from-blue-500/10 to-transparent",
    dot: "bg-blue-500",
  },
};

export function NoticesClient() {
  const { user } = useAuth();
  const admin = isAdmin(user?.email);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "alert" | "update" | "notice" | "event">("all");

  // Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formType, setFormType] = useState<Notice["type"]>("notice");
  const [formImportant, setFormImportant] = useState(false);
  const [formLink, setFormLink] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Sync notices in real time from Firestore
  useEffect(() => {
    const noticesRef = collection(db, "notices");
    const q = query(noticesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedNotices: Notice[] = [];
        snapshot.forEach((doc) => {
          fetchedNotices.push({ id: doc.id, ...doc.data() } as Notice);
        });
        setNotices(fetchedNotices);
        setLoading(false);
      },
      (error) => {
        console.error("Error syncing notices:", error);
        toast({
          title: "Failed to load updates",
          description: "Database connection failed. Please reload.",
          variant: "error",
        });
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const handleOpenAddModal = () => {
    setEditingNotice(null);
    setFormTitle("");
    setFormContent("");
    setFormType("notice");
    setFormImportant(false);
    setFormLink("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (notice: Notice) => {
    setEditingNotice(notice);
    setFormTitle(notice.title);
    setFormContent(notice.content);
    setFormType(notice.type);
    setFormImportant(notice.important || false);
    setFormLink(notice.link || "");
    setIsModalOpen(true);
  };

  const handleDeleteNotice = async (noticeId: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "notices", noticeId));
      toast({
        title: "Announcement Deleted",
        description: "The update was removed from the database.",
        variant: "success",
      });
    } catch (error: any) {
      console.error("Error deleting notice:", error);
      toast({
        title: "Error Deleting Notice",
        description: error.message || "Something went wrong.",
        variant: "error",
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Title and content fields are required.",
        variant: "error",
      });
      return;
    }

    setFormLoading(true);

    try {
      const noticeData = {
        title: formTitle.trim(),
        content: formContent.trim(),
        type: formType,
        important: formImportant,
        link: formLink.trim() || null,
        updatedAt: Timestamp.now(),
      };

      if (editingNotice) {
        // Edit Notice
        await updateDoc(doc(db, "notices", editingNotice.id), noticeData);
        toast({
          title: "Notice Updated Successfully",
          description: "Your changes have been saved.",
          variant: "success",
        });
      } else {
        // Create Notice
        await addDoc(collection(db, "notices"), {
          ...noticeData,
          createdAt: Timestamp.now(),
        });
        toast({
          title: "Announcement Published",
          description: "New update has been broadcasted.",
          variant: "success",
        });
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving notice:", error);
      toast({
        title: "Database Error",
        description: error.message || "Failed to save the notice.",
        variant: "error",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const formatDate = (timestamp?: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter Logic
  const filteredNotices = notices.filter((notice) => {
    const matchesTab = activeTab === "all" || notice.type === activeTab;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const categories = [
    { value: "all", label: "All Updates" },
    { value: "alert", label: "Alerts" },
    { value: "update", label: "Updates" },
    { value: "notice", label: "General Notices" },
    { value: "event", label: "Events" },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-30 dark:opacity-15" />
      <div className="absolute top-[20%] left-[-10%] size-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10 border-b border-border/20 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold text-primary mb-3">
            <Bell className="size-3.5 animate-pulse" />
            <span>Bulletin Board</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Updates & Announcements
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            Welcome to the official BCA YCMOU notice board. Stay up to date with exam schedules, notes announcements, holiday alerts, and resources additions.
          </p>
        </div>

        {/* Admin floating card or button */}
        {admin && (
          <Button 
            onClick={handleOpenAddModal}
            className="h-11 px-5 font-semibold text-sm gap-2 shadow-lg hover:shadow-primary/25 bg-primary hover:scale-[1.02] active:scale-95 transition-all text-white border-none shrink-0"
          >
            <Plus className="size-5" />
            Publish Notice
          </Button>
        )}
      </div>

      {/* Controls: Search & Tabs */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8 relative z-10">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search notices, updates or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all select-none border whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeTab === cat.value
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notice List Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-56 rounded-xl bg-card border ring-1 ring-foreground/5 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 bg-muted animate-pulse rounded-full" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
              </div>
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md" />
              <div className="h-16 w-full bg-muted animate-pulse rounded-md" />
            </div>
          ))}
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="text-center py-20 relative z-10 border border-dashed rounded-2xl bg-muted/10">
          <Megaphone className="size-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground">No announcements found</h3>
          <p className="text-muted-foreground text-sm mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "We couldn't find any notices matching your query. Try searching for something else."
              : "There are currently no notices published in this category."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredNotices.map((notice) => {
              const config = typeConfig[notice.type] || typeConfig.notice;
              const Icon = config.icon;

              return (
                <motion.div
                  key={notice.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full group"
                >
                  <Card className="h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-border/70 hover:border-primary/40">
                    {/* Ambient Glow Background on Hover */}
                    <div className={`absolute top-0 right-0 -mt-10 -mr-10 size-28 rounded-full bg-gradient-to-br ${config.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <CardHeader className="p-6 pb-3">
                      <div className="flex justify-between items-start gap-2 mb-3">
                        {/* Type Badge */}
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${config.styles}`}>
                          <Icon className="size-3" />
                          <span>{config.label}</span>
                        </div>

                        {/* Date Info */}
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
                          <Calendar className="size-3" />
                          {formatDate(notice.createdAt)}
                        </span>
                      </div>

                      <CardTitle className="text-base font-bold leading-snug flex items-start gap-2 pt-1">
                        {notice.important && (
                          <span className="relative flex h-2 w-2 mt-1.5 shrink-0">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
                          </span>
                        )}
                        <span className="text-foreground">{notice.title}</span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 flex-1 flex flex-col justify-between">
                      <div className="flex-1">
                        <CardDescription className="text-xs leading-relaxed text-foreground/80 dark:text-foreground/90 whitespace-pre-wrap font-normal mb-6">
                          {notice.content}
                        </CardDescription>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                        {/* Resource link */}
                        {notice.link ? (
                          <Link
                            href={notice.link}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                          >
                            Access Attachment
                            <ExternalLink className="size-3" />
                          </Link>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 italic font-normal">Official Bulletin</span>
                        )}

                        {/* Admin controls */}
                        {admin && (
                          <div className="flex items-center gap-1.5">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => handleOpenEditModal(notice)}
                              className="text-muted-foreground hover:text-foreground hover:bg-muted/80"
                              title="Edit notice"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => handleDeleteNotice(notice.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                              title="Delete notice"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Write/Edit Notice Modal Dialog (Framer Motion Custom Overlay) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !formLoading && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-card border rounded-2xl shadow-2xl p-6 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Lock className="size-4 text-primary" />
                    {editingNotice ? "Edit Announcement" : "Create New Notice"}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Broadcasting updates instantly to all BCA YCMOU students.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={formLoading}
                  className="rounded-full p-1.5 hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 overflow-y-auto flex-1 pr-1">
                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="title" className="text-xs font-semibold text-foreground">
                    Notice Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Sem 3 C++ Notes Uploaded"
                    required
                    disabled={formLoading}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                {/* Announcement Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Notice Type</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(["notice", "update", "alert", "event"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormType(type)}
                        disabled={formLoading}
                        className={`py-2 px-1 border rounded-lg text-xs font-semibold text-center transition-all capitalize select-none ${
                          formType === type
                            ? "bg-primary border-primary text-white shadow-sm"
                            : "bg-muted/40 hover:bg-muted text-muted-foreground border-transparent"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label htmlFor="content" className="text-xs font-semibold text-foreground">
                    Message Body
                  </label>
                  <textarea
                    id="content"
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Provide details about the announcement..."
                    required
                    rows={4}
                    disabled={formLoading}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]"
                  />
                </div>

                {/* Optional Attachment Link */}
                <div className="space-y-1.5">
                  <label htmlFor="link" className="text-xs font-semibold text-foreground flex items-center gap-1">
                    Attachment Link <span className="text-muted-foreground text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="link"
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    placeholder="e.g. https://bcanotes.tech/notes/cpp"
                    disabled={formLoading}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                {/* Important Checkbox */}
                <div className="flex items-center gap-2.5 py-1.5 select-none">
                  <input
                    type="checkbox"
                    id="important"
                    checked={formImportant}
                    onChange={(e) => setFormImportant(e.target.checked)}
                    disabled={formLoading}
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary/50 cursor-pointer"
                  />
                  <label
                    htmlFor="important"
                    className="text-xs font-semibold text-foreground flex items-center gap-1.5 cursor-pointer"
                  >
                    Flag as High Priority / Important
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={formLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-primary text-white text-sm font-semibold gap-1.5"
                  >
                    {formLoading && <Loader2 className="size-3.5 animate-spin" />}
                    {editingNotice ? "Save Changes" : "Publish Announcement"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
