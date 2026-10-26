import ThemeToggle from '@/components/ThemeToggle'
import Terrario from '@/components/Terrario'

export default function Home() {
  return (
    <div className="wrap">
      <nav aria-label="Site">
        <span className="name">alberto león</span>
        <ThemeToggle />
      </nav>

      <Terrario>
        <div className="intro">
          <figure className="quote">
            <blockquote className="verse">
              living systems are cognitive systems,
              <br />
              and living as a process
              <br />
              is a process of cognition.<span className="cur" />
            </blockquote>
            <figcaption>Humberto Maturana, Biology of Cognition (1970)</figcaption>
          </figure>
          <p className="hi">
            <span>Hi, I&apos;m Beto.</span>
          </p>
          <p>
            <span>
              PhD student in Electronics and Computer Science at the{' '}
              <a href="https://www.udg.mx/en" target="_blank" rel="noopener noreferrer">
                University of Guadalajara
              </a>
              . I study how agency emerges in small evolved neural networks: agents with no task and no reward, only
              the need to stay alive.
            </span>
          </p>
          <p>
            <span>
              Background in embedded systems and computer vision. Outside the lab: robot arms, 3D printing, fountain
              pens and good coffee.
            </span>
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
