export interface BookData {
  code: string;
  title: string;
  pdfUrl: string;
}

export interface SemesterBooks {
  id: string;
  title: string;
  books: BookData[];
}

const BASE_URL = "https://bca-ycmou.vercel.app";

export const semesterBooks: SemesterBooks[] = [
  {
    id: "sem1",
    title: "Semester 1",
    books: [
      { code: "AEC-111", title: "English Communication", pdfUrl: `${BASE_URL}/E-books/Sem-1/English.pdf` },
      { code: "CMP-250", title: "Mathematics", pdfUrl: `${BASE_URL}/E-books/Sem-1/Mathematics.pdf` },
      { code: "CMP-503", title: "Programming Using C++", pdfUrl: `${BASE_URL}/E-books/Sem-1/C++.pdf` },
      { code: "CMP-502", title: "Problem Solving Using Computers", pdfUrl: `${BASE_URL}/E-books/Sem-1/problem-solving-using-computers.pdf` },
    ]
  },
  {
    id: "sem2",
    title: "Semester 2",
    books: [
      { code: "CMP 221-504", title: "Statistical Techniques", pdfUrl: `${BASE_URL}/E-books/sem-2/Statistics.pdf` },
      { code: "CMP-215", title: "Data Structures Using C++", pdfUrl: `${BASE_URL}/E-books/sem-2/Data-structures-through-C++.pdf` },
      { code: "CMP-507", title: "Computer Network", pdfUrl: `${BASE_URL}/E-books/sem-2/Computer-Network.pdf` },
      { code: "204", title: "EVS", pdfUrl: `${BASE_URL}/E-books/sem-2/EVS.pdf` },
    ]
  },
  {
    id: "sem3",
    title: "Semester 3",
    books: [
      { code: "CMP-374", title: "Introduction to RDBMS", pdfUrl: `${BASE_URL}/E-books/sem-3/Introduction-to-RDBMS.pdf` },
      { code: "CMP-508", title: "Web Technologies", pdfUrl: `${BASE_URL}/E-books/sem-3/Web-Technologies.pdf` },
      { code: "CMP-507", title: "Operating System", pdfUrl: `${BASE_URL}/E-books/sem-3/Operating-System.pdf` },
      { code: "USIT-301", title: "Python Programming", pdfUrl: `${BASE_URL}/E-books/sem-3/Python.pdf` },
    ]
  },
  {
    id: "sem4",
    title: "Semester 4",
    books: [
      { code: "CMP-205", title: "Software Engineering", pdfUrl: `${BASE_URL}/E-books/sem-4/Software-Engineering.pdf` },
      { code: "CMP-510", title: "Computer System Architecture", pdfUrl: `${BASE_URL}/E-books/sem-4/Computer-System-Architecture.pdf` },
      { code: "CMP-512", title: "Java Programming", pdfUrl: `${BASE_URL}/E-books/sem-4/Java.pdf` },
      { code: "OPN-272", title: "Finance and Investment Skills", pdfUrl: `${BASE_URL}/E-books/sem-4/Financia-and-Investment-Skills.pdf` },
    ]
  },
  {
    id: "sem5",
    title: "Semester 5",
    books: [
      { code: "CMP-332", title: "Quantitative Aptitude", pdfUrl: `${BASE_URL}/E-books/sem-5/Quantitative-Aptitude.pdf` },
      { code: "CMP-513", title: "Ecommerce Technology", pdfUrl: `${BASE_URL}/E-books/sem-5/Ecommerce-technology.pdf` },
      { code: "CMP-514", title: "Advance Java", pdfUrl: `${BASE_URL}/E-books/sem-5/Advance-Java.pdf` },
      { code: "CMP-515", title: "Linux Administration", pdfUrl: `${BASE_URL}/E-books/sem-5/Linux-Administration.pdf` },
    ]
  },
  {
    id: "sem6",
    title: "Semester 6",
    books: [
      { code: "CMP-516", title: "Android Programming", pdfUrl: `${BASE_URL}/E-books/sem-6/Android-Programming.pdf` },
      { code: "CMP-517", title: "PHP Programming", pdfUrl: `${BASE_URL}/E-books/sem-6/PHP.pdf` },
      { code: "SEC-611", title: "Personality & Career Skills", pdfUrl: `${BASE_URL}/E-books/sem-6/Personality-and-career-skills.pdf` },
    ]
  },
];
