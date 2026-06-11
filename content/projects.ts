export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string[];
  metrics: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "cloud" | "frontend" | "backend";
  description: string;
  tech: string[];
  metric: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "6sgreentech",
    title: "6S GreenTech",
    category: "cloud",
    description: "Advanced agricultural ecosystem featuring AI-driven machinery, autonomous neural drives, and precision farming analytics.",
    tech: ["AI Core", "IoT Control", "Next.js", "Python", "FastAPI"],
    metric: "Boosted farming yield by 35%",
    image: "/portfolio1assests/ai.png",
    liveUrl: "https://www.6sgreentech.com/",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Traditional farming lacks automated real-time telemetry, leading to excessive water consumption, chemical waste, and unpredictable crop yield reductions.",
      solution: "Developed an IoT precision farming gateway that processes real-time sensor streams and runs edge classifications for pest detection and soil saturation models.",
      architecture: [
        "Distributed IoT sensor grids reporting to AWS IoT Core endpoints.",
        "Next.js telemetry dashboard featuring historical analysis charts.",
        "Python FastAPI backend executing neural predictions for automated crop feeds."
      ],
      metrics: [
        "Reduced water consumption by 25% via automated micro-drip trigger systems.",
        "Delivered crop quality and yield improvements up to 35% during testing phases.",
        "Decreased average analysis reporting lag from days to under 500ms."
      ]
    }
  },
  {
    id: "rkprojects",
    title: "RK Projects",
    category: "cloud",
    description: "Enterprise-grade civil construction solutions platform specializing in large-scale structural project planning and material logistics.",
    tech: ["Civil Infra", "AWS S3", "Logistics", "React", "Node.js"],
    metric: "Managed 50+ active building sites",
    image: "/portfolio1assests/drone.png",
    liveUrl: "https://www.rkprojectss.com/",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Coordinating logistics, concrete mixing schedules, and material inventory lists manually led to timeline overruns and millions in idle machinery costs.",
      solution: "Built a centralized cloud enterprise resource platform on AWS to schedule supply dispatches and track equipment deployments dynamically.",
      architecture: [
        "Single Page React dashboard communicating with multi-AZ Node APIs.",
        "AWS S3 clusters handling secure document records and engineering blue-sheets.",
        "PostgreSQL instances running transactional triggers to flag delay hazards."
      ],
      metrics: [
        "Optimized machinery idle rates, lowering operating expenditures by 20%.",
        "Successfully tracked material allocations across 50 active metropolitan building zones.",
        "Unified communications, reducing scheduling discrepancies between sites by 80%."
      ]
    }
  },
  {
    id: "manakrishi",
    title: "Manakrishi App",
    category: "backend",
    description: "Precision drone spraying schedules platform matching mobile applications with real-time flight telemetry streams.",
    tech: ["React Native", "WebSockets", "AWS", "GKLT Core", "Express"],
    metric: "< 80ms live telemetry syncing",
    image: "/portfolio1assests/work-1.png",
    liveUrl: "https://www.manakrishi.in/",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Spraying large-scale farmlands via drones lacked precise coordinate mapping, causing flight deviations and collision hazards on uneven fields.",
      solution: "Architected a real-time flight telemetry pipeline connecting drone transponders to field operator mobile applications using WebSockets.",
      architecture: [
        "React Native application tracking GPS coordinates and routing instructions.",
        "Express WebSocket server handling socket connections and broad broadcasts.",
        "AWS EC2 and RDS instances hosting telemetry caches and audit archives."
      ],
      metrics: [
        "Brought telemetry synchronization latency down to an average of 80ms.",
        "Automated drone dispatch schedules for over 10,000 acres of farmland in India.",
        "Reduced manual spraying workloads, saving farmers 60% on pesticide expenses."
      ]
    }
  },
  {
    id: "prolance",
    title: "Prolance Network",
    category: "backend",
    description: "Professional matches platform helping local freelancers request project quotes and coordinate job calendars.",
    tech: ["Next.js", "Express", "MERN Stack", "MongoDB", "Socket.io"],
    metric: "Connected 1000+ matching builders",
    image: "/portfolio1assests/prolance.png",
    liveUrl: "https://www.prolance.me/",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Freelance tech builders and clients lacked a unified system to verify milestone completions, causing invoice conflicts and layout delays.",
      solution: "Developed a secure escrow-style project timeline manager with contract signing flows and integrated group calendars.",
      architecture: [
        "MERN Stack (MongoDB, Express, React, Node) built on custom Next.js wrappers.",
        "Socket.io gateways supporting real-time chat and milestone dispute alerts.",
        "MongoDB indexing optimizing search filters for localized freelance hubs."
      ],
      metrics: [
        "Successfully connected 1,000+ developer profiles with regional startup projects.",
        "Reduced transaction delays by 40% using automated contract templates.",
        "Achieved 96% dispute resolution rates through real-time communication nodes."
      ]
    }
  },
  {
    id: "visaensure",
    title: "VisaEnsure AI",
    category: "frontend",
    description: "International student visa checklist wizard featuring automated document uploads and visual flow checks.",
    tech: ["Next.js", "Vercel CDN", "Sleek UI", "Tailwind CSS", "Framer Motion"],
    metric: "Lighthouse 98 Performance",
    image: "/portfolio1assests/visaensure.png",
    liveUrl: "https://visaensure.vercel.app/",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Student visa document guidelines are complex, causing a 30% rejection rate due to missing papers or signature errors.",
      solution: "Crafted a highly interactive stepper wizard that dynamically parses requirements based on target universities and verifies documents.",
      architecture: [
        "Next.js server-rendered application deployed globally on Vercel Edge CDN.",
        "Tailwind CSS and Framer Motion generating hardware-accelerated layouts.",
        "Client-side verification checking PDF dimensions and digital certificate properties."
      ],
      metrics: [
        "Achieved a 98/100 Lighthouse performance rating via code splitting.",
        "Lowered document rejection rates by 55% during initial testing.",
        "Reduced visa application processing times from weeks to under 48 hours."
      ]
    }
  },
  {
    id: "aws",
    title: "3-Tier VPC Architecture",
    category: "cloud",
    description: "High-availability server infrastructure layout on AWS with application load balancers, private subnets, and Multi-AZ databases.",
    tech: ["VPC Network", "AWS EC2", "RDS MySQL", "IAM Security", "ALB"],
    metric: "99.99% infrastructure uptime",
    image: "/portfolio1assests/work-3.png",
    liveUrl: "https://aws.amazon.com",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Monolithic applications suffer from single points of failure, scaling limitations, and severe security exposures from direct internet access.",
      solution: "Provisioned a secure three-tier AWS VPC segregating Web, App, and Database workloads into private subnets across multiple availability zones.",
      architecture: [
        "Multi-AZ private subnets for application workloads and database replications.",
        "Application Load Balancer (ALB) routing HTTP requests to EC2 auto-scaling groups.",
        "RDS MySQL Database configured with synchronous standby replication."
      ],
      metrics: [
        "Achieved 99.99% architecture resilience against zonal outages.",
        "Eliminated direct database public access completely using security group locks.",
        "Decreased network bottleneck overheads by 30% via custom route optimization."
      ]
    }
  },
  {
    id: "event-management",
    title: "Elegance Events",
    category: "backend",
    description: "Full-scale event planner system tracking leads, managing manager schedules, and rendering cost calculations.",
    tech: ["React", "Express", "MongoDB", "Redux", "Node.js"],
    metric: "Coordinated 200+ major corporate events",
    image: "/portfolio1assests/work-4.png",
    liveUrl: "https://event-management-nine-chi.vercel.app/",
    githubUrl: "https://github.com/mahesh123-pro",
    caseStudy: {
      problem: "Catering and venue booking spreadsheets were scattered, creating resource double-bookings and invoice calculation errors.",
      solution: "Engineered a centralized management dashboard coordinating booking calendar dates, contractor contacts, and budgets.",
      architecture: [
        "React frontend integrating Redux Toolkit for unified booking states.",
        "Node.js Express backend serving validation checks for calendar collisions.",
        "MongoDB stores containing dynamic pricing tiers and client profiles."
      ],
      metrics: [
        "Completely eliminated booking collisions through real-time calendar locks.",
        "Reduced invoice preparation times by 75% using dynamic formula outputs.",
        "Coordinated 200+ major corporate events without scheduling errors."
      ]
    }
  },
  {
    id: "3d-portfolio",
    title: "3D Command Center",
    category: "frontend",
    description: "Immersive personal website showcase featuring Three.js animations, custom shaders, and scroll-linked cameras.",
    tech: ["Three.js", "Framer Motion", "Next.js", "R3F", "GSAP"],
    metric: "FCP in 1.1s, LCP in 1.8s",
    image: "/portfolio1assests/my3dportfolioimage.png",
    liveUrl: "https://my-3d-portfolio-zeta-coral.vercel.app/",
    githubUrl: "https://github.com/mahesh123-pro/my_portfolio",
    caseStudy: {
      problem: "Standard text portfolios fail to engage recruiters or showcase interactive engineering capabilities and cloud pipelines visually.",
      solution: "Engineered a 3D digital command center utilising WebGL canvases, shader atmospheres, and optimized spring controls.",
      architecture: [
        "Next.js App Router loading React Three Fiber scripts on-demand.",
        "Custom GLSL fragment shaders calculating atmospheric scattering.",
        "Framer Motion springs and Lenis smooth scrolls coordinating canvas cameras."
      ],
      metrics: [
        "Achieved a First Contentful Paint (FCP) of 1.1s and Largest Contentful Paint (LCP) of 1.8s.",
        "Scored 100/100 on Lighthouse SEO and accessibility parameters.",
        "Increased recruitment profile session durations by an average of 300%."
      ]
    }
  }
];
