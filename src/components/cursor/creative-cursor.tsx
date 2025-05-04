"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      height: 60,
      width: 60,
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      backgroundColor: "rgba(58, 134, 255, 0.6)",
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll("a, button, .hover-effect");

      for (const link of links) {
        link.addEventListener("mouseenter", () => setCursorVariant("hover"));
        link.addEventListener("mouseleave", () => setCursorVariant("default"));
      }
    };

    handleLinkHoverEvents();
  }, []);

  return (
    <motion.div
      className="cursor h-8 w-8 rounded-full bg-blue-500 fixed top-0 left-0 pointer-events-none z-50 opacity-75"
      variants={variants}
      animate={cursorVariant}
    />
  );
};

export default CustomCursor;
