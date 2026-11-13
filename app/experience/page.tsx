import MapShell from "@/src/components/layout/MapShell";
import ChapterHeader from "@/src/components/layout/ChapterHeader";
import Image from "next/image";
import experienceData from "@/src/data/content/experience.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Ved Patil — Full Stack Developer",
  description:
    "Explore the professional experience, software development roles, and full stack engineering history of Ved Patil at Emgage HRMS, Tech Elecon, 1M1B Foundation, and AICTE + EY.",
  alternates: {
    canonical: "https://vedpatil.in/experience",
  },
};

export default function ExperiencePage() {
  const entries = experienceData.entries;

  return (
    <MapShell>
      <section className="page-container pb-12" aria-labelledby="exp-title">
        <ChapterHeader
          id="exp-title"
          chapter="Chapter II"
          title="My Journey"
          subtitle="A winding path through professional milestones"
        />

        {/* Why: one clean vertical route on every breakpoint (the old winding SVG hurt readability and the
            hover-only accordion hid content on touch). Impact: dates on the left, milestone cards on the right,
            all responsibilities always visible. */}
        <ol className="relative mt-10 space-y-10 md:space-y-12">
          <span className="route-line" aria-hidden="true" />
          {entries.map((entry, idx) => {
            const isIntern = /intern/i.test(entry.role);
            // The full-time role directly follows the Emgage internship — surface that progression explicitly.
            const nextIsIntern = idx === 0 && /intern/i.test(entries[1]?.role ?? "");
            return (
              <li key={entry.id} id={entry.id} className="relative pl-14 md:pl-0 md:grid md:grid-cols-[10rem_1fr] md:gap-x-[5.5rem] scroll-mt-28 reveal">
                <div className="md:text-right md:pt-2 mb-2 md:mb-0">
                  <p className="font-sans font-semibold text-blood-ink text-[0.95rem]">{entry.duration}</p>
                  <span className={`badge mt-1 ${isIntern ? "" : "badge-solid"}`}>{isIntern ? "Internship" : "Full-time"}</span>
                </div>

                <span className="absolute left-0 md:left-[10.875rem] top-0 md:top-1 w-11 h-11 rounded-full border-2 border-rust/60 bg-parchment-light shadow-md flex items-center justify-center overflow-hidden z-10">
                  {/* Why: Next flagged the first timeline logo as the LCP image; eager-load it. Impact: no lazy-load delay for it. */}
                  <Image src={entry.icon} alt="" width={40} height={40} priority={idx === 0} className="object-contain" />
                </span>

                <article className="artifact-card p-5 md:p-6">
                  <p className="eyebrow">Checkpoint {String(entries.length - idx).padStart(2, "0")}</p>
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-leather mt-1 leading-snug">{entry.role}</h2>
                  <p className="font-medium text-ink-faded">{entry.company}</p>
                  {nextIsIntern && (
                    <p className="mt-2 text-sm font-semibold text-blood-ink">↑ Moved from internship to full-time at this company</p>
                  )}
                  <p className="prose-map prose-map-soft mt-3">{entry.summary}</p>

                  <h3 className="eyebrow mt-5 mb-2">Responsibilities &amp; contributions</h3>
                  <ul className="space-y-2">
                    {entry.description.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-[0.95rem] text-ink leading-relaxed">
                        <span className="text-gold-text shrink-0" aria-hidden="true">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="eyebrow mt-5 mb-2">Technologies</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {entry.skills.map((s) => <li key={s} className="skill-tag">{s}</li>)}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>

        <p className="text-center font-handwritten text-xl text-ink-faded italic mt-12">
          ~ The journey continues. “After all this time? Always.” ~
        </p>
      </section>
    </MapShell>
  );
}
