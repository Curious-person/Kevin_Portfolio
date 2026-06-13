"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ScrollDownArrow() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, 15, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mt-16 flex justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      <ArrowDown className="size-10" />
    </motion.div>
  );
}
