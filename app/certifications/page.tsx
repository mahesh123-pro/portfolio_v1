"use client";

import { useEffect, useState } from "react";
import Certifications from "../../components/sections/Certifications";

export default function CertificationsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center font-mono text-xs">
        LOADING VAULT DATA...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Certifications />
    </div>
  );
}
