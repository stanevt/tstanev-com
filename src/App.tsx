import { Analytics } from "@vercel/analytics/react"
import { Moon, Sun } from "lucide-react"
import { animateView } from "motion"
import { useRef, type MouseEvent as ReactMouseEvent } from "react"
import { Routes, Route } from "react-router-dom"
import { GradientBlobs } from "./components/GradientBlobs"
import { BusinessCard } from "./components/BusinessCard"
import { NotFoundPage } from "./components/NotFoundPage"
import { useDarkMode } from "./hooks/useDarkMode"

const THEME_VIEW_TRANSITION_DURATION = 0.42

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl w-full px-6 sm:px-10 animate-slide-up">
      <BusinessCard />
    </div>
  )
}

export default function App() {
  const { dark, toggle } = useDarkMode()
  const themeInkDropActiveRef = useRef(false)

  function handleThemeToggle(event: ReactMouseEvent<HTMLButtonElement>) {
    if (themeInkDropActiveRef.current) return

    // The ink-drop geometry is computed in layout-viewport pixels; under pinch
    // zoom the visible area is an offset, scaled crop of that, so the circle
    // would originate from the wrong place and mis-cover the screen. Fall back
    // to a plain theme swap when zoomed (or when reduced motion is requested).
    const zoomed = (window.visualViewport?.scale ?? 1) > 1.01
    if (
      zoomed ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof document.startViewTransition !== "function"
    ) {
      toggle()
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const farthestX = Math.max(x, window.innerWidth - x)
    const farthestY = Math.max(y, window.innerHeight - y)
    const radius = Math.ceil(Math.hypot(farthestX, farthestY) + 96)
    themeInkDropActiveRef.current = true
    // Expose the circle centre so CSS can clip the incoming layer to circle(0)
    // for its very first paint — otherwise the browser paints the new theme's
    // snapshot full-screen for one frame before Motion's animation commits,
    // which is the toggle flash. See index.css [data-theme-transition].
    const root = document.documentElement
    root.style.setProperty("--vt-x", `${x}px`)
    root.style.setProperty("--vt-y", `${y}px`)
    root.dataset.themeTransition = "active"

    const releaseThemeTransition = () => {
      delete root.dataset.themeTransition
      root.style.removeProperty("--vt-x")
      root.style.removeProperty("--vt-y")
      themeInkDropActiveRef.current = false
    }

    const transition = animateView(toggle, {
      duration: THEME_VIEW_TRANSITION_DURATION,
      ease: [0.76, 0, 0.24, 1],
      interrupt: "immediate",
    })

    // Both directions grow the incoming theme in on top, from circle(0) → full.
    // The new layer is always on top (z-index) and always guarded by the
    // first-paint circle(0) clip, so neither direction can flash — in
    // particular dark->light no longer reveals a fully-painted layer from
    // behind (the mobile-Safari "content refresh" blink).
    const growth = transition.new(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: THEME_VIEW_TRANSITION_DURATION,
        ease: [0.76, 0, 0.24, 1],
      },
    )

    growth.then((animation) => {
      animation.finished.finally(releaseThemeTransition)
    })
  }

  return (
    <div
      className="min-h-dvh relative flex flex-col"
      // viewport-fit=cover lets the page paint under the iOS status bar (so <html>'s
      // background tints it — the browser-chrome contract). Inset the content back out.
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <GradientBlobs />

      <header className="border-b border-foreground px-8 py-4 sm:py-14 flex items-center justify-end">
        <button
          type="button"
          onClick={handleThemeToggle}
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
