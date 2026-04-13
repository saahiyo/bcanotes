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
  // ===== SEMESTER 1 =====
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

  // ===== SEMESTER 2 =====
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
  },

  // ===== SEMESTER 3 =====
  "operating-system": {
    id: "operating-system",
    title: "Operating System",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/OS_download.html",
    units: [
      { title: "Unit 1 (History of the Operating Systems)", link: "https://notebook.zoho.in/public/notes/u3i1s6090563bcfaf450ea15cfc3a7c0ef047" },
      { title: "Unit 2 ( Operating System Functions and Structure )", link: "https://notebook.zoho.in/public/notes/u3i1s10e9f1b55af24242a907aaf8dfe87ee7" },
      { title: "Unit 3 (Information Management)", link: "https://notebook.zoho.in/public/notes/u3i1sce6ee734e39f420db7a3a7e1853bb0d9" },
      { title: "Unit 4 (Process Management)", link: "https://notebook.zoho.in/public/notes/u3i1s24940c6f5e6048539f24654e4602a742" },
      { title: "Unit 5 (Inter Process Communication)", link: "https://notebook.zoho.in/public/notes/u3i1sa08f06180be04b99b66a76f4977b8352" },
      { title: "Unit 6 (I/O Management and Deadlock)", link: "https://notebook.zoho.in/public/notes/u3i1se2ba17c23c1e4cb0b6a2f2839742c861" },
      { title: "Unit 7 (Memory Management)", link: "https://notebook.zoho.in/public/notes/u3i1sab02c7eb24464546be5a7c93cb6d34f8" },
      { title: "Unit 8 (Protection and Security)", link: "https://notebook.zoho.in/public/notes/u3i1s178242018caa4cfabb00fd467ae9cec4" },
    ]
  },
  "web-technology": {
    id: "web-technology",
    title: "Web Technology",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/WT_download.html",
    units: [
      { title: "Unit 1 ( Introduction to Web )", link: "https://notebook.zohopublic.in/public/notes/u3i1sc8598c8cc7144ddf87943cf89fb82354" },
      { title: "Unit 2 ( Languages and Technologies for Browsers )", link: "https://notebook.zohopublic.in/public/notes/u3i1se6bd0a676abb421e98c7743eb76d2ca7" },
      { title: "Unit 3 ( Introduction to HTML )", link: "https://notebook.zohopublic.in/public/notes/u3i1sd4984238c6094eb18b09a27dad1b3f9e" },
      { title: "Unit 4 ( Cascading Style Sheets )", link: "https://notebook.zohopublic.in/public/notes/u3i1s755da2002ccc4eb1be7f81fc727ef4d8" },
      { title: "Unit 5 ( Introduction to Client Side Scripting )", link: "https://notebook.zohopublic.in/public/notes/u3i1s8bbfb0b8de9b4a3e863efdd63e177ab2" },
      { title: "Unit 6 ( Javascript )", link: "https://notebook.zohopublic.in/public/notes/u3i1saf34797d3ae84185b706ef8860b74603" },
      { title: "Unit 7 ( XML )", link: "https://notebook.zohopublic.in/public/notes/u3i1sf444a348560a472e99e7a384bfdc41c3" },
      { title: "Unit 8 (Website Design Concepts)", link: "https://notebook.zohopublic.in/public/notes/u3i1s11c0d65bc3f0452ea8e7fbc7dd2f84b0" },
    ]
  },
  "dbms": {
    id: "dbms",
    title: "D.B.M.S",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/DBMS_download.html",
    units: [
      { title: "Unit 1 ( Data Files and DBMS )", link: "https://notebook.zohopublic.in/public/notes/u3i1sf0e38cb452ca43ceb5be1509beb880c7" },
      { title: "Unit 2 ( Introduction to DBMS )", link: "https://notebook.zohopublic.in/public/notes/u3i1s771f1f55e77949df90e992eedb1b4bf0" },
      { title: "Unit 3 ( Relational Data Models and Relational Algebra )", link: "https://notebook.zohopublic.in/public/notes/u3i1s7063163261d04c37a04d57d487aeaab6" },
      { title: "Unit 4 ( Entity Relationship )", link: "https://notebook.zohopublic.in/public/notes/u3i1s1af06e2453f5405abb055a921d6f9be2" },
      { title: "Unit 5 ( Normalizations )", link: "https://notebook.zohopublic.in/public/notes/74tdo268c1b08e03a4a9f819eddabb4c428e0" },
      { title: "Unit 6 ( SQL )", link: "https://notebook.zohopublic.in/public/notes/u3i1s5ca9cc956db74d428873cbe3f5fa1f67" },
      { title: "Unit 7 ( Transaction Management )", link: "https://notebook.zohopublic.in/public/notes/u3i1sdbdfece7a1d84f6584f13c7d81e6a6f9" },
      { title: "Unit 8 ( PL / SQL )", link: "https://notebook.zohopublic.in/public/notes/u3i1sadf95ed2bdad468dacc0c678b051fba0" },
    ]
  },
  "python": {
    id: "python",
    title: "Python",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/Python_download.html",
    units: [
      { title: "Unit 1 ( Introduction, Variables, Expressions and Statements )", link: "https://notebook.zohopublic.in/public/notes/u3i1sf075251627da4889a09b29dc03eb44cc" },
      { title: "Unit 2 ( Conditional Execution and Catching Exceptions )", link: "https://notebook.zohopublic.in/public/notes/u3i1s05ad31e9b14d45659979e797fe32ff90" },
      { title: "Unit 3 ( Function and Iterations )", link: "https://notebook.zohopublic.in/public/notes/74tdo077134986e3341bdb118016daba1341d" },
      { title: "Unit 4 ( String and Files )", link: "https://notebook.zohopublic.in/public/notes/74tdo932663b3c84d430780ce0b5f82482dd7" },
      { title: "Unit 5 ( Collections: Arrays, Lists, Dictionaries and Tuples )", link: "https://notebook.zohopublic.in/public/notes/74tdobecb9c0939a546e69d6b9b34cd363d81" },
      { title: "Unit 6 ( Regular Expression and Object Oriented Programming )", link: "https://notebook.zohopublic.in/public/notes/74tdob8ba1ded5c8b4f88af7bdfe1511c97e5" },
      { title: "Unit 8 ( Visualizing Data )", link: "https://notebook.zohopublic.in/public/notes/74tdode22d45af82840f194212822a030cdea" },
    ]
  },

  // ===== SEMESTER 4 =====
  "financial-and-investment-skills": {
    id: "financial-and-investment-skills",
    title: "Financial & Investment Skills",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/FN_download.html",
    units: [
      { title: "Unit 1 ( Introduction to Stock Market - 1 )", link: "https://notebook.zohopublic.in/public/notes/bietv2235c604d0da4e90a522f31a6cbab569" },
      { title: "Unit 2 ( Introduction to Stock Market - 2 )", link: "https://notebook.zohopublic.in/public/notes/bietv8d01cb51092c417f97f6aa84e4385e40" },
      { title: "Unit 3 ( Introduction to Stock Market - 3 )", link: "https://notebook.zohopublic.in/public/notes/bietvf2846dd1d4454f6a9f4db2a8382fdffe" },
      { title: "Unit 4 (Fundamental Analysis- 1)", link: "https://notebook.zohopublic.in/public/notes/bietvf1dbb2b8aa3745bd9376f30f263c790d" },
      { title: "Unit 5 (Fundamental Analysis- 2)", link: "https://notebook.zohopublic.in/public/notes/bietvf1452391ed884e64815689491dc3d995" },
      { title: "Unit 6 (Fundamental Analysis- 3)", link: "https://notebook.zohopublic.in/public/notes/bietva77064bb460c4522b5c75b559a715cdb" },
      { title: "Unit 7 ( Technical Analysis - 1 )", link: "https://notebook.zohopublic.in/public/notes/bietv3c77ca1ecbb04836a7fd689d1af4a048" },
      { title: "Unit 8 ( Technical Analysis - 2 )", link: "https://notebook.zohopublic.in/public/notes/bietvbd6e96da526f411091cbd236763a674d" },
      { title: "Unit 9 ( Technical Analysis - 3 )", link: "https://notebook.zohopublic.in/public/notes/bietv5be82961d7754b5fbf1fac9c1ba1d392" },
      { title: "Unit 10 ( Markets and Taxation )", link: "https://notebook.zohopublic.in/public/notes/bietvcc5cac152c2f4dce9ec771dd33a8a404" },
      { title: "Unit 11 ( Trading Psychology and Risk Management )", link: "https://notebook.zohopublic.in/public/notes/bietv75f479d88c504748b7f87a67c2c69380" },
    ]
  },
  "software-engineering": {
    id: "software-engineering",
    title: "Software Engineering",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/SE_download.html",
    units: [
      { title: "Unit 1 ( Software Engineering and Models )", link: "https://notebook.zohopublic.in/public/notes/bietv5412d1cf27b3471f838464a70e655f52" },
      { title: "Unit 2 ( Requirement Analysis )", link: "https://notebook.zohopublic.in/public/notes/bietv1b5feb2aac0b4788a230535eda13f7b2" },
      { title: "Unit 3 ( Software Design )", link: "https://notebook.zohopublic.in/public/notes/bietvc6a264c08e064e94a9ea18e6d0ec1f44" },
      { title: "Unit 4 ( Coding, Structured Programming and Programming Practices )", link: "https://notebook.zohopublic.in/public/notes/bietv626325f537fb42f0b0f22677060316ec" },
      { title: "Unit 5 ( Software Testing )", link: "https://notebook.zohopublic.in/public/notes/bietvcb3f751d0cac4bb49dc4c2f8ebbc51b7" },
      { title: "Unit 6 ( Quality Assurance )", link: "https://notebook.zohopublic.in/public/notes/bietved7552a9570042de92da195020a5445c" },
      { title: "Unit 7 ( Software Configuration Management )", link: "https://notebook.zohopublic.in/public/notes/bietv3cccd8317cb640d4b84c4e29892aef2e" },
      { title: "Unit 8 ( Latest Trends in Software Engineering )", link: "https://notebook.zohopublic.in/public/notes/bietv42f4bdc28b674ea5931e514a6aac356e" },
    ]
  },
  "java": {
    id: "java",
    title: "JAVA",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/Java_download.html",
    units: [
      { title: "Unit 1 ( Evolution of JAVA; Variables and Naming Rules )", link: "https://notebook.zohopublic.in/public/notes/bietvb3a8a2ad183346f680eede0924fed2c5" },
      { title: "Unit 2 ( Decision Making and Looping )", link: "https://notebook.zohopublic.in/public/notes/bietv7ad7a4b7e42e4141a353d7ce3339cf55" },
      { title: "Unit 3 ( Implementation of Methods )", link: "https://notebook.zohopublic.in/public/notes/bietv429c25c5b725495b97ecf056608c081c" },
      { title: "Unit 4 ( Wrapper Classes, Arrays and Strings )", link: "https://notebook.zohopublic.in/public/notes/bietv08e7e8c690a04d7bada46c71e72a1f7c" },
      { title: "Unit 5 ( String Handling and Exception Handling )", link: "https://notebook.zohopublic.in/public/notes/bietvf2e13ce77f874741b535f8667c4910f0" },
      { title: "Unit 6 ( Package and Deferred Implementation )", link: "https://notebook.zohopublic.in/public/notes/bietv139c3d408d8c4d44a9df4429b7a60df5" },
      { title: "Unit 7 ( Java I/O )", link: "https://notebook.zohopublic.in/public/notes/bietv14b52800063d4cdfa2bcd16d67756e1d" },
      { title: "Unit 8 ( Thread, Generics and Collection )", link: "https://notebook.zohopublic.in/public/notes/bietvbdc0eb21fffb4feeb8b69b4c3f37ef96" },
    ]
  },
  "csa": {
    id: "csa",
    title: "C.S.A",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/CSA_download.html",
    units: [
      { title: "Unit 1 ( Motherboard and It's Components Objective )", link: "https://notebook.zohopublic.in/public/notes/bietvccc2185a6d9b489282f27ed880155f46" },
      { title: "Unit 2 ( Storage Devices and Interfacing Objectives )", link: "https://notebook.zohopublic.in/public/notes/bietvc52ca8021ee643619dcc3d0cfd01fa8e" },
      { title: "Unit 3 ( Display Devices and Interfacing )", link: "https://notebook.zohopublic.in/public/notes/bietvc9782e7eec7c410ba1a84624524e97c2" },
      { title: "Unit 4 ( Input and Output Devices )", link: "https://notebook.zohopublic.in/public/notes/bietv5c5e34b37d754e30a20d92660bf636da" },
      { title: "Unit 5 ( Power Supplies )", link: "https://notebook.zohopublic.in/public/notes/bietvac5e9a773395404eb14863b8be5beee4" },
      { title: "Unit 6 ( Interfaces )", link: "https://notebook.zohopublic.in/public/notes/bietv722dadf31a84443390c09527f5859982" },
      { title: "Unit 7 ( PC Troubleshooting, Maintenance and Tools )", link: "https://notebook.zohopublic.in/public/notes/bietvd0f2636f17b849449aefe4521ea324e2" },
      { title: "Unit 8 ( Overview of Parallel Processing and Pipeline Processing )", link: "https://notebook.zohopublic.in/public/notes/bietvb40f68102415464fb9cc92d393dc8a04" },
    ]
  },

  // ===== SEMESTER 5 =====
  "linux-administration": {
    id: "linux-administration",
    title: "Linux Administration",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/Linux_download.html",
    units: [
      { title: "Unit 1 ( Introduction to Linux )", link: "https://notebook.zohopublic.in/public/notes/dcr5zf378bd7211ac4e8a94e43d7cb0bf45ce" },
      { title: "Unit 2 ( Installation of Redhat Linux )", link: "https://notebook.zohopublic.in/public/notes/dcr5z138a3f2386714234853b62f523b84b83" },
      { title: "Unit 3 ( Using Commandline and Managing Software )", link: "https://notebook.zohopublic.in/public/notes/dcr5z25cfbb7a93d34041b11e3f5ce28eb57c" },
      { title: "Unit 4 ( Working with Users, Groups and Permissions )", link: "https://notebook.zohopublic.in/public/notes/dcr5z580c12ccfe894dbca897821232cb77d9" },
      { title: "Unit 5 ( TCP/IP Networking & Network File Systems )", link: "https://notebook.zohopublic.in/public/notes/dcr5z152a5788e4524752bcb419106fa89bf7" },
      { title: "Unit 6 ( Configuring DNS & DHCP )", link: "https://notebook.zohopublic.in/public/notes/dcr5z7c06cbc97c10410e9a625bf5aba52bd2" },
      { title: "Unit 7 ( Connection to Microsoft Server & Setting Mail Server )", link: "https://notebook.zohopublic.in/public/notes/dcr5z64f04bd5a4e54371882f214a19ac52b7" },
      { title: "Unit 8 ( Securing Servers with iptables & Configuring Web Servers )", link: "https://notebook.zohopublic.in/public/notes/dcr5z113b07b521e94527bc7fd1a92c5101f4" },
    ]
  },
  "advance-java": {
    id: "advance-java",
    title: "Advance JAVA",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/AdvanceJava_download.html",
    units: [
      { title: "Unit 1 ( JDBC )", link: "https://notebook.zohopublic.in/public/notes/dcr5z5d2d1ef05f1f40a89751a87fca9a6e86" },
      { title: "Unit 2 ( Servlet )", link: "https://notebook.zohopublic.in/public/notes/dcr5zaf21d169691e47e4a784e2f5a7f70e39" },
      { title: "Unit 3 ( JSP )", link: "https://notebook.zohopublic.in/public/notes/dcr5z9e0a40d4a22b4fc680ee517942b2045e" },
      { title: "Unit 4 ( Hibernate )", link: "https://notebook.zohopublic.in/public/notes/dcr5z4e91e5e29a364b2e971919a3949cd114" },
      { title: "Unit 5 ( Spring Core )", link: "https://notebook.zohopublic.in/public/notes/dcr5zd558e603d1c34b288c19b7826231c888" },
      { title: "Unit 6 ( Sprin MVC )", link: "https://notebook.zohopublic.in/public/notes/9wn9ob273cab8a421415aa4976ce3a37cd98e" },
      { title: "Unit 7 ( Java Mail )", link: "https://notebook.zohopublic.in/public/notes/9wn9o0f8a147d1c964da7bab6efba9d61bc39" },
      { title: "Unit 8 ( Java with JSON )", link: "https://notebook.zohopublic.in/public/notes/9wn9o2605f46a9aef45b9be509dd850274198" },
    ]
  },
  "quantitative-aptitude": {
    id: "quantitative-aptitude",
    title: "Quantitative Aptitude",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/QT_download.html",
    units: [
      { title: "Unit 1 ( Number System Basics )", link: "https://notebook.zohopublic.in/public/notes/9wn9oe756894b5ec94918970495c67a31cdc4" },
      { title: "Unit 2 ( Percentages, Profit and Loss )", link: "https://notebook.zohopublic.in/public/notes/9wn9od0579d1ee82c448694db098d1d26bca4" },
      { title: "Unit 3 ( Simple Interest and Compound Interest )", link: "https://notebook.zohopublic.in/public/notes/9wn9oece2a167927948828c47444f89ebc8f6" },
      { title: "Unit 4 ( Ratio and Proportion, Partnership, Mixtures and Allegations )", link: "https://notebook.zohopublic.in/public/notes/9wn9o48430163822b40cb9f142b1dfdea481b" },
      { title: "Unit 5 ( Averages and Problems on Ages )", link: "https://notebook.zohopublic.in/public/notes/9wn9o35a3d493f4c0495ca8ea215552dae558" },
      { title: "Unit 6 ( Time and Work, Pipes and Cisterns )", link: "https://notebook.zohopublic.in/public/notes/9wn9od49134e57f024a5191ca84be44d615fa" },
      { title: "Unit 7 ( Time, Speed, Distance and Problems on Trains)", link: "https://notebook.zohopublic.in/public/notes/9wn9o8a07bb5eb1a54ef3b4ec72a28befc041" },
      { title: "Unit 8 ( Premutation, Combination and Probability )", link: "https://notebook.zohopublic.in/public/notes/9wn9of40c10320d604f6fa5b6debe8f4ffc98" },
      { title: "Important Sums", link: "https://notebook.zohopublic.in/public/notes/9wn9oe279d0c32c564c779153edcf2a46e578" },
    ]
  },
  "ecommerce-technology": {
    id: "ecommerce-technology",
    title: "Ecommerce Technology",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/Ecommerce_download.html",
    units: [
      { title: "Unit 1 ( Introduction )", link: "https://notebook.zohopublic.in/public/notes/dcr5zee3e0f31f9d54bcaa0d07efa3b30dc84" },
      { title: "Unit 2 ( Marketing )", link: "https://notebook.zohopublic.in/public/notes/dcr5z8be7d1a7aa624739bc8b582538d58bda" },
      { title: "Unit 3 ( Security )", link: "https://notebook.zohopublic.in/public/notes/dcr5z5f2b35841df140408929322f5491ad80" },
      { title: "Unit 4 ( Payment Systems )", link: "https://notebook.zohopublic.in/public/notes/dcr5z9f35d94143c74011b7cf9e0d311793b6" },
      { title: "Unit 5 ( Customer Relationship Management )", link: "https://notebook.zohopublic.in/public/notes/dcr5z8756565187a84a2c87fdaf4a849188ee" },
      { title: "Unit 6 ( Supply Chain Management )", link: "https://notebook.zohopublic.in/public/notes/dcr5z21f0ba06f21b4fef91f6de33d25ea9dc" },
      { title: "Unit 7 ( Stratergy )", link: "https://notebook.zohopublic.in/public/notes/dcr5z8ff00d2c3a8a4cb1a80a2958687cd491" },
      { title: "Unit 8 ( Mobile Commerce )", link: "https://notebook.zohopublic.in/public/notes/dcr5zd676907c2dab46749625feb31efddcc7" },
    ]
  },

  // ===== SEMESTER 6 =====
  "php-programming": {
    id: "php-programming",
    title: "PHP Programming",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/PHP_download.html",
    units: [
      { title: "Unit 1 ( Basics of php )", link: "https://notebook.zohopublic.in/public/notes/ozl9g6466179aec03456381d6f35bf2b4161d" },
      { title: "Unit 2 ( PHP Form Handling )", link: "https://notebook.zohopublic.in/public/notes/ozl9gbdcebb8f195242dba2770edac4ae5e11" },
      { title: "Unit 3 ( FileHandling, Session & Cookies in PHP )", link: "https://notebook.zohopublic.in/public/notes/ozl9g763631d332d145828c5ebbca3a93abd6" },
      { title: "Unit 4 ( Errors & Exception Handling in PHP )", link: "https://notebook.zohopublic.in/public/notes/ozl9g7af2858382f3499fb40c2a874f4d5c35" },
      { title: "Unit 5 ( PHP MySQLi )", link: "https://notebook.zohopublic.in/public/notes/ozl9gcec65bd883e247b3877d2341af26107a" },
      { title: "Unit 6 ( Object Oriented Programming )", link: "https://notebook.zohopublic.in/public/notes/ozl9g66ab891a42f24bf383c370c36a560e27" },
      { title: "Unit 7 ( PHPFrameworks and Laravel )", link: "https://notebook.zohopublic.in/public/notes/ozl9g89f5d241c8e84d3a81c147ae21140df4" },
      { title: "Unit 8 (Content Management system and WordPress )", link: "https://notebook.zohopublic.in/public/notes/ozl9g8f694cfa7dcf4cd5ae7ead0f9d99620f" },
    ]
  },
  "android-programming": {
    id: "android-programming",
    title: "Android Programming",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/android_download.html",
    units: [
      { title: "Unit 1 ( Introduction to Mobile Development )", link: "https://notebook.zohopublic.in/public/notes/ozl9g43ae69d5a7844ae69baa99a8f527da9e" },
      { title: "Unit 2 ( Introduction to Android )", link: "https://notebook.zohopublic.in/public/notes/ozl9ga920a1d706f341828a1f454f82ee0370" },
      { title: "Unit 3 ( User Interface Screen Elements )", link: "https://notebook.zohopublic.in/public/notes/ozl9gacb26eb8b1e140ffaeea17d9b094b8b4" },
      { title: "Unit 4 ( Android Development Elements )", link: "https://notebook.zohopublic.in/public/notes/ozl9g6b80b9de7b28466dad45aee8cbbab241" },
      { title: "Unit 5 ( Android Terminologies and Resource Handling )", link: "https://notebook.zohopublic.in/public/notes/ozl9g1b52c1d9ce4d4fd086c538bdabe9bf5e" },
      { title: "Unit 6 ( Android User Interface Elements )", link: "https://notebook.zohopublic.in/public/notes/ozl9g446e49e2ba9e402ebefb2f1f3570e7bb" },
      { title: "Unit 7 ( Providers )", link: "https://notebook.zohopublic.in/public/notes/ozl9g09e4185e3f6c499f9e3d0c48ef4a4378" },
      { title: "Unit 8 ( Receivers )", link: "https://notebook.zohopublic.in/public/notes/ozl9g92df5f8241d84c698d6849d1eeb6c04d" },
    ]
  },
  "personality-and-career-skills": {
    id: "personality-and-career-skills",
    title: "Personality & Career Skills",
    downloadLink: "https://bca-ycmou.vercel.app/Downloads/PDS_download.html",
    units: [
      { title: "Unit 1 (Soft Skills)", link: "https://notebook.zohopublic.in/public/notes/ozl9gc492463d266d4ac79a22da8eb3637677" },
      { title: "Unit 2 (Self Discovery)", link: "https://notebook.zohopublic.in/public/notes/ozl9gb7293b52a4d34749b27da496c039b0f0" },
      { title: "Unit 3 (Developing Positive attitude)", link: "https://notebook.zohopublic.in/public/notes/ozl9g0799b9c4d221406599adeadcc780803e" },
      { title: "Unit 4 (Forming Values)", link: "https://notebook.zohopublic.in/public/notes/ozl9g43414b3aaf894ea1b500d60409466ade" },
      { title: "Unit 5 (Improving Perception)", link: "https://notebook.zohopublic.in/public/notes/ozl9g464000ed150e4dfa82de5711cf4732dc" },
      { title: "Unit 6 (Carrer Planning)", link: "https://notebook.zohopublic.in/public/notes/ozl9ge7418890bab24b99a3f4e255bb15b81d" },
      { title: "Unit 7 (The Art of Writing Email)", link: "https://notebook.zohopublic.in/public/notes/ozl9g7f7dac03617444ac93aae7f1c131817c" },
      { title: "Unit 8 (Body Language)", link: "https://notebook.zohopublic.in/public/notes/ozl9g133d983167e24cc280d0b9506a40526d" },
      { title: "Unit 9 (Team Building and Teamwork)", link: "https://notebook.zohopublic.in/public/notes/ozl9g97ea7e2f48794ae2b4cbc6225d815d35" },
      { title: "Unit 10 (Group Discussion)", link: "https://notebook.zohopublic.in/public/notes/ozl9g70f92b645e734d9cb5f696e51f33717ba" },
      { title: "Unit 11 (Etiquettes and Manners)", link: "https://notebook.zohopublic.in/public/notes/ozl9g65c5a94bf82a455396b17f4a9769a292" },
      { title: "Unit 12 (Preparing Resume)", link: "https://notebook.zohopublic.in/public/notes/ozl9gbadfd9bfe6994f61a026803a3a96c75a" },
      { title: "Unit 13 (Interview Skills)", link: "https://notebook.zohopublic.in/public/notes/ozl9g4a656198240e4a18a5a1636a50634d34" },
      { title: "Unit 14 (Time Management)", link: "https://notebook.zohopublic.in/public/notes/ozl9g047d23a3b2b3495ba7bb1b8cd813ba9e" },
      { title: "Unit 15 (Stress Management)", link: "https://notebook.zohopublic.in/public/notes/ozl9g1d2cc8a13bb5431cb45c1dcb7ed85630" },
    ]
  },
};
