import { GradientBlobs } from "./components/GradientBlobs"
import { BusinessCard } from "./components/BusinessCard"

export default function App() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <GradientBlobs />

      <header className="border-b border-foreground px-8 py-14" />

      <div className="mx-auto max-w-6xl w-full px-6 sm:px-10 pb-20 flex-1 animate-slide-up">
        <BusinessCard />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-foreground px-8 py-2.5 bg-background/60 backdrop-blur-sm z-10">
        <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-foreground/40">
          © {new Date().getFullYear()} · Todor Stanev
        </p>
      </footer>
    </div>
  )
}
