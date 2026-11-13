"use client";

import { useRef, useState, type ReactNode } from "react";
import { FileText, Download, X } from "lucide-react";

interface ResumeButtonProps {
  url: string;
  className?: string;
  children?: ReactNode;
}

// Why: the resume used to open as a bare link / new tab. Impact: it opens in an in-page modal (native <dialog>:
// focus trap, Esc to close, inert background) with a Download action. The PDF iframe is only mounted while open,
// so it costs nothing on first load. Mobile browsers that can't render PDFs inline get the fallback link.
export default function ResumeButton({ url, className = "btn btn-primary", children }: ResumeButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const hide = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" onClick={show} className={className}>
        <FileText className="w-4 h-4" aria-hidden="true" />
        {children ?? "View Resume"}
      </button>

      <dialog
        ref={dialogRef}
        className="resume-dialog"
        aria-label="Resume"
        onClose={() => setOpen(false)}
        // Clicking the dimmed backdrop (the dialog element itself) closes it.
        onClick={(e) => { if (e.target === dialogRef.current) hide(); }}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-parchment-dark/50">
          <h2 className="font-display text-2xl text-leather">Resume</h2>
          <div className="flex items-center gap-2">
            <a href={url} download className="btn btn-secondary !min-h-9 !py-1">
              <Download className="w-4 h-4" aria-hidden="true" /> Download
            </a>
            <button type="button" onClick={hide} className="btn btn-primary !min-h-9 !px-2 !py-1" aria-label="Close resume">
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        {open && (
          <iframe src={`${url}#view=FitH`} title="Ved Patil resume (PDF)" className="w-full flex-1 bg-white">
            <a href={url}>Open the resume PDF</a>
          </iframe>
        )}
      </dialog>
    </>
  );
}
