export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: "cloud" | "frontend" | "systems";
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-react-three-fiber-nextjs",
    title: "Optimizing 3D Render Pipelines in Next.js Apps",
    excerpt: "Discover performance patterns for loading complex WebGL canvases, shading architectures, and memory footprint management within Next.js applications.",
    category: "frontend",
    date: "June 12, 2026",
    readTime: "6 min read",
    tags: ["React Three Fiber", "Next.js", "WebGL", "Performance"],
    image: "/portfolio1assests/my3dportfolioimage.png",
    content: `Loading heavy 3D canvases in modern React frameworks like Next.js can quickly cause performance regressions if not handled with care. Here are the core patterns used to optimize this portfolio's WebGL fly-through:

### 1. Code Splitting and Dynamic Imports
Never bundle React Three Fiber (R3F) or Three.js in the initial bundle. Use Next.js dynamic imports with \`ssr: false\` to defer scripting compilation until client hydration:

\`\`\`tsx
import dynamic from "next/dynamic";

const JourneyCanvas = dynamic(() => import("../components/three/JourneyCanvas"), {
  ssr: false,
  loading: () => <CanvasLoader />
});
\`\`\`

### 2. Mesh and Texture Instancing
If your scene requires multiple instances of the same geometry (like space particles or cloud cards), avoid rendering multiple mesh elements. Instead, use instanced meshes. This reduces drawing instructions (Draw Calls) to the GPU down to a single instruction.

### 3. Cap Device Pixel Ratio (DPR)
High-resolution screens (like Apple Retina) will struggle rendering complex shaders if the device pixel ratio is set to window defaults. Capping the DPR at 1.5 achieves a balance between visual fidelity and framerate:

\`\`\`tsx
<Canvas dpr={[1, 1.5]}>
  {/* Scene details */}
</Canvas>
\`\`\`

Using these rules, this portfolio maintains a smooth **60 FPS** scroll rate across modern devices.`
  },
  {
    slug: "secure-three-tier-aws-architecture",
    title: "Designing a Hardened Three-Tier VPC Node Architecture",
    excerpt: "A step-by-step breakdown of isolating database workloads, routing secure ALB transactions, and provisioning replication layers in AWS.",
    category: "cloud",
    date: "May 28, 2026",
    readTime: "8 min read",
    tags: ["AWS", "VPC", "Security", "Terraform"],
    image: "/portfolio1assests/work-3.png",
    content: `When deploying production applications in public cloud providers like AWS, keeping sensitive resources isolated from public internet gateways is paramount.

### The Architecture Map
Our secure configuration segments workloads into three isolated layers:
1. **Public Web Tier**: Houses the Application Load Balancer and NAT Gateways.
2. **Private App Tier**: Houses the EC2 auto-scaling application servers. No direct internet ingress.
3. **Private Database Tier**: Houses RDS standby clusters. Access is restricted exclusively to requests originating from the Application Tier security groups.

### Provisioning Network Layers with Terraform
By writing infrastructure as code, we verify subnet separations and route tables deterministically:

\`\`\`hcl
resource "aws_subnet" "private_db" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.db_subnet_cidrs[count.index]
  availability_zone = var.azs[count.index]

  tags = {
    Name = "Private-DB-Subnet-\${count.index}"
  }
}
\`\`\`

### Security Group Constraints
We establish absolute database protection by limiting incoming TCP protocols solely to the App Security Group ID:

\`\`\`hcl
resource "aws_security_group_rule" "allow_db_from_app" {
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  security_group_id        = aws_security_group.database.id
  source_security_group_id = aws_security_group.app.id
}
\`\`\`

This pattern reduces outer vulnerabilities, yielding **99.99% network security configurations**.`
  },
  {
    slug: "scaling-websocket-telemetry-servers",
    title: "Scaling Real-Time Telemetry pipelines in Node.js",
    excerpt: "Architecting microsecond drone synchronization lines using WebSockets, pub/sub redis adapters, and automated EC2 scaling parameters.",
    category: "systems",
    date: "April 15, 2026",
    readTime: "7 min read",
    tags: ["Node.js", "WebSockets", "Redis", "Systems Design"],
    image: "/portfolio1assests/work-1.png",
    content: `Real-time synchronization demands microsecond responsiveness. For the *Manakrishi App*, connecting mobile users with drone telemetry streams required resolving major throughput issues.

### The Telemetry Pipeline
Drone transponders stream raw coordinates at 20Hz. Processing this stream directly on a single Express instance would throttle event loops immediately.

To scale:
1. **WebSocket Gateways**: Light-weight websocket nodes handle socket connections.
2. **Redis Message Bus**: Acts as a pub/sub manager to distribute payload actions.
3. **Background Worker Nodes**: Decoupled systems compute coordinates and execute audit logs asynchronously.

### Implementing the Redis Adapter in Express
Integrating pub/sub adapters lets us scale out websocket gates across multiple server nodes:

\`\`\`javascript
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
});
\`\`\`

Using this decoupled architecture, average telemetric latency is compressed to **< 80ms** under massive concurrency loads.`
  }
];
