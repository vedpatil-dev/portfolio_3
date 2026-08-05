import MapShell from "@/src/components/layout/MapShell";
import socialData from "@/src/data/content/social.json";
import { Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import ContactForm from "@/src/components/contact/ContactForm";
import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ved Patil | Full Stack Developer",
  description:
    "Get in touch with Ved Patil for full-stack software development collaborations, engineering opportunities, or inquiries.",
  alternates: {
    canonical: "https://vedpatil.in/contact",
  },
};

export default function ContactPage() {
  return (
    <MapShell>
      <section className="map-section px-4 animate-map-fade-in" aria-labelledby="contact-title">
        <div className="max-w-7xl w-full mx-auto space-y-10">

          {/* Chapter header */}
          <div className="text-center">
            <p className="chapter-number">
              Chapter V
            </p>
            <h1 id="contact-title" className="chapter-header text-3xl md:text-4xl">
              Contact
            </h1>
            <div className="chapter-divider w-40 mx-auto mt-2" />
            <div className="mt-2 flex justify-center w-full">
              <InteractiveParagraph
                text="Let's work together"
                fontClass="font-handwritten text-base text-ink-faded italic text-center"
                fontSpec="16px Caveat, cursive"
                lineHeight={22}
              />
            </div>
          </div>

          {/* Contact card */}
          <div className="map-content-card p-6 md:p-10">
            {/* Client-side form for submission handling */}
            <ContactForm />

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
          </div>

        </div>
      </section>
    </MapShell>
  );
}
