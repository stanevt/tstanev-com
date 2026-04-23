import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { useEffect } from "react"

export function GradientBlobs() {
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 25, damping: 20, mass: 1.5 })
  const y = useSpring(rawY, { stiffness: 25, damping: 20, mass: 1.5 })

  const b1x = useTransform(x, [-0.5, 0.5], ["-120px", "120px"])
  const b1y = useTransform(y, [-0.5, 0.5], ["-100px", "100px"])
  const b2x = useTransform(x, [-0.5, 0.5], ["160px", "-160px"])
  const b2y = useTransform(y, [-0.5, 0.5], ["-120px", "120px"])
  const b3x = useTransform(x, [-0.5, 0.5], ["-80px", "80px"])
  const b3y = useTransform(y, [-0.5, 0.5], ["120px", "-120px"])

  useEffect(() => {
    if (reduced) return
    function onMouseMove(e: MouseEvent) {
      rawX.set(e.clientX / window.innerWidth - 0.5)
      rawY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [reduced, rawX, rawY])

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ mixBlendMode: "multiply" }}
      >
        <motion.div
          className="absolute -top-[15vw] -left-[10vw] h-[60vw] w-[60vw] rounded-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at center, #DB4A2B 0%, transparent 55%)",
            filter: "blur(140px)",
            opacity: 0.62,
            ...(reduced ? {} : { x: b1x, y: b1y }),
          }}
        />
        <motion.div
          className="absolute top-[20vw] -right-[15vw] h-[55vw] w-[55vw] rounded-full"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            background: "radial-gradient(circle at center, #F8A348 0%, transparent 65%)",
            filter: "blur(140px)",
            ...(reduced ? {} : { x: b2x, y: b2y }),
          }}
        />
        <motion.div
          className="absolute top-[80vh] left-[20vw] h-[45vw] w-[45vw] rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          style={{
            background: "radial-gradient(circle at center, #FF89A9 0%, transparent 65%)",
            filter: "blur(160px)",
            ...(reduced ? {} : { x: b3x, y: b3y }),
          }}
        />
      </div>

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "soft-light",
          opacity: 0.9,
        }}
      />
    </>
  )
}
