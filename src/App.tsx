import { Analytics } from "@vercel/analytics/react"
import { Moon, Sun } from "lucide-react"
import { Routes, Route } from "react-router-dom"
import { GradientBlobs } from "./components/GradientBlobs"
import { BusinessCard } from "./components/BusinessCard"
import { NotFoundPage } from "./components/NotFoundPage"
import { useDarkMode } from "./hooks/useDarkMode"

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl w-full px-6 sm:px-10 animate-slide-up">
      <BusinessCard />
    </div>
  )
}

export default function App() {
  const { dark, toggle } = useDarkMode()

  return (
    <div className="min-h-dvh relative flex flex-col">
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

      <main className="flex flex-1 items-start pb-6 sm:pb-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="border-t border-foreground px-8 py-2.5 bg-background/60 backdrop-blur-sm flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-foreground/40">
          © {new Date().getFullYear()} · Todor Stanev
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {(
            [
              ["GitHub", "https://github.com/stanevt"],
              ["Work", "https://work.tstanev.com"],
              ["Blog", "https://blog.tstanev.com"],
              ["Privacy", "https://blog.tstanev.com/privacy"],
              ["Cookies", "https://blog.tstanev.com/cookies"],
            ] as [string, string][]
          ).map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-foreground/40 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </footer>
      <Analytics />
    </div>
  )
}
