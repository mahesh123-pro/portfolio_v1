"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import CustomCursor from "../ui/CustomCursor";

const DeveloperConsole = dynamic(() => import("../ui/DeveloperConsole"), { ssr: false });
const SpaceBackground = dynamic(() => import("../three/SpaceBackground"), { ssr: false });

export function ClientWrapper() {
  const pathname = usePathname();
  const showGlobalSpace = pathname !== "/";

  return (
    <>
      <CustomCursor />
      <DeveloperConsole />
      {showGlobalSpace && <SpaceBackground />}
    </>
  );
}

export default ClientWrapper;
