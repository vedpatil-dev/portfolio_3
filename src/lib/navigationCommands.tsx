import React from "react";
import {
  Home as HomeIcon,
  User as UserIcon,
  BookOpen,
  Briefcase,
  FolderGit2,
  Mail,
  Folder,
  Book,
} from "lucide-react";
import projectsData from "@/src/data/content/projects.json";
import experienceData from "@/src/data/content/experience.json";

export const COMMANDS = [
  { id: "home", label: "Home", icon: <HomeIcon className="w-4 h-4" />, route: "/" },
  { id: "about", label: "About", icon: <UserIcon className="w-4 h-4" />, route: "/about" },
  { id: "skills", label: "Skills", icon: <BookOpen className="w-4 h-4" />, route: "/about#skills" },
  { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" />, route: "/experience" },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" />, route: "/projects" },
  { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" />, route: "/contact" },
  ...projectsData.projects.map((p) => ({
    id: p.slug,
    label: `Project: ${p.name}`,
    icon: <Folder className="w-4 h-4" />,
    route: `/projects/${p.slug}`,
    tags: p.techStack,
  })),
  ...experienceData.entries.map((e) => ({
    id: e.id,
    label: `Experience: ${e.company}`,
    icon: <Book className="w-4 h-4" />,
    route: `/experience#${e.id}`,
    tags: e.skills,
  })),
];
