import ThemeToggle from '@/components/ThemeToggle'
import Terrario from '@/components/Terrario'

export default function Home() {
  return (
    <div className="wrap">
      <nav aria-label="Sitio">
        <span className="name">alberto león</span>
        <ThemeToggle />
      </nav>

      <Terrario>
        <div className="intro">
          <p className="verse">
            mantenerse vivo
            <br />
            ya es una forma de pensar<span className="cur" />
          </p>
          <p className="hi">
            <span>Hola, soy Beto.</span>
          </p>
          <p>
            <span>
              Doctorando en Ciencias de la Electrónica y la Computación @{' '}
              <a href="https://www.udg.mx/" target="_blank" rel="noopener noreferrer">
                UdeG
              </a>{' '}
              (CUCEI). Estudio cómo emerge la agencia homeostática en redes neuronales evolucionadas: agentes cuya
              única tarea es seguir vivos.
            </span>
          </p>
          <p>
            <span>Profesor en CUTLAJO. También, visión por computadora para reproducción asistida @ IVF2.0.</span>
          </p>
          <p className="links">
            <span>
              <a href="https://github.com/strahlenguy" target="_blank" rel="noopener noreferrer">
                github
              </a>
            </span>
          </p>
        </div>
      </Terrario>
    </div>
  )
}
