"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    setLoading(false);

    if (error) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/15 px-5 py-4 text-white text-sm placeholder-white/35 focus:outline-none focus:border-accent focus:bg-white/8 transition-all duration-300 rounded-none";

  return (
    <section id="contact" className="bg-[#0d0d0d] py-32">
      <div className="max-w-[860px] mx-auto px-6 md:px-12">

        <div className="mb-14">
          <p className="text-accent text-[10px] font-semibold tracking-[0.4em] uppercase mb-4">Get In Touch</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold">Contact Us</h2>
        </div>

        {submitted ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 bg-accent flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-brand-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold mb-2">Message sent.</p>
            <p className="text-white/50 text-sm">We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-xs font-semibold tracking-widest uppercase mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-white text-xs font-semibold tracking-widest uppercase mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-xs font-semibold tracking-widest uppercase mb-2">Subject</label>
              <input
                type="text"
                required
                placeholder="What is this regarding?"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-white text-xs font-semibold tracking-widest uppercase mb-2">Additional Info</label>
              <textarea
                rows={6}
                placeholder="Tell us more..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-14 py-4 bg-white text-brand-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
