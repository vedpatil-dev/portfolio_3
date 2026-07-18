import React from "react";
import Spinner from "@/src/components/layout/Spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-80 bg-transparent">
      <Spinner size={80} />
    </div>
  );
}
