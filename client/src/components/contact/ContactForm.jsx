import { useState } from "react";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setValues({ name: "", email: "", message: "" });
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-[#0c0718]/90 p-8 shadow-2xl shadow-black/30">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-indigo-300/80">Contact</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            Let’s start your next project.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Tell us about your goals and we’ll recommend a tailored creative solution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-white/70">
              Name
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10"
              />
            </label>
            <label className="space-y-2 text-sm text-white/70">
              Email
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-white/70">
            Message
            <textarea
              name="message"
              rows="5"
              value={values.message}
              onChange={handleChange}
              required
              className="w-full rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10"
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-indigo-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#09040d] transition hover:-translate-y-0.5 hover:bg-indigo-300"
            >
              Send message
            </button>
            {submitted ? (
              <p className="text-sm text-emerald-300">Message queued. We’ll be back to you soon.</p>
            ) : (
              <p className="text-sm text-white/50">Response typically within 24 hours.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
