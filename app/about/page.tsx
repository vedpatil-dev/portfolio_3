"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "lucide-react";
import { owl } from "@lucide/lab";
import Diary from "@/src/components/diary/Diary";
import profileData from "@/src/data/content/profile.json";
import aboutData from "@/src/data/content/about.json";
import skillsData from "@/src/data/content/skills.json";
import socialData from "@/src/data/content/social.json";

function AboutPageContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "about";

  // Render the active section based on the query parameter
  const renderRightPageContent = () => {
    switch (section) {
      case "education":
        return (
          <div className="space-y-6 animate-fade-in select-text">
            <h3 className="font-display text-2xl text-leather border-b border-double border-parchment-dark/30 pb-2">
              Chapter I: Chronology of Learning
            </h3>
            
            <div className="space-y-6">
              {aboutData.education.map((edu, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-parchment-dark/30">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-blood-ink border border-ink" />
                  
                  <div className="space-y-1">
                    <span className="font-handwritten text-lg text-blood-ink font-semibold">
                      {edu.duration}
                    </span>
                    <h4 className="font-display text-lg text-leather-light font-bold">
                      {edu.degree}
                    </h4>
                    <p className="font-serif text-sm text-ink-faded font-medium">
                      {edu.institution}
                    </p>
                    <p className="font-serif text-sm text-ink-faded leading-relaxed pt-1">
                      {edu.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="font-handwritten text-xl text-blood-ink text-center pt-4">
              ~ Scholars are built through time and ink.
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6 animate-fade-in select-text">
            <h3 className="font-display text-2xl text-leather border-b border-double border-parchment-dark/30 pb-2">
              Chapter I: The Arcane Library (Skills)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsData.categories.map((cat, idx) => (
                <div key={idx} className="bg-[#c5a671]/15 border border-parchment-dark/20 rounded p-3.5 space-y-2">
                  <h4 className="font-display text-sm font-bold text-blood-ink tracking-wider border-b border-dotted border-parchment-dark/30 pb-1 uppercase">
                    {cat.name}
                  </h4>
                  <ul className="space-y-1 text-sm font-serif text-ink-faded">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span className="text-[#967331]">★</span>
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <a
                href={profileData.resumeUrl}
                download
                className="inline-block px-4 py-2 font-display text-sm text-leather bg-gold/30 hover:bg-gold/80 border border-gold/60 rounded shadow transition-all duration-300 hover:-translate-y-0.5 cursor-pointer font-bold"
              >
                📜 Summon Resume Scroll
              </a>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6 animate-fade-in select-text">
            <h3 className="font-display text-2xl text-leather border-b border-double border-parchment-dark/30 pb-2">
              Send an Owl (Contact)
            </h3>

            <p className="font-serif text-sm text-ink-faded leading-relaxed">
              If you wish to collaborate, offer an opportunity, or exchange ideas, write your message into the fields below and send it.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("The owl has taken flight with your message!");
              }} 
              className="space-y-4 font-serif text-sm text-ink"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="font-handwritten text-base font-bold text-leather-light">My Name is:</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-dashed border-parchment-dark/50 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="font-handwritten text-base font-bold text-leather-light">My Email is:</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full bg-transparent border-b border-dashed border-parchment-dark/50 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="font-handwritten text-base font-bold text-leather-light">I wish to say:</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full bg-transparent border-b border-dashed border-parchment-dark/50 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5 resize-none"
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 font-display text-sm text-[#d6bd89] bg-blood-ink hover:bg-blood-ink/80 border border-ink rounded transition-all duration-300 font-bold tracking-wider cursor-pointer"
                >
                  <Icon iconNode={owl} className="w-5 h-5 shrink-0" />
                  <span>Send Owl</span>
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-dashed border-parchment-dark/30 text-center text-sm font-handwritten text-ink-faded space-y-1">
              <div>
                <span className="font-bold text-leather-light">GitHub: </span>
                <a href={socialData.github} target="_blank" rel="noopener noreferrer" className="hover:text-blood-ink hover:underline">
                  {socialData.github.replace("https://", "")}
                </a>
              </div>
              <div>
                <span className="font-bold text-leather-light">LinkedIn: </span>
                <a href={socialData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blood-ink hover:underline">
                  {socialData.linkedin.replace("https://", "")}
                </a>
              </div>
              <div>
                <span className="font-bold text-leather-light">Email: </span>
                <a href={`mailto:${socialData.email}`} className="hover:text-blood-ink hover:underline">
                  {socialData.email}
                </a>
              </div>
            </div>
          </div>
        );

      case "about":
      default:
        return (
          <div className="space-y-6 animate-fade-in select-text">
            <h3 className="font-display text-2xl text-leather border-b border-double border-parchment-dark/30 pb-2">
              Chapter I: The Author
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Profile Image Initials circle */}
              <div className="w-20 h-20 rounded-full border border-parchment-dark/30 bg-parchment/30 flex items-center justify-center font-display text-2xl text-blood-ink font-bold shrink-0 shadow-inner">
                {profileData.initials}
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-display text-xl text-leather font-bold">
                  {profileData.name}
                </h4>
                <p className="font-handwritten text-lg text-gold/90 font-medium">
                  {profileData.title}
                </p>
                <p className="font-serif text-sm text-ink-faded leading-relaxed text-justify">
                  {aboutData.summary}
                </p>
              </div>
            </div>

            <div className="border-t border-parchment-dark/20 pt-4 space-y-3">
              <h5 className="font-display text-sm font-bold text-leather-light tracking-wide uppercase">
                Status of Availability
              </h5>
              <div className="flex items-center gap-2 text-sm font-serif">
                <span className={`w-2.5 h-2.5 rounded-full ${profileData.availableForWork ? "bg-green-700 animate-pulse" : "bg-zinc-500"} border border-ink`} />
                <span className="text-ink-faded">
                  {profileData.availableForWork ? "Available for contracts & projects" : "Engaged in secret projects"}
                </span>
              </div>
            </div>

            <div className="font-handwritten text-xl text-blood-ink text-center pt-2">
              ~ The scroll of writing is never full.
            </div>
          </div>
        );
    }
  };

  return (
    <Diary
      activeChapter="about"
      rightPageContent={renderRightPageContent()}
    />
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#100b08] flex items-center justify-center font-handwritten text-2xl text-[#d6bd89]">
        Summoning Chapter I...
      </div>
    }>
      <AboutPageContent />
    </Suspense>
  );
}
