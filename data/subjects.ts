export interface Unit {
  title: string;
  link: string;
}

export interface SubjectData {
  id: string;
  title: string;
  downloadLink?: string;
  units: Unit[];
}

export const subjectsData: Record<string, SubjectData> = {
  "problem-solving-using-computers": {
    id: "problem-solving-using-computers",
    title: "Problem Solving Using Computers",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/Problem-Solving_download.html",
    units: [
      { title: "Unit 1 ( Introduction to Computer )", link: "https://notebook.zohopublic.in/public/notes/dcr5zb88e8271fc6d44daa45303cb49365756" },
      { title: "Unit 2 ( Techniques of Problem Solving )", link: "https://notebook.zohopublic.in/public/notes/dcr5z8efca064ac5e49e4a573ed1c5d8f9e6b" },
      { title: "Unit 3 ( Planning the Computer Program )", link: "https://notebook.zohopublic.in/public/notes/dcr5z4142804f7d044d009d97bf6fd35626fd" },
      { title: "Unit 4 ( Introduction to C )", link: "https://notebook.zohopublic.in/public/notes/dcr5z5b6787c2e78a4f8d9caf64377ad6497d" },
      { title: "Unit 5 ( Decision Making and Looping )", link: "https://notebook.zohopublic.in/public/notes/dcr5z42ab25f3f8e74919af12140402cfc307" },
      { title: "Unit 6 ( Arrays and Strings )", link: "https://notebook.zohopublic.in/public/notes/dcr5z369b1651679a47658cc519ef00d12b97" },
      { title: "Unit 7 ( Functions and Pointers )", link: "https://notebook.zohopublic.in/public/notes/dcr5ze68c732745794da58c62fb27c7e4c483" },
      { title: "Unit 8 ( Structures and Unions )", link: "https://notebook.zohopublic.in/public/notes/dcr5z22e1bb50d74e49388a42d83ca0ad7a02" },
    ]
  },
  "programming-using-cpp": {
    id: "programming-using-cpp",
    title: "Programming Using C++",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/C++_download.html",
    units: [
      { title: "Unit 1 ( Introduction to C++ )", link: "https://notebook.zohopublic.in/public/notes/dcr5z426f006eec804f3d87617b145aaa8486" },
      { title: "Unit 2 ( Classes, Objects & Functions in C++ )", link: "https://notebook.zohopublic.in/public/notes/dcr5za0bc75066033415fad5d1f17b960fc36" },
      { title: "Unit 3 ( Constructors, Destructors & Operator Overloading )", link: "https://notebook.zohopublic.in/public/notes/dcr5z6bd66fa33ff641a79f73267a4e8ef457" },
      { title: "Unit 4 ( Inheritance )", link: "https://notebook.zohopublic.in/public/notes/dcr5zabdf8e84dfab4674b9b8882831d510b6" },
      { title: "Unit 5 ( Polymorphism )", link: "https://notebook.zohopublic.in/public/notes/dcr5zff639200b40d4a34973a5fe6093d4016" },
      { title: "Unit 6 ( Working with Files, Console I/O Operations )", link: "https://notebook.zohopublic.in/public/notes/dcr5z883b5ed568804866bdc62dae4c9ac5ff" },
      { title: "Unit 7 ( Exception Handling )", link: "https://notebook.zohopublic.in/public/notes/dcr5z94ce82f144774dd295f760a4c0b3c751" },
      { title: "Unit 8 ( Templates and Standard Template Library )", link: "https://notebook.zohopublic.in/public/notes/dcr5z5f41c733f0144dadb247c374e09bde81" },
    ]
  },
  "computer-network": {
    id: "computer-network",
    title: "Computer Network",
    downloadLink: "https://bca-ycmou.vercel.app/PDS_download.html",
    units: [
      { title: "Unit 1 (Introduction to Networks)", link: "https://notebook.zoho.in/public/notes/c5cvb7e9c08e454704f38a45207daa2ae570a" },
      { title: "Unit 2 (Network Toplogies and Networking Devices)", link: "https://notebook.zoho.in/public/notes/c5cvb37032b66263d482789cdb497e3fbbd18" },
      { title: "Unit 3 (Transmission Media)", link: "https://notebook.zoho.in/public/notes/c5cvb679d24b6660b4f70a2c51df0ccc794ad" },
      { title: "Unit 4 (Network Architecture and Protocols)", link: "https://notebook.zoho.in/public/notes/u3i1s5412bafa2acb4b69831198a8451f7ee6" },
      { title: "Unit 5 (OSI Reference Model)", link: "https://notebook.zoho.in/public/notes/u3i1sac01f1f6126944e8880d697b3ea97c33" },
      { title: "Unit 6 (TCP / IP Suite)", link: "https://notebook.zoho.in/public/notes/u3i1s883863f3721943e7ae66d490ccb6cc4a" },
    ]
  },
  "evs": {
    id: "evs",
    title: "E.V.S",
    downloadLink: "https://bca-ycmou.vercel.app/PDS_download.html",
    units: [
      { title: "Unit 1 (The Multidisciplinary Nature of Environmental Studies)", link: "https://notebook.zohopublic.in/public/notes/ozl9gb8d95ad889564c30b97fadc9450b732a" },
      { title: "Unit 2 (Natural Resources)", link: "https://notebook.zohopublic.in/public/notes/ozl9g1f445f68c4664ba5b8bc2696d1cd6303" },
      { title: "Unit 3 (Ecosystems)", link: "https://notebook.zohopublic.in/public/notes/ozl9g1a040d264fc94404951d11bfdf03566c" },
      { title: "Unit 4 (Biodiversity)", link: "https://notebook.zohopublic.in/public/notes/ozl9g401816e3a9c4405a8cc0bb3fd6ced76c" },
      { title: "Unit 5 (Pollution)", link: "https://notebook.zohopublic.in/public/notes/ozl9gdc3b1b04810e42c0b3072274bd620971" },
      { title: "Unit 6 (Social Issues and the Environment)", link: "https://notebook.zohopublic.in/public/notes/ozl9gc179ee35e2f4431598716c021bcab594" },
      { title: "Unit 7 (Human Population and the Environment)", link: "https://notebook.zohopublic.in/public/notes/ozl9g571f6bbf24d3480ba13cd8ce2528c1a6" },
    ]
  },
  "dsa": {
    id: "dsa",
    title: "D.S.A",
    downloadLink: "https://bca-ycmou.vercel.app/PDS_download.html",
    units: [
      { title: "Unit 1 (Introduction to Data structures)", link: "https://notebook.zohopublic.in/public/notes/c5cvbfc1ea4b1541046b3ab177c375c66cd1d" },
      { title: "Unit 2 (Sorting and Searching)", link: "https://notebook.zoho.in/public/notes/c5cvb035937be45174ea8bfe127f1d8e95bee" },
      { title: "Unit 3 (Stacks)", link: "https://notebook.zoho.in/public/notes/c5cvb69c3393e54764bb6abaaedef6a4f630b" },
      { title: "Unit 4 (Queues)", link: "https://notebook.zoho.in/public/notes/c5cvb954af721b8be4fb09279fc0ed0f4b404" },
      { title: "Unit 5 (Linked List)", link: "https://notebook.zoho.in/public/notes/c5cvb45d0f63d75cc41e59159e374ed5e76e7" },
      { title: "Unit 6 (Trees)", link: "https://notebook.zoho.in/public/notes/c5cvb0129337f6af54a09afebf860090e1bc9" },
      { title: "Unit 7 (Graph)", link: "https://notebook.zoho.in/public/notes/c5cvbe5322e2c6b6c4c9285aec532d55baa22" },
      { title: "Unit 8 (Hashing)", link: "https://notebook.zoho.in/public/notes/c5cvb0c317e5ec5ab45ee9c7e6b2d94bb7dec" },
      { title: "Algorithms", link: "https://notebook.zohopublic.in/public/notes/u3i1s490a1ffe04f649618d62eb7a03298f70" },
    ]
  }
};
