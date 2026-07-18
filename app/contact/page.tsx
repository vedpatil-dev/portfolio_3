"use client";

import React, { useState } from "react";
import MapShell from "@/src/components/layout/MapShell";
import socialData from "@/src/data/content/social.json";
import { Mail, Send, CheckCircle } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <MapShell>
      <section className="map-section px-4 py-12 md:py-16" aria-labelledby="contact-title">
        <div className="max-w-2xl w-full mx-auto space-y-10">

          {/* Chapter header */}
          <div className="text-center">
            <p className="font-handwritten text-sm text-ink-faded tracking-widest mb-2 opacity-70">
              Chapter VI
            </p>
            <h1 id="contact-title" className="chapter-header text-3xl md:text-4xl">
              Contact
            </h1>
            <div className="chapter-divider w-40 mx-auto mt-2" />
            <p className="font-handwritten text-base text-ink-faded italic mt-2 opacity-80">
              Let&apos;s work together
            </p>
          </div>

          {/* Contact card */}
          <div className="map-content-card p-6 md:p-10">
            {sent ? (
              /* Success state */
              <div className="text-center py-8 space-y-4 animate-fade-in">
                <CheckCircle className="w-12 h-12 text-green-700 mx-auto" aria-hidden="true" />
                <h2 className="font-display text-2xl text-leather">Message Sent!</h2>
                <p className="font-handwritten text-base text-ink-faded italic">
                  Your message is on its way. I&apos;ll get back to you soon.
                </p>
                <p className="font-handwritten text-sm text-ink-faded/60 italic">
                  ~ &ldquo;Mischief Managed.&rdquo; ~
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-5 py-2 font-handwritten text-sm text-ink-faded border border-parchment-dark/30 hover:border-gold hover:text-leather rounded-sm transition-all duration-300"
                >
                  ← Send another message
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="font-handwritten text-base font-bold text-leather-light">
                        Your name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Full name"
                        className="w-full bg-transparent border-b border-dashed border-parchment-dark/40 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5 transition-colors"
                        style={{ caretColor: "var(--blood-ink)" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="font-handwritten text-base font-bold text-leather-light">
                        Your email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="email@example.com"
                        className="w-full bg-transparent border-b border-dashed border-parchment-dark/40 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5 transition-colors"
                        style={{ caretColor: "var(--blood-ink)" }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="font-handwritten text-base font-bold text-leather-light">
                      Your message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="What would you like to discuss?"
                      className="w-full bg-transparent border border-dashed border-parchment-dark/30 focus:border-blood-ink focus:outline-none font-handwritten text-base text-blood-ink p-2 resize-none transition-colors rounded-sm"
                      style={{
                        caretColor: "var(--blood-ink)",
                        background: "rgba(214,189,137,0.3)",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="font-handwritten text-sm text-ink-faded italic opacity-60">
                      ~ I usually respond within 24 hours ~
                    </p>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 font-display text-sm tracking-wider border-2 border-blood-ink text-blood-ink hover:bg-blood-ink hover:text-parchment-light rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>

                {/* Social links */}
                <div className="mt-8 pt-5 border-t border-dashed border-parchment-dark/25 text-center">
                  <p className="font-handwritten text-xs uppercase tracking-widest text-ink-faded opacity-60 mb-3">
                    Or reach me directly
                  </p>
                  <div className="flex flex-wrap justify-center gap-5">
                    <a
                      href={socialData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-handwritten text-sm text-ink-faded hover:text-leather transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4 shrink-0" />
                      <span>{socialData.github.replace("https://", "")}</span>
                    </a>
                    <a
                      href={socialData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-handwritten text-sm text-ink-faded hover:text-leather transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 shrink-0" />
                      <span>{socialData.linkedin.replace("https://", "")}</span>
                    </a>
                    <a
                      href={`mailto:${socialData.email}`}
                      className="flex items-center gap-1.5 font-handwritten text-sm text-ink-faded hover:text-leather transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>{socialData.email}</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </section>
    </MapShell>
  );
}
