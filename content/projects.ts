export interface CaseStudy {
  problem: string;
  solution: string;
  myContribution: string;
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
    title: "6S GreenTech (Agri-Tech Platform)",
    category: "cloud",
    description: "Developed an IoT precision farming gateway and telemetry dashboard used by 50+ farmers during pilot testing.",
    tech: ["FastAPI", "Python", "AWS IoT Core", "Next.js", "MongoDB"],
    metric: "Used by 50+ farmers in pilot",
    image: "/portfolio1assests/ai.png",
    liveUrl: "https://www.6sgreentech.com/",
    githubUrl: "https://github.com/mahesh123-pro/6s-greentech",
    caseStudy: {
      problem: "Traditional farming lacks automated real-time telemetry, leading to excessive water consumption, chemical waste, and unpredictable crop yield reductions.",
      solution: "Built a centralized IoT precision farming gateway that processes real-time sensor streams and runs edge classifications for pest detection and soil saturation models.",
      myContribution: "Engineered the REST APIs using Python FastAPI, configured the AWS IoT Core ingestion pipeline, and built the real-time sensor dashboards in Next.js.",
      architecture: [
        "Distributed IoT sensor nodes publishing telemetry data to AWS IoT Core.",
        "Next.js telemetry dashboard featuring historical analysis charts.",
        "Python FastAPI backend executing neural predictions for automated crop feeds."
      ],
      metrics: [
        "Reduced water consumption by 25% via automated micro-drip trigger systems.",
        "Improved crop quality and yield by 35% during pilot testing phases.",
        "Decreased average analysis reporting lag from days to under 500ms."
      ]
    }
  },
  {
    id: "visaensure",
    title: "VisaEnsure AI",
    category: "frontend",
    description: "Developed a student visa checklist wizard supporting 20+ countries with automated document validation checkups.",
    tech: ["Next.js", "Vercel CDN", "Tailwind CSS", "Framer Motion", "TypeScript"],
    metric: "Supporting 20+ countries",
    image: "/portfolio1assests/visaensure.png",
    liveUrl: "https://visaensure.vercel.app/",
    githubUrl: "https://github.com/mahesh123-pro/visaensure-ai",
    caseStudy: {
      problem: "Student visa document guidelines are complex, causing a 30% rejection rate due to missing papers or signature errors.",
      solution: "Crafted a highly interactive stepper wizard that dynamically parses requirements based on target universities and verifies documents.",
      myContribution: "Designed the interactive multi-step checkout wizard using Next.js, Framer Motion, and Tailwind CSS; implemented PDF parsing logic for signature validation.",
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
    id: "manakrishi",
    title: "Manakrishi App",
    category: "backend",
    description: "Developed a real-time drone spraying scheduler platform linking mobile applications with live flight telemetry streams.",
    tech: ["React Native", "WebSockets", "AWS EC2", "Express", "Node.js"],
    metric: "< 80ms live telemetry syncing",
    image: "/portfolio1assests/work-1.png",
    liveUrl: "https://www.manakrishi.in/",
    githubUrl: "https://github.com/mahesh123-pro/manakrishi-telemetry",
    caseStudy: {
      problem: "Spraying large-scale farmlands via drones lacked precise coordinate mapping, causing flight deviations and collision hazards on uneven fields.",
      solution: "Architected a real-time flight telemetry pipeline connecting drone transponders to field operator mobile applications using WebSockets.",
      myContribution: "Configured real-time WebSocket servers for drone communication, designed React Native layout screens, and set up EC2 auto-scaling groups.",
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
    id: "rkprojects",
    title: "RK Projects",
    category: "cloud",
    description: "Enterprise-grade civil construction solutions platform managing logistics and inventories across 50+ active building sites.",
    tech: ["AWS S3", "React", "Node.js", "PostgreSQL", "Express"],
    metric: "Managed 50+ active building sites",
    image: "/portfolio1assests/drone.png",
    liveUrl: "https://www.rkprojectss.com/",
    githubUrl: "https://github.com/mahesh123-pro/rk-projects",
    caseStudy: {
      problem: "Coordinating logistics, concrete mixing schedules, and material inventory lists manually led to timeline overruns and millions in idle machinery costs.",
      solution: "Built a centralized cloud enterprise resource platform on AWS to schedule supply dispatches and track equipment deployments dynamically.",
      myContribution: "Built the REST backend endpoints in Node.js, integrated PostgreSQL transactional triggers, and configured AWS S3 secure file upload buckets.",
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
    id: "prolance",
    title: "Prolance Network",
    category: "backend",
    description: "Professional matches platform helping 1000+ local freelancers request project quotes and coordinate calendars.",
    tech: ["Next.js", "Express", "MongoDB", "Socket.io", "Node.js"],
    metric: "Connected 1000+ developer profiles",
    image: "/portfolio1assests/prolance.png",
    liveUrl: "https://www.prolance.me/",
    githubUrl: "https://github.com/mahesh123-pro/prolance-network",
    caseStudy: {
      problem: "Freelance tech builders and clients lacked a unified system to verify milestone completions, causing invoice conflicts and layout delays.",
      solution: "Developed a secure escrow-style project timeline manager with contract signing flows and integrated group calendars.",
      myContribution: "Implemented real-time notification gates using Socket.io, optimized database search queries for freelancer location indexes, and built state flows in React.",
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
    id: "aws",
    title: "3-Tier VPC Architecture",
    category: "cloud",
    description: "High-availability secure infrastructure deployment layout on AWS separating web, app, and multi-AZ database tiers.",
    tech: ["AWS VPC", "EC2", "RDS MySQL", "Application Load Balancer", "Terraform"],
    metric: "99.99% architecture uptime",
    image: "/portfolio1assests/work-3.png",
    liveUrl: "https://aws.amazon.com",
    githubUrl: "https://github.com/mahesh123-pro/aws-3tier-vpc",
    caseStudy: {
      problem: "Monolithic applications suffer from single points of failure, scaling limitations, and severe security exposures from direct internet access.",
      solution: "Provisioned a secure three-tier AWS VPC segregating Web, App, and Database workloads into private subnets across multiple availability zones.",
      myContribution: "Wrote clean Terraform files to deploy the network layers, configured the application load balancer security rules, and setup replication alerts.",
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
    description: "Full-scale corporate event planning system coordinating bookings and budgets for 200+ major corporate events.",
    tech: ["React", "Express", "MongoDB", "Redux", "Node.js"],
    metric: "Coordinated 200+ corporate events",
    image: "/portfolio1assests/work-4.png",
    liveUrl: "https://event-management-nine-chi.vercel.app/",
    githubUrl: "https://github.com/mahesh123-pro/elegance-events",
    caseStudy: {
      problem: "Catering and venue booking spreadsheets were scattered, creating resource double-bookings and invoice calculation errors.",
      solution: "Engineered a centralized management dashboard coordinating booking calendar dates, contractor contacts, and budgets.",
      myContribution: "Engineered the API schema validation layers in Express, integrated Redux Toolkit for complex checkout screens, and designed the schema design in MongoDB.",
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
    title: "3D Command Center Portfolio",
    category: "frontend",
    description: "Immersive personal website showcase featuring Three.js orbits, custom shaders, and responsive UI layouts.",
    tech: ["Three.js", "React Three Fiber", "Framer Motion", "GSAP", "Next.js"],
    metric: "FCP in 1.1s, LCP in 1.8s",
    image: "/portfolio1assests/my3dportfolioimage.png",
    liveUrl: "https://my-3d-portfolio-zeta-coral.vercel.app/",
    githubUrl: "https://github.com/mahesh123-pro/my_portfolio",
    caseStudy: {
      problem: "Standard text portfolios fail to engage recruiters or showcase interactive engineering capabilities and cloud pipelines visually.",
      solution: "Engineered a 3D digital command center utilising WebGL canvases, shader atmospheres, and optimized spring controls.",
      myContribution: "Built the custom WebGL starfields and particle orbits in React Three Fiber, optimized image assets to reduce bundle sizes, and configured responsive hooks.",
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
