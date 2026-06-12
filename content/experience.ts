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
    role: "Tech Lead & Full-Stack Developer",
    company: "GKLT (Manakrishi App)",
    location: "Hyderabad, India",
    period: "2025 - Present",
    achievements: [
      "Led development of the Manakrishi platform, mapping real-time drone telemetry pipelines and implementing automated AWS deployment pipelines.",
      "Optimized server latency to sub-80ms speeds for real-time WebSocket telemetry connections.",
      "Designed secure VPC networks to protect farmer records and IoT drone data streams during spray dispatches."
    ],
    skills: ["Full-Stack Dev", "Team Lead", "IoT Workflows", "AWS Cloud", "WebSockets"],
    icon: "👑"
  },
  {
    id: "cloud-systems-eng",
    role: "Cloud & Full-Stack Developer",
    company: "Freelance & Solutions Agency",
    location: "Remote",
    period: "2024 - 2025",
    achievements: [
      "Deployed and maintained high-availability 3-tier cloud architectures separating Web, App, and Multi-AZ Database nodes for freelance clients.",
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
      "Built my first commercial React application and deployed it on Vercel, mastering component structures and state hooks.",
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
