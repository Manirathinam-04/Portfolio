/**
 * =============================================================================
 * PORTFOLIO DATA CONFIGURATION
 * =============================================================================
 * All personal profile, project, skill, and experience details are centralized here.
 * You can edit your email, social links, project repositories, or experience entries
 * directly in this single file.
 */

export const portfolioData = {
  profile: {
    name: "Manirathinam R",
    shortName: "Manirathinam",
    monogram: "MR",
    title: "Flutter Developer | Mobile Application Developer",
    primaryRole: "Flutter Developer",
    currentFocus: "Cross-platform mobile application development with Flutter & Dart",
    availability: "Open to Opportunities",
    isAvailable: true,
    
    // Quick summary for hero and intro
    heroTagline:
      "Crafting high-performance, responsive mobile applications with Flutter, clean architecture, and seamless RESTful API integration.",
    
    // Professional Summary from Resume
    professionalSummary:
      "Flutter Developer with hands-on experience in Flutter, Dart, mobile application development, responsive UI development, REST API integration, JSON data handling, authentication flows, navigation, debugging, and Git/GitHub. Experienced in converting Figma designs into reusable and responsive Flutter widgets and implementing API-driven application flows with loading, validation, and error states. Familiar with Postman, HTTP methods, API testing, state handling, responsive layouts, Android and iOS release, and cross-platform application development. Strong focus on clean UI, reusable components, maintainable code, and application reliability.",

    // CONTACT DETAILS
    email: "manirathinam.r04@gmail.com",
    phone: "+91 6382606293",
    phoneDisplay: "+91 63826 06293",
    rawPhone: "6382606293",
    github: "https://github.com/Manirathinam-04",
    linkedin: "https://www.linkedin.com/in/manirathinam04",
    linkedinLabel: "Manirathinam R",
    location: "Tamil Nadu, India",
    
    // Media assets
    photo: "/profile.jpg",
    resumeUrl: "/resume.pdf",
    resumeFilename: "Manirathinam_R_Resume.pdf",

    // Narrative bio for the About Me section
    bioParagraphs: [
      "I am a passionate Flutter Developer with hands-on experience building cross-platform mobile applications using Flutter and Dart. I focus on creating responsive, intuitive, and reliable mobile experiences with structured layouts, clean UI components, and maintainable architectures.",
      "During my internship as a Flutter Developer at Global Tech Professionals (London, UK), I converted Figma designs into responsive Flutter screens, integrated RESTful APIs with error-handling and loading states, and engineered critical authentication flows including OTP verification and form validation.",
      "With experience spanning front-end web development at Splendenslab IT Ventures, rigorous API testing via Postman, and current M.Tech studies in Computer Science & Engineering at Erode Sengunthar Engineering College, I am driven to deliver production-ready mobile solutions that blend technical precision with delightful design."
    ],

    // Highlight metrics / pillars based strictly on resume
    pillars: [
      {
        title: "Cross-Platform Flutter",
        description: "Building responsive, pixel-perfect Android & iOS interfaces from Figma designs using reusable widgets and structured hierarchies.",
      },
      {
        title: "REST APIs & JSON Handling",
        description: "End-to-end API integration using HTTP methods, Postman testing, response serialization, and resilient loading/error states.",
      },
      {
        title: "Authentication & App Flows",
        description: "Engineered secure login, registration, OTP verification, password reset, and interactive form validations.",
      },
      {
        title: "App Release & Quality",
        description: "Hands-on experience with Android & iOS release preparations, debugging runtime issues, and Git/GitHub branch workflows.",
      },
    ],
  },

  // Categorized technical skills from resume
  skills: [
    {
      category: "Mobile Development",
      description: "Core cross-platform mobile engineering with Flutter & Dart",
      skills: [
        { name: "Flutter", level: "Primary", icon: "Smartphone" },
        { name: "Dart", level: "Primary", icon: "Code2" },
        { name: "Cross-Platform Dev", level: "Primary", icon: "Laptop" },
        { name: "Flutter Widgets", level: "Primary", icon: "Component" },
        { name: "Reusable Components", level: "Core", icon: "Layers" },
        { name: "Responsive Layouts", level: "Core", icon: "Layout" },
        { name: "UI State Handling", level: "Core", icon: "Layers" },
        { name: "Android & iOS Release", level: "Core", icon: "Sparkles" },
      ],
    },
    {
      category: "API & Backend Integration",
      description: "RESTful services, data pipelines, JSON serialization, and API testing",
      skills: [
        { name: "REST APIs", level: "Primary", icon: "Network" },
        { name: "JSON Handling", level: "Core", icon: "FileJson" },
        { name: "HTTP Methods", level: "Core", icon: "Network" },
        { name: "Postman", level: "Core", icon: "Terminal" },
        { name: "API Response Handling", level: "Core", icon: "Cpu" },
        { name: "Loading & Error States", level: "Core", icon: "CheckCircle2" },
        { name: "Firebase", level: "Core", icon: "Flame" },
      ],
    },
    {
      category: "Authentication & Application Flows",
      description: "User journey implementation, security flows, and form validations",
      skills: [
        { name: "Login & Registration", level: "Core", icon: "Layers" },
        { name: "Password Reset", level: "Core", icon: "Code2" },
        { name: "OTP-based Flows", level: "Core", icon: "Smartphone" },
        { name: "Form Validation", level: "Core", icon: "CheckCircle2" },
        { name: "Navigation Flows", level: "Core", icon: "Layout" },
        { name: "API-driven UI", level: "Core", icon: "Network" },
      ],
    },
    {
      category: "Version Control & Tools",
      description: "Collaborative development, IDE tooling, and secondary languages",
      skills: [
        { name: "Git", level: "Proficient", icon: "GitBranch" },
        { name: "GitHub", level: "Proficient", icon: "Github" },
        { name: "VS Code", level: "Proficient", icon: "Terminal" },
        { name: "Python", level: "Familiar", icon: "FileCode" },
        { name: "HTML & CSS", level: "Familiar", icon: "Globe" },
      ],
    },
  ],

  // Featured Projects matching the resume
  projects: [
    {
      id: "campus-login",
      title: "Campus Login",
      badge: "Featured Authentication Flow",
      category: "Campus & Security (Flutter)",
      technologies: ["Flutter", "Dart", "Form Validation", "Navigation Flows", "Reusable Widgets"],
      summary:
        "A responsive Flutter mobile interface implementing widget hierarchies, comprehensive authentication flows, and user-friendly form validations.",
      highlights: [
        "Built a responsive Flutter mobile interface using reusable widgets, responsive layouts, and structured UI components.",
        "Implemented widget hierarchy and navigation logic to provide a smooth and user-friendly login experience.",
        "Engineered end-to-end authentication screens: Login, Registration, Password Reset, and OTP-related interactions.",
        "Integrated instant client-side validation rules and resilient API error states.",
      ],
      architecture:
        "Engineered with clean Flutter widget modularity, encapsulated validation logic, and reactive UI state management.",
      githubUrl: "https://github.com/Manirathinam-04",
      liveDemoUrl: "",
      hasDetails: true,
      accentColor: "#A855F7",
      mockupType: "auth",
    },
    {
      id: "expense-tracker",
      title: "Expense Tracker",
      badge: "Finance & Utility",
      category: "Finance & Productivity (Flutter)",
      technologies: ["Flutter", "Dart", "Responsive Layouts", "UI State Handling", "Financial Data"],
      summary:
        "A functional Flutter mobile interface for expense tracking with emphasis on reusable components, readable financial data, and ease of input.",
      highlights: [
        "Developed a functional Flutter mobile interface for expense tracking with emphasis on reusable components.",
        "Applied responsive layout principles and component reuse to maintain a consistent and scalable mobile interface.",
        "Engineered clean transaction feeds with instant category classification and readable financial metrics.",
        "Optimized touch interactions and screen ergonomics for one-handed mobile accessibility.",
      ],
      architecture:
        "Single-responsibility widget composition, structured transaction data models, and fluid screen transitions.",
      githubUrl: "https://github.com/Manirathinam-04",
      liveDemoUrl: "",
      hasDetails: true,
      accentColor: "#38BDF8",
      mockupType: "finance",
    },
    {
      id: "fc-genius",
      title: "FC-Genius",
      badge: "Sports Application",
      category: "Sports Mobile Application (Flutter)",
      technologies: ["Flutter", "Dart", "REST API", "State Management", "Video Interaction"],
      summary:
        "A sports-focused application featuring player dashboards, drill experiences, interactive challenges, video interactions, and comprehensive player-related capabilities.",
      highlights: [
        "Interactive player dashboards presenting training metrics and game stats.",
        "Structured drill routines and progress-based challenge sessions.",
        "REST API integration for dynamic sports data exchange and player profiles.",
        "Video interaction feeds and responsive touch-optimized mobile interfaces.",
      ],
      architecture:
        "Engineered with Flutter using a feature-driven modular structure, decoupled service layers for REST API interactions, and reactive state management.",
      githubUrl: "https://github.com/Manirathinam-04",
      liveDemoUrl: "",
      hasDetails: true,
      accentColor: "#CEFF00",
      mockupType: "sports",
    },
  ],

  // Professional Internships from Resume
  experience: [
    {
      id: "exp-gtp",
      role: "Flutter Developer Intern",
      organization: "Global Tech Professionals",
      location: "UK London (Remote)",
      period: "Internship",
      type: "Mobile Application Development",
      summary:
        "Developed cross-platform mobile application features using Flutter and Dart, building responsive interfaces with reusable widgets, structured layouts, navigation, and UI state handling.",
      achievements: [
        "Developed cross-platform mobile application features using Flutter and Dart, building responsive interfaces with reusable widgets, structured layouts, navigation, and UI state handling.",
        "Converted Figma designs into responsive Flutter screens and reusable UI components while maintaining visual consistency and mobile-friendly layouts.",
        "Integrated RESTful APIs using JSON and HTTP methods, handling requests, responses, validation, loading states, success states, and API error scenarios.",
        "Implemented authentication and account-related application flows including login, registration, password reset, OTP-related interactions, and form validation.",
        "Tested API requests and responses using Postman, and debugged integration issues involving request payloads, response handling, validation, navigation, and runtime behavior.",
        "Debugged Flutter application issues across UI, API integration, navigation, state handling, and runtime errors while improving application reliability.",
        "Managed source code using Git and GitHub, including branch-based development, feature implementation, code updates, and collaboration with senior developers.",
      ],
    },
    {
      id: "exp-splendenslab",
      role: "Front-End Development Intern",
      organization: "Splendenslab IT Ventures",
      location: "Salem, India",
      period: "Internship",
      type: "Front-End Web Development",
      summary:
        "Developed responsive web interfaces using HTML and CSS, creating structured layouts, interactive elements, and UI animations.",
      achievements: [
        "Developed responsive web interfaces using HTML and CSS, creating structured layouts and reusable UI components.",
        "Implemented client-side functionality including contact forms, interactive interface elements, and UI animations to improve user interaction.",
        "Debugged and optimized web interfaces to improve responsiveness, loading behavior, and visual consistency.",
        "Collaborated with senior developers using Git and contributed improvements to company web assets.",
      ],
    },
  ],

  // Academic Education from Resume
  education: [
    {
      id: "edu-1",
      degree: "Master of Technology (Integrated)",
      field: "Computer Science and Engineering",
      institution: "Erode Sengunthar Engineering College",
      location: "Erode, India",
      period: "06/2022 – 05/2027",
      score: "CGPA: 7.0",
      type: "Master's Degree (Ongoing)",
      description: "Advanced engineering coursework covering Algorithms, Mobile Computing, Software Architecture, and Database Systems.",
    },
    {
      id: "edu-2",
      degree: "Higher Secondary School",
      field: "Computer Science & Mathematics",
      institution: "Model Higher Secondary School",
      location: "Ariyalur, India",
      period: "Completed",
      score: "Higher Secondary",
      type: "Schooling",
      description: "Strong academic foundation in Mathematics, Physics, and foundational Computer Science.",
    },
  ],

  // Professional Certifications from Resume
  certifications: [
    {
      id: "cert-flutter",
      title: "Master Flutter",
      issuer: "Infosys",
      badge: "Mobile Architecture",
      icon: "Smartphone",
      description: "Comprehensive qualification in Flutter widget composition, reactive state handling, and performant cross-platform mobile app development.",
    },
    {
      id: "cert-rest",
      title: "REST API",
      issuer: "Infosys",
      badge: "API & Backend",
      icon: "Network",
      description: "Professional certification covering RESTful API architecture, HTTP communication protocols, JSON payload handling, and API testing.",
    },
    {
      id: "cert-anthropic",
      title: "Anthropic Certifications",
      issuer: "Anthropic",
      badge: "AI & Innovation",
      icon: "Sparkles",
      description: "Certified capability in modern AI workflows, LLM integration principles, and AI-assisted engineering practices.",
    },
  ],

  // Navigation Links
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ],
};
