import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div className="px-8 py-24 sm:px-16">
      <div className="flex flex-col gap-6">
        <div aria-hidden className="h-[4px] w-20 bg-accent" />
        <h1 className="font-display text-[clamp(4rem,10vw,9rem)] font-bold uppercase leading-none tracking-[0.02em] text-foreground">
          404
        </h1>
        <p className="font-sans text-lg text-foreground/60">
          Nothing here. The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          ← Back home
        </Link>
      </div>
    </div>
  )
}
