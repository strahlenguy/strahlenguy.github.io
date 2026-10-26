'use client'

import { useEffect, useRef } from 'react'
import { startTerrario } from '@/lib/terrario'

export default function Terrario({ children }: { children: React.ReactNode }) {
  const hero = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const gen = useRef<HTMLSpanElement>(null)
  const alive = useRef<HTMLSpanElement>(null)
  const best = useRef<HTMLSpanElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLElement>(null)
  const meta = useRef<HTMLDivElement>(null)
  const net = useRef<HTMLCanvasElement>(null)
  const close = useRef<HTMLButtonElement>(null)
  const hint = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return startTerrario({
      hero: hero.current!,
      canvas: canvas.current!,
      gen: gen.current!,
      alive: alive.current!,
      best: best.current!,
      card: card.current!,
      title: title.current!,
      bar: bar.current!,
      meta: meta.current!,
      net: net.current!,
      close: close.current!,
      hint: hint.current!,
    })
  }, [])

  return (
    <header className="hero" id="terrario" ref={hero}>
      <canvas
        id="sim"
        ref={canvas}
        aria-label="Simulation: agents forage to keep their energy up. Click to drop food, or click an agent to see its network."
      />
      <div className="hud">
        gen <span ref={gen}>0</span>
        <br />
        alive <span ref={alive}>0</span>
        <br />
        best <span ref={best}>0</span> t
      </div>

      <div className="agent" ref={card} hidden>
        <h3>
          <span ref={title}>agent</span>
          <button type="button" ref={close} aria-label="Close">
            ×
          </button>
        </h3>
        <div className="lab">interoception · energy</div>
        <div className="bar">
          <i ref={bar} />
        </div>
        <div className="lab" ref={meta} />
        <canvas className="net" ref={net} aria-label="Agent neural network" />
      </div>

      {children}

      <div className="hint" ref={hint}>
        click: drop food · click an agent: see its network
      </div>
    </header>
  )
}
