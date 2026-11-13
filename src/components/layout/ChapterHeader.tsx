import InteractiveParagraph from "@/src/components/text/InteractiveParagraph";

// Why: every inner page hand-rolled the same chapter label + title + divider + subtitle (and used a canvas
// paragraph for the subtitle). Impact: one server component keeps hierarchy consistent and the subtitle selectable.
interface ChapterHeaderProps {
  chapter?: string;
  title: string;
  subtitle?: string;
  id: string;
}

export default function ChapterHeader({ chapter, title, subtitle, id }: ChapterHeaderProps) {
  return (
    <header className="text-center pt-4 md:pt-6">
      {chapter && <p className="chapter-number">{chapter}</p>}
      <h1 id={id} className="chapter-header text-4xl md:text-5xl">
        {title}
      </h1>
      <div className="chapter-divider w-48 mx-auto mt-3" aria-hidden="true" />
      {subtitle && (
        // Why: the dragon used to push these words around; restored after the redesign dropped it.
        <InteractiveParagraph
          text={subtitle}
          className="justify-center text-center max-w-xl mx-auto"
          fontClass="font-handwritten text-xl text-ink-faded italic"
          fontSpec="20px Caveat, cursive"
        />
      )}
    </header>
  );
}
