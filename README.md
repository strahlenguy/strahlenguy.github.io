# strahlenguy.github.io

Sitio personal de Alberto León (Beto). El encabezado es un terrario: agentes con energía que se agota buscan comida, y sus redes (5→4→2) evolucionan mientras la página está abierta. La aptitud es el tiempo que sobreviven.

## Desarrollo

```bash
npm install
npm run dev
```

- `src/lib/terrario.ts`: la simulación (agentes, evolución y dibujo en canvas).
- `src/components/Terrario.tsx`: el encabezado que la monta.
- `src/app/page.tsx`: el texto de presentación.
- `src/app/globals.css`: colores y tipografía; tema de día (gris) y de noche.

## Publicación

Cada push a `main` construye el sitio estático (`next build` con `output: 'export'`) y lo publica en GitHub Pages mediante `.github/workflows/deploy.yml`.
