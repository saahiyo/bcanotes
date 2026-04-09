import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const semesters = [
  {
    id: "sem1",
    title: "Semester 1",
    subjects: [
      { name: "Problem Solving Using Computers", link: "/notes/problem-solving-using-computers" },
      { name: "Programming Using C++", link: "/notes/programming-using-cpp" },
    ]
  },
  {
    id: "sem2",
    title: "Semester 2",
    subjects: [
      { name: "Computer Network", link: "/notes/computer-network" },
      { name: "E.V.S", link: "/notes/evs" },
      { name: "D.S.A", link: "/notes/dsa" },
    ]
  },
  {
    id: "sem3",
    title: "Semester 3",
    subjects: [
      { name: "Operating System", link: "#" },
      { name: "Database Management System", link: "#" },
      { name: "Software Engineering", link: "#" },
    ]
  },
  {
    id: "sem4",
    title: "Semester 4",
    subjects: [
      { name: "Java Programming", link: "#" },
      { name: "Web Technologies", link: "#" },
      { name: "Computer Architecture", link: "#" },
    ]
  },
  {
    id: "sem5",
    title: "Semester 5",
    subjects: [
      { name: "Advanced Java", link: "#" },
      { name: "Python Programming", link: "#" },
      { name: "Software Testing", link: "#" },
    ]
  },
  {
    id: "sem6",
    title: "Semester 6",
    subjects: [
      { name: "Cloud Computing", link: "#" },
      { name: "Information Security", link: "#" },
      { name: "Project", link: "#" },
    ]
  }
];

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 max-w-7xl">
      <div className="flex flex-col space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">BCA Notes</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Select your semester to view the available notes.
        </p>
      </div>

      <Tabs defaultValue="sem1" className="w-full">
        <TabsList className="flex flex-wrap w-full justify-start gap-3 bg-transparent p-0 group-data-horizontal/tabs:h-auto">
          {semesters.map((sem) => (
            <TabsTrigger 
              key={sem.id} 
              value={sem.id}
              className="data-active:bg-primary data-active:text-primary-foreground border bg-muted/50 px-6 py-2.5 text-sm rounded-full transition-all h-auto flex-none"
            >
              {sem.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {semesters.map((sem) => (
          <TabsContent key={sem.id} value={sem.id} className="mt-8">
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sem.subjects.map((subject, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>View notes for {subject.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={subject.link} target={subject.link.startsWith("http") ? "_blank" : "_self"}>
                      <Button variant={subject.link !== "#" ? "default" : "secondary"} className="w-full gap-2" disabled={subject.link === "#"}>
                        {subject.link !== "#" ? "View Notes" : "Coming Soon"}
                        {subject.link.startsWith("http") && <ExternalLink className="h-4 w-4" />}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
