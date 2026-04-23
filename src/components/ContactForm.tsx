import { useState } from "react"

// Sign up free at formspree.io, create a form, paste the ID here.
const FORMSPREE_ID = "YOUR_FORM_ID"

type Status = "idle" | "sending" | "sent" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      })
      setStatus(res.ok ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <p className="font-sans text-sm text-foreground/70">
        Message sent — I'll be in touch soon.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground/50">
            Name
          </label>
          <input
            name="name"
            required
            autoComplete="name"
            className="border border-foreground bg-transparent px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground/50">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="border border-foreground bg-transparent px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground/50">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="resize-none border border-foreground bg-transparent px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground"
          placeholder="Tell me about your project…"
        />
      </div>

      {status === "error" && (
        <p className="font-sans text-xs text-[#DB4A2B]">
          Something went wrong — please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start border border-foreground px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
