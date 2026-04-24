import { ArrowUpRight, ArrowDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ContactForm } from "./ContactForm"
import { Experience } from "./Experience"

function LinkButton({ href, label, newTab = false }: { href: string; label: string; newTab?: boolean }) {
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-center gap-2 border border-foreground px-5 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background whitespace-nowrap"
    >
      {label}
      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

export function BusinessCard() {
  const [panel, setPanel] = useState<"experience" | "contact" | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  function toggle(name: "experience" | "contact") {
    setPanel((prev) => (prev === name ? null : name))
  }

  const isOpen = panel === "experience"
  const isContactOpen = panel === "contact"

  useEffect(() => {
    if (panel !== null) {
      const timer = setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [panel])

  return (
    <article className="border-x border-b border-foreground bg-background/40 backdrop-blur-[1px]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">

        {/* Photo */}
        <div className="border-b border-foreground lg:border-b-0 lg:border-r">
          <div className="aspect-[3/2] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden bg-foreground/10">
            <img
              src="/photo.jpeg"
              alt="Todor Stanev"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between gap-12 p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col gap-8">
            <div aria-hidden className="h-[4px] w-20" style={{ backgroundColor: "#DB4A2B" }} />
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.18em] text-foreground/40">
              Automation Specialist & Business Analyst
            </p>
            <h1
              className="font-display font-bold uppercase leading-[0.82] tracking-[0.02em] text-foreground"
              style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)" }}
            >
              Todor<br />Stanev
            </h1>
            <p className="font-sans text-lg leading-snug text-foreground/70 max-w-sm">
              Six years delivering automation and process improvement in healthcare. Interested in building things, design, and the intersection of the two.{" "}
              Got a project in mind?{" "}
              <button
                onClick={() => toggle("contact")}
                className="underline underline-offset-2 transition-colors hover:text-[#DB4A2B]"
              >
                Get in touch.
              </button>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <LinkButton href="https://blog.tstanev.com" label="Life" />
            <button
              onClick={() => toggle("experience")}
              className="group flex items-center justify-center gap-2 border border-foreground px-5 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-foreground hover:text-background whitespace-nowrap"
            >
              Experience
              <ArrowDown
                size={14}
                className="shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable panels */}
      {isOpen && (
        <div ref={panelRef} className="border-t border-foreground">
          <div className="p-8 sm:p-12 lg:p-16">
            <Experience />
          </div>
        </div>
      )}
      {isContactOpen && (
        <div ref={panelRef} className="border-t border-foreground">
          <div className="p-8 sm:p-12 lg:p-16">
            <ContactForm />
          </div>
        </div>
      )}
    </article>
  )
}
