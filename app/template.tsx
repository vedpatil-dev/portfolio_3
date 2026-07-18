"use client";

import React, { useEffect, useState } from "react";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const [unfolded, setUnfolded] = useState(false);

  useEffect(() => {
    // Trigger the unfold transition on mount
    const raf = requestAnimationFrame(() => {
      setUnfolded(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`page-unfold-container ${unfolded ? "is-unfolded" : ""}`}>
      {children}
    </div>
  );
}
