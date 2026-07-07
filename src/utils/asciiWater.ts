// ASCII water/wave hero canvas — the home page's optimized version, shared by
// every page with a hero (home, reads, 404). Call from an `astro:page-load`
// handler once you've confirmed the canvas + section exist and motion is allowed.
// Returns a cleanup fn — wire it to `astro:before-preparation` (once).
export function initAsciiWater(canvas: HTMLCanvasElement, section: HTMLElement) {
  const ctx = canvas.getContext('2d', { alpha: true })!
  const CELL = window.innerWidth < 640 ? 36 : 24
  // denser ramp → smoother gradient from calm water to ripple peaks
  const WATER = [' ', '·', '·', '˙', '-', '~', '~', '≈', '≈', '∿', '◦', '▲', '▲', '█']
  const FONT = `${Math.round(CELL * 0.5)}px monospace`
  const RIPPLE_LIFE = 2800
  const RIPPLE_SPEED = 0.014
  const RIPPLE_DECAY = 80
  const FPS_CAP = 1000 / 30
  // color quantization → cells sharing a bucket draw in one fillStyle pass
  const A_STEPS = 16 // alpha levels
  const G_STEPS = 8 // glow (teal→purple) levels
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  let cols = 0, rows = 0, cssW = 0, cssH = 0, rafId = 0, lastFrame = 0, sectionVisible = true
  let nextAmbient = 0

  type Ripple = { x: number; y: number; born: number; amp: number }
  const ripples: Ripple[] = []

  // reused per-frame scratch so the hot loop allocates nothing
  const colWave: number[] = []
  const rowWave: number[] = []
  // one cell list per (alpha,glow) bucket; flat [x,y,charIdx] triples
  const buckets: number[][] = Array.from({ length: A_STEPS * G_STEPS }, () => [])

  const resize = () => {
    cssW = canvas.offsetWidth
    cssH = canvas.offsetHeight
    // crisp on retina: back the canvas at DPR, draw in CSS pixels
    canvas.width = Math.round(cssW * dpr)
    canvas.height = Math.round(cssH * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cols = Math.ceil(cssW / CELL) + 1
    rows = Math.ceil(cssH / CELL) + 1
  }

  const draw = (ts: number) => {
    rafId = requestAnimationFrame(draw)
    if (document.hidden || !sectionVisible || ts - lastFrame < FPS_CAP) return
    lastFrame = ts

    ctx.clearRect(0, 0, cssW, cssH)
    ctx.font = FONT
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let i = ripples.length - 1; i >= 0; i--) {
      if (ts - ripples[i].born > RIPPLE_LIFE) ripples.splice(i, 1)
    }

    const t = ts * 0.001

    // ambient life: drift a faint ripple in now and then so the field
    // breathes without a cursor (whole effect already gated by reduced-motion)
    if (ts >= nextAmbient) {
      nextAmbient = ts + 1600 + Math.random() * 2200
      ripples.push({ x: Math.random() * cssW, y: Math.random() * cssH, born: ts, amp: 0.8 })
      if (ripples.length > 12) ripples.shift()
    }

    // separable base-wave terms, computed once per row/col instead of per cell
    for (let c = 0; c < cols; c++) colWave[c] = 0.6 * Math.sin(c * 0.38 + t * 0.9)
    for (let r = 0; r < rows; r++) rowWave[r] = 0.2 * Math.sin(r * 0.22 + t * 0.7)

    for (let i = 0; i < buckets.length; i++) buckets[i].length = 0

    for (let r = 0; r < rows; r++) {
      const py = r * CELL
      const rw = rowWave[r]
      for (let c = 0; c < cols; c++) {
        const px = c * CELL
        // only the cross term stays per-cell (one sin instead of three)
        const base = colWave[c] + rw + 0.4 * Math.sin(c * 0.18 - r * 0.12 + t * 0.55)

        let rip = 0
        for (let k = 0; k < ripples.length; k++) {
          const rpl = ripples[k]
          const age = (ts - rpl.born) * 0.001
          const dx = px - rpl.x, dy = py - rpl.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const env = Math.exp(-Math.abs(dist - age * 240) / RIPPLE_DECAY) * Math.exp(-age * 0.9)
          rip += rpl.amp * env * Math.sin(dist * RIPPLE_SPEED - age * 7)
        }

        const norm = Math.max(0, Math.min(1, (base + rip + 1.2) / 3.4))
        const idx = Math.min(WATER.length - 1, Math.floor(norm * WATER.length))
        if (idx === 0) continue // blank cell

        const glow = Math.min(1, Math.abs(rip) * 0.6)
        const alpha = 0.07 + norm * 0.65 + glow * 0.3
        const aLvl = Math.min(A_STEPS - 1, Math.max(0, Math.round(alpha * (A_STEPS - 1))))
        const gLvl = Math.min(G_STEPS - 1, Math.round(glow * (G_STEPS - 1)))
        const b = buckets[aLvl * G_STEPS + gLvl]
        b.push(px, py, idx)
      }
    }

    // one fillStyle change per non-empty bucket instead of per cell
    for (let aLvl = 0; aLvl < A_STEPS; aLvl++) {
      for (let gLvl = 0; gLvl < G_STEPS; gLvl++) {
        const b = buckets[aLvl * G_STEPS + gLvl]
        if (b.length === 0) continue
        const glow = gLvl / (G_STEPS - 1)
        const alpha = (aLvl / (A_STEPS - 1)).toFixed(3)
        // teal base → violet at ripple peaks
        const gr = Math.round(61 + glow * 130)
        const gg = Math.round(220 - glow * 140)
        const gb = Math.round(190 + glow * 55)
        ctx.fillStyle = `rgba(${gr},${gg},${gb},${alpha})`
        for (let i = 0; i < b.length; i += 3) {
          ctx.fillText(WATER[b[i + 2]], b[i], b[i + 1])
        }
      }
    }
  }

  const sectionIO = new IntersectionObserver(([e]) => { sectionVisible = e.isIntersecting }, { threshold: 0 })
  sectionIO.observe(section)

  const spawnRipple = (clientX: number, clientY: number, amp: number) => {
    const rect = canvas.getBoundingClientRect()
    ripples.push({ x: clientX - rect.left, y: clientY - rect.top, born: performance.now(), amp })
    if (ripples.length > 12) ripples.shift()
  }

  // dense wake trail while moving
  let lastMove = 0
  section.addEventListener('mousemove', (e) => {
    const now = Date.now()
    if (now - lastMove > 120) {
      lastMove = now
      spawnRipple((e as MouseEvent).clientX, (e as MouseEvent).clientY, 1.4)
    }
  })
  // big dramatic blast on click
  section.addEventListener('click', (e) => {
    const me = e as MouseEvent
    spawnRipple(me.clientX, me.clientY, 4.0)
    // extra ring slightly offset for a double-ring effect
    setTimeout(() => spawnRipple(me.clientX, me.clientY, 2.5), 120)
  })
  section.addEventListener('touchstart', (e) => {
    const touch = (e as TouchEvent).touches[0]
    spawnRipple(touch.clientX, touch.clientY, 3.5)
  }, { passive: true })

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()
  rafId = requestAnimationFrame(draw)

  return () => {
    cancelAnimationFrame(rafId)
    ro.disconnect()
    sectionIO.disconnect()
  }
}
