import { Analytics } from "@vercel/analytics/react"
import { Moon, Sun } from "lucide-react"
import { GradientBlobs } from "./components/GradientBlobs"
import { BusinessCard } from "./components/BusinessCard"
import { useDarkMode } from "./hooks/useDarkMode"

export default function App() {
  const { dark, toggle } = useDarkMode()

  return (
    <div className="min-h-screen relative flex flex-col">
      <GradientBlobs />

      <header className="border-b border-foreground px-8 py-4 sm:py-14 flex items-center justify-end">
        <button
          type="button"
          onClick={toggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="text-foreground/40 transition-colors hover:text-accent"
        >
          {dark ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
        </button>
      </header>

      <div className="mx-auto max-w-6xl w-full px-6 sm:px-10 pb-16 sm:pb-20 animate-slide-up">
        <BusinessCard />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-foreground px-8 py-2.5 bg-background/60 backdrop-blur-sm z-10 flex items-center">
        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-foreground/40">
          © {new Date().getFullYear()} · Todor Stanev
        </p>
      </footer>
      <Analytics />
    </div>
  )
}
