'use client'

import { useEffect, useState } from 'react'

const KEY = 'beto-theme'

function systemDark() {
  return matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    const t = document.documentElement.dataset.theme
    setDark(t ? t === 'dark' : systemDark())
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onSys = () => {
      if (!document.documentElement.dataset.theme) setDark(mq.matches)
    }
    mq.addEventListener('change', onSys)
    return () => mq.removeEventListener('change', onSys)
  }, [])

  const toggle = () => {
    const next = !dark
    const value = next ? 'dark' : 'light'
    document.documentElement.dataset.theme = value
    try {
      localStorage.setItem(KEY, value)
    } catch {}
    setDark(next)
    window.dispatchEvent(new Event('themechange'))
  }

  return (
    <button
      type="button"
      className="theme"
      onClick={toggle}
      aria-label={dark ? 'Cambiar a tema de día' : 'Cambiar a tema de noche'}
    >
      <i />
      <span>{dark === null ? ' ' : dark ? 'día' : 'noche'}</span>
    </button>
  )
}
