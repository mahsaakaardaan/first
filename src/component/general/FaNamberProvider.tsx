"use client";

import { toFaDigits } from "@/lib/nums";
import React, { useEffect } from "react";

export default function FaNumberProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = toFaDigits(node.textContent || "");
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(walk);
      }
    };

    walk(document.body);
  }, []);

  return <>{children}</>;
}
