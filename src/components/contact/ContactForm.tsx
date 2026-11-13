"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Why: error styling must not depend on message wording ("Failed" substring).
  const [isError, setIsError] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Load remaining cooldown on mount
  useEffect(() => {
    // Why: localStorage can throw (private mode / blocked storage); the form must still render.
    let expiryStr: string | null = null;
    try {
      expiryStr = localStorage.getItem("owl_cooldown_expiry");
    } catch {}
    if (expiryStr) {
      const expiry = parseInt(expiryStr, 10);
      const remaining = Math.ceil((expiry - Date.now()) / 1000);
      if (remaining > 0) {
        setCooldown(remaining);
      }
    }
  }, []);

  // Tick down cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Why: storage failures must not turn a delivered message into a "Failed" error.
  const saveCooldown = (seconds: number) => {
    try {
      localStorage.setItem("owl_cooldown_expiry", (Date.now() + seconds * 1000).toString());
    } catch {}
    setCooldown(seconds);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || cooldown > 0) return;

    setIsError(false);
    setStatus("Sending...");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Why: error bodies may be non-JSON (e.g. proxy 502 HTML); don't let parsing skip the 429 cooldown.
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        saveCooldown(60);

        setStatus("Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
        setSent(true);
      } else {
        // Set rate-limit cooldown (180 seconds) if 429 received
        if (response.status === 429) saveCooldown(180);
        setIsError(true);
        setStatus(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setIsError(true);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Why: restyled with the shared .field/.btn primitives (readable Inter inputs, 44px targets, visible focus)
  // and an aria-live status region. Impact: submit/cooldown/error logic above is unchanged.
  if (sent) {
    return (
      <div className="text-center py-8 space-y-4 animate-fade-in" role="status">
        <CheckCircle className="w-12 h-12 text-verdigris mx-auto" aria-hidden="true" />
        <h2 className="font-serif text-2xl font-semibold text-leather">Message sent</h2>
        <p className="prose-map prose-map-soft">
          Your owl has reached its destination. I&apos;ll get back to you soon.
        </p>
        <p className="font-handwritten text-xl text-ink-faded italic">~ &ldquo;Mischief Managed.&rdquo; ~</p>
        <button
          onClick={() => {
            setSent(false);
            setStatus("");
          }}
          className="btn btn-secondary mt-2"
        >
          ← Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-sm font-semibold text-leather">Your name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="field"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-sm font-semibold text-leather">Your email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="field"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-sm font-semibold text-leather">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="I would like to speak about..."
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="field resize-y leading-relaxed"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <button type="submit" disabled={isSubmitting || cooldown > 0} className="btn btn-primary">
          <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            {isSubmitting ? "Sending..." : cooldown > 0 ? `Owl Resting (${cooldown}s)` : "Send the Owl"}
          </span>
        </button>

        {/* Always mounted so screen readers announce status/error changes */}
        <p
          role={isError ? "alert" : "status"}
          aria-live="polite"
          className={`text-sm font-medium ${isError ? "text-blood-ink" : "text-ink-faded"}`}
        >
          {status && !sent ? status : ""}
        </p>
      </div>
    </form>
  );
}
