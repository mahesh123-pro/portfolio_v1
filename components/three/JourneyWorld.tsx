"use client";

import SceneArrival from "./SceneArrival";
import SceneSkills from "./SceneSkills";
import SceneProjects from "./SceneProjects";
import SceneTimeline from "./SceneTimeline";
import SceneMissionControl from "./SceneMissionControl";
import SceneContact from "./SceneContact";

interface JourneyWorldProps {
  scrollProgress: React.MutableRefObject<number>;
  activeScene: number;
}

export function JourneyWorld({ scrollProgress, activeScene }: JourneyWorldProps) {
  return (
    <group>
      {/* Scene 1: Arrival Portal - Positioned at origin */}
      <group position={[0, 0, 0]}>
        <SceneArrival active={activeScene === 0} />
      </group>

      {/* Scene 2: Cloud Universe - Positioned at first waypoint */}
      <group position={[15, -10, -35]}>
        <SceneSkills active={activeScene === 1} />
      </group>

      {/* Scene 3: Project Galaxy - Positioned at second waypoint */}
      <group position={[-15, -25, -75]}>
        <SceneProjects active={activeScene === 2} />
      </group>

      {/* Scene 4: Experience Timeline Tunnel - Positioned at third waypoint */}
      <group position={[0, -40, -120]}>
        <SceneTimeline active={activeScene === 3} />
      </group>

      {/* Scene 5: Mission Control - Positioned at fourth waypoint */}
      <group position={[20, -55, -170]}>
        <SceneMissionControl active={activeScene === 4} />
      </group>

      {/* Scene 6: Contact Portal - Positioned at fifth waypoint */}
      <group position={[0, -75, -220]}>
        <SceneContact active={activeScene === 5} />
      </group>
    </group>
  );
}

export default JourneyWorld;
