import { useState, useEffect } from "react";

export interface MousePosition {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      // Normalize to -1 to 1 based on screen size
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;

      setMousePosition({ x, y, clientX, clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}
export default useMousePosition;
