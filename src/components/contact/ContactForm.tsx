"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

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

      const data = await response.json();

      if (response.ok) {
        setStatus("Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
        setSent(true);
      } else {
        setStatus(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8 space-y-4 animate-fade-in">
        <CheckCircle className="w-12 h-12 text-green-700 mx-auto" aria-hidden="true" />
        <h2 className="font-display text-2xl text-leather">Message Sent!</h2>
        <p className="font-handwritten text-base text-ink-faded italic">
          Your message has flown safely to its destination. I&apos;ll get back to you soon.
        </p>
        <p className="font-handwritten text-sm text-ink-faded/60 italic">
          ~ &ldquo;Mischief Managed.&rdquo; ~
        </p>
        <button
          onClick={() => {
            setSent(false);
            setStatus("");
          }}
          className="mt-4 px-5 py-2 font-handwritten text-sm text-ink-faded border border-parchment-dark/30 hover:border-gold hover:text-leather rounded-sm transition-all duration-300 cursor-pointer"
        >
          ← Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label htmlFor="contact-name" className="font-handwritten text-base font-bold text-leather-light">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full bg-transparent border-b border-dashed border-parchment-dark/40 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5 transition-colors disabled:opacity-50"
            style={{ caretColor: "var(--blood-ink)" }}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-email" className="font-handwritten text-base font-bold text-leather-light">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full bg-transparent border-b border-dashed border-parchment-dark/40 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink px-1 py-0.5 transition-colors disabled:opacity-50"
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
          name="message"
          required
          rows={5}
          placeholder="I would like to speak about..."
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full bg-transparent border border-dashed border-parchment-dark/40 focus:border-blood-ink focus:outline-none font-handwritten text-lg text-blood-ink p-3 rounded-sm transition-colors resize-none leading-relaxed disabled:opacity-50"
          style={{
            background: "rgba(214,189,137,0.3)",
            caretColor: "var(--blood-ink)",
          }}
        />
      </div>

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3.5 font-display text-sm tracking-wider text-leather border-2 border-parchment-dark/70 hover:border-gold rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 mx-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: "rgba(150, 115, 49, 0.35)" }}
        >
          <Send className="w-4 h-4 shrink-0" />
          <span>{isSubmitting ? "Sending..." : "Send the Owl"}</span>
        </button>

        {status && !sent && (
          <p className={`font-handwritten text-sm mt-3 ${status.includes("Failed") ? "text-blood-ink" : "text-ink-faded"}`}>
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
