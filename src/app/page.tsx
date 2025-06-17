'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ExternalLink, Github, Mail, Twitter, Linkedin, FileText, BookOpen, Award } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const publications = [
    {
      title: "Quantum Computing Applications in Cryptography: A Comprehensive Review",
      journal: "Journal of Advanced Computing",
      year: "2024",
      authors: "Alberto León, et al.",
      link: "#"
    },
    {
      title: "Machine Learning Approaches to Data Privacy",
      journal: "International Conference on AI Ethics",
      year: "2023",
      authors: "Alberto León, Co-Author",
      link: "#"
    }
  ]

  const projects = [
    {
      title: "QuantumSecure",
      description: "An open-source implementation of post-quantum cryptographic algorithms",
      tech: ["Python", "C++", "Quantum Computing"],
      github: "#",
      demo: "#"
    },
    {
      title: "Neural Privacy Guard",
      description: "Privacy-preserving machine learning framework using differential privacy",
      tech: ["TensorFlow", "Python", "Docker"],
      github: "#",
      demo: "#"
    },
    {
      title: "Research Data Pipeline",
      description: "Automated data processing and analysis pipeline for academic research",
      tech: ["Python", "Apache Airflow", "PostgreSQL"],
      github: "#"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ALBERTO LEÓN
            </div>
            <div className="hidden md:flex space-x-8">
              {['about', 'research', 'projects', 'publications', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-purple-400 ${
                    activeSection === section ? 'text-purple-400' : 'text-slate-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Research in<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Advanced Computing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Exploring the frontiers of quantum computing, artificial intelligence<br />
            and cybersecurity for the future of technology
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce"
          >
            <ChevronDown size={32} className="text-purple-400" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-purple-500/30 flex items-center justify-center">
                <div className="w-60 h-60 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a passionate researcher exploring the frontiers of modern computing. My work focuses on 
                the intersection of quantum computing, artificial intelligence, and cybersecurity.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Currently pursuing a PhD in Computer Science, specializing in post-quantum cryptography 
                and secure AI systems. My goal is to contribute to the development of technologies that 
                protect privacy and security in the digital age.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-purple-400 font-semibold mb-2">Education</h3>
                  <p className="text-slate-300 text-sm">PhD in Computer Science</p>
                  <p className="text-slate-400 text-xs">XYZ University, 2024</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="text-purple-400 font-semibold mb-2">Specialization</h3>
                  <p className="text-slate-300 text-sm">Quantum Computing</p>
                  <p className="text-slate-400 text-xs">Cryptography & AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Research Areas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Quantum Computing</h3>
              <p className="text-slate-300 leading-relaxed">
                Development of quantum algorithms for post-quantum cryptography and optimization of distributed systems.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Secure AI</h3>
              <p className="text-slate-300 leading-relaxed">
                Research in differential privacy and privacy-preserving machine learning techniques.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
                <FileText className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Cybersecurity</h3>
              <p className="text-slate-300 leading-relaxed">
                Vulnerability analysis in critical systems and development of advanced security protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                <h3 className="text-xl font-bold mb-3 text-purple-400 group-hover:text-pink-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.github} className="text-slate-400 hover:text-purple-400 transition-colors">
                    <Github size={20} />
                  </a>
                  {project.demo && (
                    <a href={project.demo} className="text-slate-400 hover:text-purple-400 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Publications
          </h2>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 text-purple-400 hover:text-pink-400 transition-colors">
                  <a href={pub.link} className="flex items-center space-x-2">
                    <span>{pub.title}</span>
                    <ExternalLink size={16} />
                  </a>
                </h3>
                <p className="text-slate-300 mb-2">{pub.authors}</p>
                <p className="text-slate-400 text-sm">{pub.journal} • {pub.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contacto
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            ¿Interesado en colaborar o discutir ideas de investigación?
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a href="mailto:tu-email@universidad.edu" className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
              <Mail className="w-8 h-8 text-purple-400 group-hover:text-pink-400 transition-colors mx-auto mb-4" />
              <h3 className="font-semibold text-purple-400 mb-2">Email</h3>
              <p className="text-slate-300 text-sm">tu-email@universidad.edu</p>
            </a>
            <a href="#" className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
              <Linkedin className="w-8 h-8 text-purple-400 group-hover:text-pink-400 transition-colors mx-auto mb-4" />
              <h3 className="font-semibold text-purple-400 mb-2">LinkedIn</h3>
              <p className="text-slate-300 text-sm">@tu-perfil</p>
            </a>
            <a href="#" className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
              <Github className="w-8 h-8 text-purple-400 group-hover:text-pink-400 transition-colors mx-auto mb-4" />
              <h3 className="font-semibold text-purple-400 mb-2">GitHub</h3>
              <p className="text-slate-300 text-sm">@tu-usuario</p>
            </a>
          </div>
          <p className="text-slate-400">
            © 2024 Tu Nombre. Construido con Next.js y amor por la investigación.
          </p>
        </div>
      </section>
    </div>
  )
}