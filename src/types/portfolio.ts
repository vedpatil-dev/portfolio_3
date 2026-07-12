export interface Profile {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  resumeUrl: string;
  profileImage: string;
  availableForWork: boolean;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  duration: string;
  details: string;
}

export interface About {
  summary: string;
  education: EducationEntry[];
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  summary: string;
  animation: string;
  icon: string;
  description: string[];
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  slug: string;
  name: string;
  summary: string;
  features: string[];
  image: string;
  gitLink: string;
  demoLink: string;
  techStack: string[];
}
