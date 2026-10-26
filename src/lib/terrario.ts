// Terrarium: agents with draining energy, three sensory sectors and a small
// network (5→4→2) whose weights evolve. Fitness = time alive: when an agent dies,
// it is replaced by a mutated child of the winner of a tournament among the living.

export type TerrarioEls = {
  hero: HTMLElement
  canvas: HTMLCanvasElement
  gen: HTMLElement
  alive: HTMLElement
  best: HTMLElement
  card: HTMLElement
  title: HTMLElement
  bar: HTMLElement
  meta: HTMLElement
  net: HTMLCanvasElement
  close: HTMLButtonElement
  hint: HTMLElement
}

type Agent = {
  id: number
  x: number
  y: number
  a: number
  e: number
  age: number
  gen: number
  g: Float32Array
  act: { i: Float32Array; h: Float32Array; o: Float32Array }
}

type Food = { x: number; y: number }

const NI = 5
const NH = 4
const NO = 2
const GL = NI * NH + NH * NO + NO
const R = 95 // alcance sensorial
const S = 4 // pixel size
const N_AGENTS = 12
const MAX_FOOD = 55

const rnd = (a = 1) => (Math.random() * 2 - 1) * a
const gauss = () => {
  let u = 0
  let v = 0
  while (!u) u = Math.random()
  while (!v) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}
const snap = (v: number) => Math.round(v / S) * S
const fmt = (n: number) => n.toLocaleString('en-US')

