import { useForm, ValidationError } from "@formspree/react"

export function ContactForm() {
  const [state, handleSubmit] = useForm("mvzddgea")

  if (state.succeeded) {
    return (
      <p className="font-sans text-sm text-foreground/70">
        Message sent — I'll be in touch soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          <ValidationError field="name" prefix="Name" errors={state.errors} className="font-sans text-xs text-[#DB4A2B]" />
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
          <ValidationError field="email" prefix="Email" errors={state.errors} className="font-sans text-xs text-[#DB4A2B]" />
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
        <ValidationError field="message" prefix="Message" errors={state.errors} className="font-sans text-xs text-[#DB4A2B]" />
      </div>

      <ValidationError errors={state.errors} className="font-sans text-xs text-[#DB4A2B]" />

      <button
        type="submit"
        disabled={state.submitting}
        className="self-start border border-foreground px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
      >
        {state.submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
