import React from "react";
import { FaJava, FaPython, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaDatabase, FaCode, FaAws } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiNextdotjs,
  SiSpringboot,
  SiExpress,
  SiTailwindcss,
  SiMui,
  SiJenkins,
  SiVercel,
  SiSupabase,
  SiFirebase,
  SiRedux,
} from "react-icons/si";
import { TbApi, TbLayersSelected } from "react-icons/tb";

interface TechIconProps {
  name: string;
  className?: string;
}

export default function TechIcon({ name, className = "w-3.5 h-3.5 shrink-0" }: TechIconProps) {
  const n = name.toLowerCase();

  let iconNode = <FaCode className={`${className} text-blood-ink`} />;

  if (n.includes("java") && !n.includes("script")) iconNode = <FaJava className={`${className} text-[#007396]`} />;
  else if (n.includes("javascript")) iconNode = <SiJavascript className={`${className} text-[#F7DF1E] bg-black/80 rounded-xs`} />;
  else if (n.includes("typescript")) iconNode = <SiTypescript className={`${className} text-[#3178C6]`} />;
  else if (n.includes("python")) iconNode = <FaPython className={`${className} text-[#3776AB]`} />;
  else if (n.includes("sql") && !n.includes("postgre")) iconNode = <FaDatabase className={`${className} text-blood-ink`} />;
  else if (n.includes("react")) iconNode = <FaReact className={`${className} text-[#61DAFB]`} />;
  else if (n.includes("redux")) iconNode = <SiRedux className={`${className} text-[#764ABC]`} />;
  else if (n.includes("next")) iconNode = <SiNextdotjs className={`${className} text-leather`} />;
  else if (n.includes("material") || n.includes("mui")) iconNode = <SiMui className={`${className} text-[#007FFF]`} />;
  else if (n.includes("tailwind")) iconNode = <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
  else if (n.includes("tanstack") || n.includes("zustand")) iconNode = <TbLayersSelected className={`${className} text-[#FF4154]`} />;
  else if (n.includes("spring")) iconNode = <SiSpringboot className={`${className} text-[#6DB33F]`} />;
  else if (n.includes("node")) iconNode = <FaNodeJs className={`${className} text-[#339933]`} />;
  else if (n.includes("express")) iconNode = <SiExpress className={`${className} text-leather`} />;
  else if (n.includes("rest")) iconNode = <TbApi className={`${className} text-blood-ink`} />;
  else if (n.includes("postgre")) iconNode = <SiPostgresql className={`${className} text-[#4169E1]`} />;
  else if (n.includes("mongo")) iconNode = <SiMongodb className={`${className} text-[#47A248]`} />;
  else if (n.includes("supabase")) iconNode = <SiSupabase className={`${className} text-[#3ECF8E]`} />;
  else if (n.includes("firebase")) iconNode = <SiFirebase className={`${className} text-[#FFCA28]`} />;
  else if (n.includes("aws") || n.includes("amazon")) iconNode = <FaAws className={`${className} text-[#FF9900]`} />;
  else if (n.includes("git")) iconNode = <FaGitAlt className={`${className} text-[#F05032]`} />;
  else if (n.includes("docker")) iconNode = <FaDocker className={`${className} text-[#2496ED]`} />;
  else if (n.includes("jenkins")) iconNode = <SiJenkins className={`${className} text-[#D24939]`} />;
  else if (n.includes("vercel") || n.includes("render")) iconNode = <SiVercel className={`${className} text-leather`} />;

  return (
    <div className="p-1 rounded bg-parchment-dark/15 border border-parchment-dark/25 flex items-center justify-center shrink-0 shadow-2xs">
      {iconNode}
    </div>
  );
}
