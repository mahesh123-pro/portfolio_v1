export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  skills: string[];
  icon: string;
}

export const experiences: ExperienceEntry[] = [
  {
    id: "tech-lead-gklt",
    role: "Tech Lead & Architect",
    company: "GKLT (Manakrishi)",
    location: "Hyderabad, India",
    period: "2025 - Present",
    achievements: [
      "Leading product engineering to scale drone-telemetry IoT platforms for agricultural precision schedules.",
      "Optimizing server latency to sub-80ms speeds for real-time WebSocket telemetry connections.",
      "Designing end-to-end agri-tech platforms and secure AWS cloud networks supporting Indian farmers."
    ],
    skills: ["Architecture", "Team Lead", "IoT Workflows", "AWS Cloud", "WebSockets"],
    icon: "👑"
  },
  {
    id: "cloud-systems-eng",
    role: "Cloud & Systems Architect",
    company: "Freelance & Solutions Agency",
    location: "Remote",
    period: "2024 - 2025",
    achievements: [
      "Deployed high-availability 3-tier cloud architectures separating Web, App, and Multi-AZ Database nodes.",
      "Setup Docker container runtimes and automated test/build channels using GitHub Actions workflows.",
      "Hardened Linux server instances, configuring custom firewall parameters, routing schemes, and security groups."
    ],
    skills: ["Docker", "AWS Production", "System Design", "Linux", "Terraform"],
    icon: "🚀"
  },
  {
    id: "fullstack-developer",
    role: "Full Stack Web Developer",
    company: "Commercial Projects",
    location: "Hyderabad, India",
    period: "2023 - 2024",
    achievements: [
      "Mastered modular component structures, state management hooks, and React dynamic page layouts.",
      "Developed high-performance Node.js Express REST APIs integrated with indexed MongoDB schemas.",
      "Shipped and deployed first full-stack commercial web dashboards on Vercel Edge compute networks."
    ],
    skills: ["React", "Next.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    icon: "💻"
  },
  {
    id: "web-fundamentals",
    role: "Frontend Developer (Foundation)",
    company: "Technical Foundations",
    location: "Hyderabad, India",
    period: "2020 - 2023",
    achievements: [
      "Acquired deep knowledge of fundamental browser rendering engines, CSS grid systems, and layout hierarchies.",
      "Scripted interactive DOM manipulation scripts and utilities using vanilla ES6+ JavaScript.",
      "Designed and deployed lightweight responsive static portfolios and web interfaces."
    ],
    skills: ["HTML5", "CSS3", "Vanilla JS", "DOM Scripting", "Responsive UI"],
    icon: "🌱"
  }
];
