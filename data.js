/* =====================================================================
   YOUR WEBSITE CONTENT — this is the ONLY file you need to edit.
   ---------------------------------------------------------------------
   • Text goes between quotes: "like this"
   • Each item in a list ends with a comma:  { ... },
   • Leave a link as "" (empty) and it is hidden on the site automatically.
   • After editing, upload this file to GitHub and the site updates
     in about 1 minute.
   ===================================================================== */

window.SITE = {

  /* ---------- 1. PROFILE ---------- */
  profile: {
    name: "Md Reyad Hossain",
    shortName: "Reyad Hossain",
    initials: "RH",
    title: "MSc Researcher in Computer Science",
    affiliation: "Universiti Tunku Abdul Rahman (UTAR)",
    location: "Kampar, Perak, Malaysia",
    email: "reyadhussain.cse@gmail.com",
    photo: "assets/img/profile.jpeg",      // put your photo here with this exact name (square works best)
    cv: "assets/cv.pdf",                  // replace this file to update your CV
    tagline: "I use AI, machine learning and data science to turn real-world data into decisions, with a focus on health informatics.",
    about: [
      "I am an MSc (by Research) student in Computer Science at Universiti Tunku Abdul Rahman, Malaysia, where I work as a Graduate Research Assistant on machine-learning-based species distribution modelling. My current work focuses on building reliable models when data is scarce.",
      "I hold a BSc in Computer Science and Engineering from International Islamic University Chittagong, Bangladesh. My undergraduate thesis built a dengue detection model from clinical data that reached 98% accuracy. Both lines of work have led to papers accepted at international conferences in 2026.",
      "I am looking for a PhD in AI, machine learning, data science or health informatics, where I can build models that help with early disease detection and better health decisions."
    ],
    // Banner at the top of the site. Set show: false to hide it.
    seeking: {
      show: true,
      text: "Open to fully funded PhD positions from September 2027"
    }
  },

  /* ---------- 2. ACADEMIC & SOCIAL PROFILES ----------
     Paste your full profile link inside the quotes. Empty ones stay hidden. */
  links: {
    orcid:           "https://orcid.org/0009-0005-5082-1880",   // e.g. "https://orcid.org/0000-0000-0000-0000"
    googleScholar:   "",   // e.g. "https://scholar.google.com/citations?user=XXXX"
    researchGate:    "",   // e.g. "https://www.researchgate.net/profile/Md-Reyad-Hossain"
    scopus:          "",   // Scopus author page
    webOfScience:    "",   // Web of Science ResearcherID page
    semanticScholar: "",   // Semantic Scholar author page
    dblp:            "",   // DBLP page (computer science)
    arxiv:           "",   // arXiv author page
    github:          "",   // e.g. "https://github.com/yourusername"
    kaggle:          "",   // e.g. "https://www.kaggle.com/yourusername"
    linkedin:        "https://www.linkedin.com/in/MdReyadHossain",
    twitter:         "",   // X / Twitter
    youtube:         "",
    medium:          ""    // or any blog
  },

  /* ---------- 3. QUICK FACTS (numbers shown under your name) ---------- */
  stats: [
    { value: "1",    label: "Papers accepted" },
    { value: "96%",  label: "Dengue model accuracy" },
    { value: "450+", label: "Coding problems solved" },
    { value: "3.49", label: "BSc CGPA / 4.00" }
  ],

  /* ---------- 4. RESEARCH INTERESTS ---------- */
  interests: [
    { area: "Artificial Intelligence", title: "AI that supports real decisions",
      text: "Building AI systems that people can trust and use, with results that are accurate and easy to explain." },
    { area: "Machine Learning", title: "Reliable models from imperfect data",
      text: "Real-world data is often small, noisy or incomplete. My MSc work builds ML models that stay accurate when data is scarce." },
    { area: "Data Science", title: "From raw data to insight",
      text: "Cleaning, exploring and modelling messy real-world datasets to answer practical questions." },
    { area: "Health Informatics", title: "Early disease detection",
      text: "Using clinical and public health data to spot disease early, building on my dengue detection model." }
  ],

  /* ---------- 5. NEWS (newest first) ---------- */
  news: [
    { date: "2026", text: "Paper on dengue early detection accepted at ICISET 2026." },
    { date: "2026", text: "Paper on species distribution modelling under data scarcity accepted at ICMLDE 2026." },
    { date: "Sep 2025", text: "Started MSc in Computer Science (by Research) and Graduate Research Assistant role at UTAR." },
    { date: "Jun 2024", text: "Graduated with a BSc in Computer Science and Engineering from IIUC." }
  ],

  /* ---------- 6. PUBLICATIONS ----------
     type:   "journal" | "conference" | "preprint" | "chapter" | "poster" | "thesis"
     status: "published" | "accepted" | "review" | "prep"
     Put ** around your own name in authors to make it bold, e.g. "**M. R. Hossain**, A. Author"
     Leave doi / pdf / code / slides as "" if you don't have them yet. */
  publications: [
    {
      title: "Machine Learning-Based Species Distribution Modelling of the Mountain Peacock-Pheasant in Peninsular Malaysia under Data Scarcity",
      authors: "**M. R. Hossain**, et al.",
      venue: "ICMLDE 2026",
      year: 2026, type: "conference", status: "accepted", selected: true,
      doi: "", pdf: "", code: "", slides: "",
      abstract: ""
    },
    {
      /* title: "Machine Learning Based Early Detection of Dengue: Case Study Chittagong",
      authors: "**M. R. Hossain**, et al.",
      venue: "ICISET 2026",
      year: 2026, type: "conference", status: "accepted", selected: true,
      doi: "", pdf: "", code: "", slides: "",
      abstract: ""
    }
    /* COPY THIS BLOCK TO ADD A NEW PAPER (remember the comma between items):
    ,{
      title: "", authors: "**M. R. Hossain**, ", venue: "",
      year: 2027, type: "journal", status: "review", selected: false,
      doi: "", pdf: "", code: "", slides: "", abstract: ""
    }
    */
  ],

  /* ---------- 7. PROJECTS ----------
     status: "ongoing" | "completed"
     image: optional, e.g. "assets/img/dengue.png" (leave "" for an automatic cover) */
  projects: [
    {
      title: "ML-based Species Distribution Modelling",
      year: "2025 – present", status: "ongoing", featured: true,
      summary: "Machine learning models that predict where rare species live when only a few sightings exist. Case study: the Mountain Peacock-Pheasant in Peninsular Malaysia.",
      tags: ["Machine Learning", "Data Science", "Ecology"],
      image: "", code: "", demo: "", paper: ""
    },
    {
      title: "Dengue Detection using Machine Learning",
      year: "2023 – 2024", status: "completed", featured: true,
      summary: "Undergraduate thesis. Random Forest, SVM and decision tree models on clinical data, reaching 98% accuracy in identifying critical cases for early detection.",
      tags: ["Health Informatics", "Machine Learning", "Python"],
      image: "", code: "", demo: "", paper: ""
    },
    {
      title: "AI for Climate Prediction & Disaster Management",
      year: "Ongoing", status: "ongoing", featured: false,
      summary: "Collaboration with EjadLab applying AI to climate prediction and disaster management.",
      tags: ["Artificial Intelligence", "Data Science"],
      image: "", code: "", demo: "", paper: ""
    },
    {
      title: "News Article Share Prediction",
      year: "2023", status: "completed", featured: false,
      summary: "Machine learning model that estimates user engagement with online news articles.",
      tags: ["Machine Learning", "Data Science"],
      image: "", code: "", demo: "", paper: ""
    },
    {
      title: "Blood Donation System",
      year: "2023", status: "completed", featured: false,
      summary: "Platform built with Python and MySQL that matches blood donors with recipients. Presented to the department.",
      tags: ["Health Informatics", "Python", "SQL"],
      image: "", code: "", demo: "", paper: ""
    },
    {
      title: "Smoke Detection using Arduino",
      year: "2022", status: "completed", featured: false,
      summary: "Low-cost smoke detection system using Arduino sensors to improve fire safety. Presented to the department.",
      tags: ["IoT", "Arduino"],
      image: "", code: "", demo: "", paper: ""
    }
  ],

  /* ---------- 8. EXPERIENCE ---------- */
  experience: [
    { when: "Sep 2025 – Aug 2027", title: "Graduate Research Assistant", place: "Universiti Tunku Abdul Rahman",
      text: "Machine-learning-based species distribution modelling." },
    { when: "Ongoing", title: "Research Collaborator", place: "EjadLab",
      text: "AI for climate prediction and disaster management." },
    { when: "Jan 2023 – Feb 2024", title: "Undergraduate Researcher", place: "International Islamic University Chittagong",
      text: "Thesis on dengue detection using machine learning (Python, scikit-learn, TensorFlow)." }
  ],

  /* ---------- 9. EDUCATION ---------- */
  education: [
    { when: "Sep 2025 – Aug 2027", title: "MSc in Computer Science (by Research)", place: "Universiti Tunku Abdul Rahman, Malaysia", text: "Ongoing" },
    { when: "Apr 2019 – Jun 2024", title: "BSc in Computer Science and Engineering", place: "International Islamic University Chittagong, Bangladesh", text: "CGPA 3.49 / 4.00" },
    { when: "2017", title: "Higher Secondary Certificate", place: "Govt. Haji Mohammad Mohsin College, Chattogram", text: "GPA 4.83 / 5.00" },
    { when: "2015", title: "Secondary School Certificate", place: "Hashimpur M A K U High School, Chattogram", text: "GPA 5.00 / 5.00" }
  ],
  coursework: ["Machine Learning", "Artificial Intelligence", "Data Science", "Neural Networks and Fuzzy Systems", "Computer Algorithms", "Data Structures", "Computer Architecture"],

  /* ---------- 10. TALKS & PRESENTATIONS (add yours) ---------- */
  talks: [
    // { when: "Mar 2026", title: "Paper presentation", place: "ICMLDE 2026, City" }
  ],

  /* ---------- 11. AWARDS & SCHOLARSHIPS (add yours) ---------- */
  awards: [
    // { when: "2026", title: "Best Paper Award", place: "Conference name" }
  ],

  /* ---------- 12. SKILLS ---------- */
  skills: {
    "Machine Learning": ["scikit-learn", "TensorFlow", "Random Forest", "SVM", "Decision Trees", "Species Distribution Modelling"],
    "Programming": ["Python", "C", "C++", "SQL", "HTML", "CSS"],
    "Tools": ["Git & GitHub", "VS Code", "PyCharm", "Code::Blocks", "AutoCAD", "Arduino"],
    "Languages": ["English (fluent)", "Bangla (native)"]
  },

  /* ---------- 13. CERTIFICATES ---------- */
  certificates: [
    { title: "Python for Data Science", by: "IDM", link: "" },
    { title: "AI For My Future", by: "Microsoft", link: "" },
    { title: "Generative AI Fundamentals with Google Cloud", by: "Udacity", link: "" },
    { title: "Data Types in Python", by: "DataCamp", link: "" }
  ],

  /* ---------- 14. LEADERSHIP & SERVICE ---------- */
  activities: [
    "Led teams in undergraduate thesis and departmental projects",
    "Ranked in the top 5% of classmates for presentation skills",
    "Active member of the student association, including skill development work",
    "Organised several national events with voluntary organisations",
    "E-Commerce Operations Volunteer, UTAR eStore"
    // Later add: peer reviewer for journals, conference volunteer, etc.
  ],

  /* ---------- 15. CONTACT FORM (optional) ----------
     Free: sign up at https://formspree.io, create a form, and paste its URL here
     (looks like "https://formspree.io/f/abcdwxyz"). Leave "" to show email only. */
  contactForm: "",

  footerNote: "Last updated: October 2026"
};
