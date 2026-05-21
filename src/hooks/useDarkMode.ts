import { useCallback, useEffect, useState } from "react"

function getCookieTheme(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)theme=([^;]*)/)
  return match ? match[1] : null
}

function setCookieTheme(value: string) {
  const domain = window.location.hostname.endsWith("tstanev.com") ? "; domain=.tstanev.com" : ""
  document.cookie = `theme=${value}; path=/; max-age=31536000; SameSite=Lax${domain}`
}

function resolveInitial(): boolean {
  const stored = getCookieTheme() ?? localStorage.getItem("theme")
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
      const value = next ? "dark" : "light"
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", value)
      setCookieTheme(value)
      return next
    })
  }, [])

  return { dark, toggle }
}
