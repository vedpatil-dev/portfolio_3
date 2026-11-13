import MapShell from "@/src/components/layout/MapShell";
import ChapterHeader from "@/src/components/layout/ChapterHeader";
import socialData from "@/src/data/content/social.json";
import profileData from "@/src/data/content/profile.json";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import ContactForm from "@/src/components/contact/ContactForm";
import { LOCATION } from "@/src/lib/location";

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
  const channels = [
    { href: socialData.github, label: "GitHub", value: socialData.github.replace("https://", ""), Icon: Github, external: true },
    { href: socialData.linkedin, label: "LinkedIn", value: socialData.linkedin.replace("https://", ""), Icon: Linkedin, external: true },
  ];

  return (
    <MapShell>
      <section className="page-container pb-12" aria-labelledby="contact-title">
        <ChapterHeader id="contact-title" chapter="Chapter IV" title="The Owl Post" subtitle="Let's work together" />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 mt-8 items-start">
          {/* Direct channels */}
          <div className="space-y-5">
            {profileData.availableForWork && (
              <p className="badge badge-solid">Open to opportunities</p>
            )}
            <p className="font-serif text-2xl md:text-3xl text-leather leading-snug">
              The quickest way to reach me is a plain email.
            </p>
            <a href={`mailto:${socialData.email}`} className="btn btn-primary w-full sm:w-auto">
              <Mail className="w-4 h-4" aria-hidden="true" /> {socialData.email}
            </a>
            <ul className="space-y-3 pt-2">
              {channels.map(({ href, label, value, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="map-note flex items-center gap-3 no-underline hover:border-gold transition-colors">
                    <Icon className="w-5 h-5 text-blood-ink shrink-0" aria-hidden="true" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-leather">{label}</span>
                      <span className="block text-sm text-ink-faded truncate">{value}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-ink-faded" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-handwritten text-xl text-ink-faded">Posted from {LOCATION.city}, {LOCATION.country}</p>
          </div>

          {/* Form */}
          <div className="map-content-card p-6 md:p-8">
            <h2 className="section-title mb-1">Send an owl</h2>
            <p className="prose-map prose-map-soft mb-5 text-[0.95rem]">Tell me a little about what you have in mind.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </MapShell>
  );
}
