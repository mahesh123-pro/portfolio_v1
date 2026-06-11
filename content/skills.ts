export interface Skill {
  name: string;
  proficiency: number;
  years: number;
  icon: string;
  details: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "cloud",
    name: "Cloud",
    skills: [
      { name: "AWS Cloud Services", proficiency: 92, years: 3, icon: "Cloud", details: "EC2, S3, RDS, VPC, ALB, CloudWatch, IAM, Route53 configurations." },
      { name: "Security Architectures", proficiency: 88, years: 2.5, icon: "ShieldAlert", details: "Secure 3-tier networking, subnets configuration, IAM policies, and cloud hardening." },
      { name: "Hosting & Deployment", proficiency: 90, years: 3, icon: "Globe", details: "Vercel, AWS Amplify, Netlify, and serverless architectures hosting." }
    ]
  },
  {
    id: "devops",
    name: "DevOps",
    skills: [
      { name: "Docker", proficiency: 80, years: 2, icon: "Container", details: "Containerization of full-stack services and local Docker Compose orchestration." },
      { name: "Linux Administration", proficiency: 88, years: 3, icon: "Terminal", details: "Primary OS operations, bash scripting, process daemon management, and SSH security." },
      { name: "CI/CD Pipelines", proficiency: 82, years: 2, icon: "GitBranch", details: "Automating builds and code deployments via GitHub Actions pipelines." }
    ]
  },
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "React & Next.js", proficiency: 92, years: 3, icon: "Layout", details: "Modern App Router, client/server rendering, state management, and optimized SEO." },
      { name: "Tailwind CSS", proficiency: 95, years: 3.5, icon: "Palette", details: "Modern layouts, custom styling frameworks, and responsive grids design." },
      { name: "Three.js & Motion", proficiency: 82, years: 2, icon: "Box", details: "Creating premium 3D interactions using GSAP, Framer Motion, and React Three Fiber." }
    ]
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js & Express", proficiency: 90, years: 3, icon: "Server", details: "Robust RESTful API design, middleware execution, and microservices logic." },
      { name: "WebSockets", proficiency: 85, years: 2, icon: "Radio", details: "Sub-second real-time telemetry communications using WebSockets." },
      { name: "Python Engineering", proficiency: 78, years: 2, icon: "Code", details: "Scripting, server architectures, and mathematical calculations." }
    ]
  },
  {
    id: "database",
    name: "Database",
    skills: [
      { name: "MongoDB", proficiency: 90, years: 3, icon: "Database", details: "Document indexing, schema optimization, aggregation pipelines, and MongoDB Atlas." },
      { name: "PostgreSQL", proficiency: 82, years: 2, icon: "HardDrive", details: "Relational data models, database integrity, and SQL query tuning." },
      { name: "Redis Cache", proficiency: 80, years: 1.5, icon: "Zap", details: "Caching REST API responses to achieve sub-100ms response cycles." }
    ]
  }
];
