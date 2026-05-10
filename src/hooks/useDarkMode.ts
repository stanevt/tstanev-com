import { useCallback, useEffect, useState } from "react"

function resolveInitial(): boolean {
  const stored = localStorage.getItem("theme")
  if (stored) return stored === "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function useDarkMode() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const isDark = resolveInitial()
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", next ? "dark" : "light")
      return next
    })
  }, [])

  return { dark, toggle }
}
