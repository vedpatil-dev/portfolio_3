"use client";

import React, { Suspense } from "react";
import { Icon } from "lucide-react";
import { owl } from "@lucide/lab";
import Diary from "@/src/components/diary/Diary";
import socialData from "@/src/data/content/social.json";

function ContactPageContent() {
  const rightPageContent = (
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
        className="space-y-2 font-serif text-sm text-ink"
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
            rows={1}
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

  return (
    <Diary
      activeChapter="contact"
      rightPageContent={rightPageContent}
      initialHasWritten={true}
    />
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#100b08] flex items-center justify-center font-handwritten text-2xl text-[#d6bd89]">
        Summoning Owlery...
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
