export const profile = {
  name: "Wahyu Dwiyanto",
  initials: "WD",
  photo: "/profile.png",
  title: "Full-Stack Developer",
  roles: [
    "Full-Stack Developer",
    "Web Developer",
    "Software Developer",
    "UI/UX Designer",
  ],
  location: "Yogyakarta, Indonesia",
  email: "Wahyudwiyanto057@gmail.com",
  phone: "+62 857-0991-0855",
  status: "Open for Opportunities",
  tagline:
    "Full-Stack Developer & UI/UX Designer specializing in Laravel, React, and modern web architectures.",
  summary:
    "Lulusan S1 Informatika dari Universitas Ahmad Dahlan dengan minat pada pengembangan perangkat lunak, pengembangan web, dan keamanan sistem. Berpengalaman dalam pengembangan website, perancangan antarmuka pengguna, dan pengujian sistem melalui proyek akademik serta magang. Cepat belajar, mudah beradaptasi, dan terbiasa bekerja mandiri maupun dalam tim.",
  social: {
    github: "https://github.com/wahyudwiyanto",
    linkedin: "https://linkedin.com/in/wahyu-dwiyanto",
    instagram: "https://instagram.com/wahyudwiyanto",
  },
  stats: [
    { label: "Proyek Selesai", value: 4, suffix: "+" },
    { label: "Magang & Kerja", value: 3, suffix: "+" },
    { label: "Tahun Belajar", value: 4, suffix: "+" },
  ],
  education: {
    degree: "S1 Informatika",
    faculty: "Fakultas Teknologi Industri",
    university: "Universitas Ahmad Dahlan",
    period: "2022 — 2026",
    location: "Yogyakarta, Indonesia",
    coursework: [
      "Struktur Data & Algoritma",
      "Rekayasa Perangkat Lunak",
      "Keamanan Data & Jaringan",
      "Pengembangan Web",
      "Basis Data",
      "Desain UI/UX",
    ],
  },
};

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  tags: string[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "asisten-kdjk",
    role: "Asisten Praktikum Keamanan Data & Jaringan",
    company: "Universitas Ahmad Dahlan",
    location: "Yogyakarta, Indonesia",
    period: "2024 — 2025",
    type: "Academic",
    highlights: [
      "Membantu pelaksanaan praktikum mata kuliah Keamanan Data dan Jaringan Komputer.",
      "Mendampingi mahasiswa selama sesi praktikum berlangsung.",
      "Membantu troubleshooting terkait pelaksanaan praktikum.",
      "Menjelaskan materi praktikum kepada mahasiswa sesuai kebutuhan.",
    ],
    tags: ["Network Security", "Teaching", "Troubleshooting", "KDJK"],
  },
  {
    id: "srikandi-merch",
    role: "UI/UX Designer",
    company: "Srikandi Merch",
    location: "Indonesia",
    period: "2024",
    type: "Design",
    highlights: [
      "Merancang desain antarmuka dan pengalaman pengguna untuk platform digital Srikandi Merch.",
      "Melakukan analisis kebutuhan pengguna sebagai dasar perancangan desain.",
      "Membuat wireframe dan prototype menggunakan Figma.",
      "Mengimplementasikan antarmuka pengguna menggunakan Laravel sesuai kebutuhan desain.",
    ],
    tags: ["Figma", "UI/UX", "Wireframe", "Laravel", "Prototyping"],
  },
  {
    id: "mts-kasihan",
    role: "Web Developer Intern",
    company: "MTs Muhammadiyah Kasihan",
    location: "Bantul, Indonesia",
    period: "2024",
    type: "Internship",
    highlights: [
      "Mengembangkan website perpustakaan berbasis web untuk pengelolaan data buku.",
      "Merancang fitur sistem sesuai kebutuhan administrasi perpustakaan.",
      "Membangun sistem informasi perpustakaan menggunakan Laravel dan MySQL.",
      "Melakukan pengujian fungsi website agar sesuai kebutuhan pengguna.",
    ],
    tags: ["Laravel", "MySQL", "Web Development", "Library System"],
  },
];

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "ecommerce" | "web" | "design" | "security";
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

export const projects: ProjectItem[] = [
  {
    id: "wellplans",
    title: "Wellplans",
    subtitle: "E-Commerce Platform",
    description:
      "Platform e-commerce full-stack untuk brand Wellplans. Berkontribusi sebagai Full-Stack Developer dalam pengembangan produk digital dengan Laravel, MySQL, dan integrasi API/JSON.",
    category: "ecommerce",
    tags: ["Laravel", "MySQL", "API/JSON", "E-Commerce", "Full-Stack"],
    featured: true,
  },
  {
    id: "perpustakaan-mts",
    title: "Sistem Perpustakaan",
    subtitle: "Information System",
    description:
      "Sistem informasi perpustakaan berbasis web untuk MTs Muhammadiyah Kasihan. Fitur pengelolaan data buku, administrasi, dan manajemen basis data terintegrasi.",
    category: "web",
    tags: ["Laravel", "MySQL", "CRUD", "Web App"],
    featured: true,
  },
  {
    id: "srikandi-merch",
    title: "Srikandi Merch",
    subtitle: "UI/UX & Web Platform",
    description:
      "Perancangan UI/UX dan implementasi platform digital untuk Srikandi Merch. Wireframe, prototype Figma, hingga implementasi antarmuka dengan Laravel.",
    category: "design",
    tags: ["Figma", "UI/UX", "Laravel", "Prototype"],
    featured: true,
  },
  {
    id: "kdjk-lab",
    title: "KDJK Lab Assistant",
    subtitle: "Security & Networking",
    description:
      "Pendampingan praktikum Keamanan Data dan Jaringan Komputer. Troubleshooting, demonstrasi materi, dan bimbingan mahasiswa selama sesi lab.",
    category: "security",
    tags: ["Network Security", "KDJK", "Lab", "Teaching"],
    featured: false,
  },
];

export const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "PHP", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["Laravel", "React.js", "Tailwind CSS", "Framer Motion", "Bootstrap"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    title: "Tools & Design",
    skills: ["Git & GitHub", "Figma", "Postman", "VS Code", "Vercel"],
  },
];

export const skillBars = [
  { name: "UI/UX Design & Prototyping", level: 92 },
  { name: "Frontend Development (React, HTML/CSS)", level: 88 },
  { name: "Backend & Web (Laravel, PHP, REST API)", level: 90 },
  { name: "Database Management (MySQL)", level: 85 },
  { name: "Software Testing & QA", level: 82 },
];

export const resumeJson = {
  name: profile.name,
  university: profile.education.university,
  degree: `${profile.education.degree} (${profile.education.period})`,
  roles: profile.roles,
  core_tech: ["Laravel", "React.js", "MySQL", "Figma", "JavaScript", "PHP"],
  location: profile.location,
  phone: profile.phone,
  email: profile.email,
};

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "web", label: "Web Systems" },
  { id: "design", label: "UI/UX Design" },
  { id: "security", label: "Security & Networking" },
];
