"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CITIES = ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Other"];

const PLANS = [
  "Digital — ₹1,999 / month",
  "Essential — ₹7,999 / month",
  "Signature — ₹9,999 / month",
  "Not sure yet",
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  otherCity: string;
  plan: string;
}

export default function BookingForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    city: "",
    otherCity: "",
    plan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city === "Other" ? form.otherCity : form.city,
          plan: form.plan,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-border bg-transparent px-4 py-3 text-sm text-ink placeholder-muted focus:outline-none focus:border-ink transition-colors";

  return (
    <section id="reserve" className="px-6 md:px-12 py-20 md:py-32 border-t border-border">
      <div className="mb-12 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-4">
          Reserve your session.
          <br />
          No payment required.
        </h2>
        <p className="text-sm text-muted max-w-sm leading-relaxed">
          Pick your city. We will reach out within 24 hours to confirm your archivist session.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg"
          >
            <p className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] mb-6">
              Reserved.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-2">
              We have received your request for{" "}
              <span className="text-ink font-medium">
                {form.city === "Other" ? form.otherCity : form.city}
              </span>
              .
            </p>
            <p className="text-muted text-sm leading-relaxed mb-2">
              Our team will confirm your session date within 24 hours.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              You will not be charged anything before your session.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 max-w-3xl"
          >
            {/* City selector */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-muted mb-4">
                Select your city
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, city }))}
                    className={`px-4 py-3.5 text-sm tracking-wide border transition-colors duration-150 text-left ${
                      form.city === city
                        ? "border-accent bg-accent text-white"
                        : "border-border text-ink hover:border-ink"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
              {form.city === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3"
                >
                  <input
                    type="text"
                    placeholder="Your city"
                    value={form.otherCity}
                    onChange={(e) => setForm((f) => ({ ...f, otherCity: e.target.value }))}
                    className={inputClass}
                  />
                </motion.div>
              )}
            </div>

            {/* Form fields */}
            <AnimatePresence>
              {form.city && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="grid md:grid-cols-2 gap-3"
                >
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile number"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={inputClass}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={`${inputClass} md:col-span-2`}
                  />
                  <select
                    required
                    value={form.plan}
                    onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
                    className={`${inputClass} md:col-span-2 cursor-pointer`}
                  >
                    <option value="" disabled>Plan you are considering</option>
                    {PLANS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={!form.city || loading}
              className="self-start text-sm tracking-[0.12em] uppercase bg-accent text-white px-10 py-4 hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Reserving..." : "Reserve Session"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