export function startTerrario(els: TerrarioEls): () => void {
  const root = document.documentElement
  const ctx = els.canvas.getContext('2d')!
  const ink = document.createElement('canvas')
  const ictx = ink.getContext('2d')!
  const nctx = els.net.getContext('2d')!
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  let W = 600
  let H = 400
  const C = { ink: '', agent: '', food: '', paper: '', soft: '' }

  const readColors = () => {
    const s = getComputedStyle(root)
    C.ink = s.getPropertyValue('--ink').trim()
    C.agent = s.getPropertyValue('--agent').trim()
    C.food = s.getPropertyValue('--food').trim()
    C.paper = s.getPropertyValue('--paper').trim()
    C.soft = s.getPropertyValue('--ink-soft').trim()
  }

  let agents: Agent[] = []
  let food: Food[] = []
  let nextId = 1
  let t = 0
  let best = 0
  let maxGen = 0
  let sel: Agent | null = null
  const patches = [0, 1, 2].map((i) => ({
    p: Math.random() * 6.28,
    q: Math.random() * 6.28,
    s: 0.0006 + i * 0.0003,
  }))

  const resize = () => {
    const r = els.hero.getBoundingClientRect()
    const dpr = Math.min(2, devicePixelRatio || 1)
    W = r.width
    H = r.height
    for (const c of [els.canvas, ink]) {
      c.width = Math.round(W * dpr)
      c.height = Math.round(H * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ictx.setTransform(dpr, 0, 0, dpr, 0, 0)
    for (const a of agents) {
      a.x = Math.min(a.x, W - 8)
      a.y = Math.min(a.y, H - 8)
    }
  }

  const randGenome = () => Float32Array.from({ length: GL }, () => rnd(1.4))
  const mutate = (g: Float32Array) =>
    Float32Array.from(g, (w) => (Math.random() < 0.25 ? w + gauss() * 0.35 : w))
  const spawn = (g: Float32Array, gen: number): Agent => ({
    id: nextId++,
    x: 20 + Math.random() * (W - 40),
    y: 20 + Math.random() * (H - 40),
    a: Math.random() * 6.28,
    e: 0.75,
    age: 0,
    gen,
    g,
    act: { i: new Float32Array(NI), h: new Float32Array(NH), o: new Float32Array(NO) },
  })
  const patchCenter = (k: number): [number, number] => {
    const p = patches[k]
    return [W * (0.5 + 0.38 * Math.sin(p.p + t * p.s)), H * (0.5 + 0.38 * Math.cos(p.q + t * p.s * 1.3))]
  }
  const addFood = (x: number, y: number) => {
    if (x > 4 && x < W - 4 && y > 4 && y < H - 4) food.push({ x, y })
  }

  const init = () => {
    agents = []
    food = []
    for (let i = 0; i < N_AGENTS; i++) agents.push(spawn(randGenome(), 0))
    for (let i = 0; i < 50; i++) {
      const [cx, cy] = patchCenter(i % 3)
      addFood(cx + gauss() * 55, cy + gauss() * 55)
    }
  }

  const think = (a: Agent) => {
    const I = a.act.i
    I.fill(0)
    I[3] = a.e
    I[4] = 1
    const ca = Math.cos(a.a)
    const sa = Math.sin(a.a)
    for (const f of food) {
      const dx = f.x - a.x
      const dy = f.y - a.y
      const d2 = dx * dx + dy * dy
      if (d2 > R * R) continue
      const d = Math.sqrt(d2)
      const ang = Math.atan2(-dx * sa + dy * ca, dx * ca + dy * sa)
      if (Math.abs(ang) > 1.2) continue
      const k = ang < -0.4 ? 0 : ang > 0.4 ? 2 : 1
      const s = 1 - d / R
      if (s > I[k]) I[k] = s
    }
    const { g, h, o } = { g: a.g, h: a.act.h, o: a.act.o }
    for (let j = 0; j < NH; j++) {
      let s = 0
      for (let i = 0; i < NI; i++) s += I[i] * g[i * NH + j]
      h[j] = Math.tanh(s)
    }
    for (let k = 0; k < NO; k++) {
      let s = g[NI * NH + NH * NO + k]
      for (let j = 0; j < NH; j++) s += h[j] * g[NI * NH + j * NO + k]
      o[k] = Math.tanh(s)
    }
  }

  const blot = (x: number, y: number) => {
    ictx.fillStyle = C.agent
    for (let i = 0; i < 9; i++) {
      ictx.globalAlpha = 0.25 + Math.random() * 0.35
      ictx.beginPath()
      ictx.arc(x + gauss() * 5, y + gauss() * 5, 2 + Math.random() * 5, 0, 6.29)
      ictx.fill()
    }
    ictx.globalAlpha = 1
  }

  const showDead = (a: Agent) => {
    els.title.textContent = `agent #${a.id} †`
    els.bar.style.width = '0%'
    els.meta.textContent = `died at ${fmt(a.age)} t. Pick another.`
  }

  const step = () => {
    t++
    for (const a of agents) {
      think(a)
      const turn = a.act.o[0] * 0.16
      const sp = 0.35 + (a.act.o[1] + 1) * 0.75
      a.a += turn
      a.x += Math.cos(a.a) * sp
      a.y += Math.sin(a.a) * sp
      if (a.x < 6 || a.x > W - 6) {
        a.a = Math.PI - a.a
        a.x = Math.max(6, Math.min(W - 6, a.x))
      }
      if (a.y < 6 || a.y > H - 6) {
        a.a = -a.a
        a.y = Math.max(6, Math.min(H - 6, a.y))
      }
      a.e -= 0.0011 + 0.0009 * sp
      a.age++
      for (let i = food.length - 1; i >= 0; i--) {
        const f = food[i]
        if ((f.x - a.x) ** 2 + (f.y - a.y) ** 2 < 64) {
          food.splice(i, 1)
          a.e = Math.min(1, a.e + 0.28)
        }
      }
      if (a.age > best) best = a.age
    }
    for (let i = agents.length - 1; i >= 0; i--) {
      const a = agents[i]
      if (a.e > 0) continue
      blot(a.x, a.y)
      if (sel === a) {
        sel = null
        showDead(a)
      }
      agents.splice(i, 1)
      let parent: Agent | null = null
      for (let k = 0; k < 3; k++) {
        const c = agents[(Math.random() * agents.length) | 0]
        if (c && (!parent || c.age > parent.age)) parent = c
      }
      const child =
        parent && Math.random() > 0.08 ? spawn(mutate(parent.g), parent.gen + 1) : spawn(randGenome(), 0)
      agents.push(child)
      if (child.gen > maxGen) maxGen = child.gen
    }
    if (food.length < MAX_FOOD && Math.random() < 0.32) {
      const [cx, cy] = patchCenter((Math.random() * 3) | 0)
      addFood(cx + gauss() * 55, cy + gauss() * 55)
    }
  }

  const draw = () => {
    if (t % 2 === 0) {
      ictx.globalCompositeOperation = 'destination-out'
      ictx.fillStyle = 'rgba(0,0,0,.025)'
      ictx.fillRect(0, 0, W, H)
      ictx.globalCompositeOperation = 'source-over'
    }
    if (t % 3 === 0) {
      ictx.fillStyle = C.agent
      ictx.globalAlpha = 0.16
      for (const a of agents) ictx.fillRect(snap(a.x), snap(a.y), 2, 2)
      ictx.globalAlpha = 1
    }
    ctx.clearRect(0, 0, W, H)
    ctx.drawImage(ink, 0, 0, W, H)
    ctx.fillStyle = C.food
    for (const f of food) ctx.fillRect(snap(f.x) - 2, snap(f.y) - 2, 4, 4)
    if (sel) {
      ctx.strokeStyle = C.soft
      ctx.setLineDash([3, 4])
      ctx.lineWidth = 1
      for (const off of [-1.2, -0.4, 0.4, 1.2]) {
        ctx.beginPath()
        ctx.moveTo(sel.x, sel.y)
        ctx.lineTo(sel.x + Math.cos(sel.a + off) * R, sel.y + Math.sin(sel.a + off) * R)
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(sel.x, sel.y, R, sel.a - 1.2, sel.a + 1.2)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.strokeStyle = C.agent
      ctx.strokeRect(snap(sel.x) - 10, snap(sel.y) - 10, 20, 20)
    }
    for (const a of agents) {
      const x = snap(a.x)
      const y = snap(a.y)
      ctx.globalAlpha = 0.3 + 0.7 * Math.max(0, a.e)
      ctx.fillStyle = C.agent
      ctx.fillRect(x - 6, y - 2, 12, 4)
      ctx.fillRect(x - 2, y - 6, 4, 12)
      const hx = snap(a.x + Math.cos(a.a) * 8)
      const hy = snap(a.y + Math.sin(a.a) * 8)
      ctx.fillRect(hx - 2, hy - 2, 4, 4)
      ctx.fillStyle = C.paper
      ctx.fillRect(hx - 1, hy - 1, 2, 2)
    }
    ctx.globalAlpha = 1
  }

  const hud = () => {
    els.gen.textContent = String(maxGen)
    els.alive.textContent = String(agents.length)
    els.best.textContent = fmt(best)
  }

  const LABELS = [['left', 'center', 'right', 'energy', 'bias'], ['', '', '', ''], ['turn', 'speed']]
  const drawNet = () => {
    if (!sel) return
    const r = els.net.getBoundingClientRect()
    const w = r.width
    const h = r.height
    const d = Math.min(2, devicePixelRatio || 1)
    if (els.net.width !== Math.round(w * d)) {
      els.net.width = Math.round(w * d)
      els.net.height = Math.round(h * d)
    }
    nctx.setTransform(d, 0, 0, d, 0, 0)
    nctx.clearRect(0, 0, w, h)
    const xs = [44, w / 2, w - 38]
    const pos = LABELS.map((col, ci) =>
      col.map((_, i) => [xs[ci], 12 + (h - 24) * (i / (col.length - 1))] as [number, number]),
    )
    const g = sel.g
    const acts = [sel.act.i, sel.act.h, sel.act.o]
    const edge = (p: [number, number], q: [number, number], wt: number) => {
      nctx.strokeStyle = wt > 0 ? C.agent : C.food
      nctx.globalAlpha = Math.min(0.9, 0.12 + Math.abs(wt) * 0.35)
      nctx.lineWidth = 0.5 + Math.min(2.5, Math.abs(wt))
      nctx.beginPath()
      nctx.moveTo(p[0], p[1])
      nctx.lineTo(q[0], q[1])
      nctx.stroke()
    }
    for (let i = 0; i < NI; i++) for (let j = 0; j < NH; j++) edge(pos[0][i], pos[1][j], g[i * NH + j])
    for (let j = 0; j < NH; j++) for (let k = 0; k < NO; k++) edge(pos[1][j], pos[2][k], g[NI * NH + j * NO + k])
    nctx.globalAlpha = 1
    nctx.font = '10px "DM Mono", monospace'
    pos.forEach((col, ci) =>
      col.forEach((p, i) => {
        nctx.fillStyle = C.paper
        nctx.fillRect(p[0] - 5, p[1] - 5, 10, 10)
        nctx.fillStyle = C.agent
        nctx.globalAlpha = Math.min(1, Math.abs(acts[ci][i]))
        nctx.fillRect(p[0] - 5, p[1] - 5, 10, 10)
        nctx.globalAlpha = 1
        nctx.strokeStyle = C.ink
        nctx.lineWidth = 1
        nctx.strokeRect(p[0] - 5, p[1] - 5, 10, 10)
        const lab = LABELS[ci][i]
        if (lab) {
          nctx.fillStyle = C.soft
          nctx.textAlign = ci === 0 ? 'right' : 'left'
          nctx.fillText(lab, ci === 0 ? p[0] - 9 : p[0] + 9, p[1] + 3)
        }
      }),
    )
  }

  const updateCard = () => {
    if (!sel) return
    els.title.textContent = `agent #${sel.id}`
    els.bar.style.width = `${Math.max(0, sel.e * 100).toFixed(0)}%`
    els.meta.textContent = `gen ${sel.gen} · alive for ${fmt(sel.age)} t`
    drawNet()
  }

  const onPointer = (e: PointerEvent) => {
    const r = els.canvas.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    let hit: Agent | null = null
    let bd = 18 * 18
    for (const a of agents) {
      const d = (a.x - x) ** 2 + (a.y - y) ** 2
      if (d < bd) {
        bd = d
        hit = a
      }
    }
    if (hit) {
      sel = hit
      els.card.hidden = false
      updateCard()
      draw()
      return
    }
    for (let i = 0; i < 9; i++) addFood(x + gauss() * 14, y + gauss() * 14)
    if (reduce) draw()
  }
  const onClose = () => {
    sel = null
    els.card.hidden = true
  }
  const onTheme = () => {
    readColors()
    draw()
    drawNet()
  }

  readColors()
  resize()
  init()
  // Warm up so the first frame already shows trails and a few generations.
  for (let i = 0; i < 900; i++) {
    step()
    if (i % 3 === 0) draw()
  }
  draw()
  hud()

  if (matchMedia('(hover: none)').matches) {
    els.hint.textContent = 'tap: drop food · tap an agent: see its network'
  }

  els.canvas.addEventListener('pointerdown', onPointer)
  els.close.addEventListener('click', onClose)
  window.addEventListener('themechange', onTheme)
  const sysDark = matchMedia('(prefers-color-scheme: dark)')
  sysDark.addEventListener('change', onTheme)
  const ro = new ResizeObserver(() => {
    resize()
    draw()
  })
  ro.observe(els.hero)

  let raf = 0
  let last = 0
  if (!reduce) {
    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden) return
      step()
      draw()
      if (ts - last > 200) {
        last = ts
        hud()
        updateCard()
      }
    }
    raf = requestAnimationFrame(loop)
  }

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    els.canvas.removeEventListener('pointerdown', onPointer)
    els.close.removeEventListener('click', onClose)
    window.removeEventListener('themechange', onTheme)
    sysDark.removeEventListener('change', onTheme)
  }
}
