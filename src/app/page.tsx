'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Github, Mail, Linkedin, BookOpen, Award, Coffee, Heart, Star } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const publications = [
    {
      title: "",
      journal: "",
      year: "",
      authors: "",
      link: ""
    },
  ]

  const interests = [
    "One Piece Card Game",
    "Indie Game Development",
    "Cycling",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800">Alberto León</h1>
            <nav className="hidden md:flex space-x-8">
              {['About', 'Research', 'Publications', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                Hi, I&apos;m <span className="text-blue-600">Alberto</span> <span className="inline-block animate-bounce">👋</span>
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                I&apos;m a passionate researcher exploring the fascinating intersection of 
                <span className="font-semibold text-blue-700"> quantum computing</span>, 
                <span className="font-semibold text-green-700"> artificial intelligence</span>, and 
                <span className="font-semibold text-purple-700"> cybersecurity</span>.
              </p>
              <p className="text-lg text-slate-500 mb-8">
                Currently pursuing my PhD in Computer Science, dreaming of a world where technology 
                protects privacy while enabling incredible discoveries.
              </p>
              <div className="flex items-center space-x-6">
                <a 
                  href="#contact" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Let&apos;s Connect
                </a>
                <div className="flex space-x-4">
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <span className="text-8xl">🧠</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-2 shadow-lg animate-pulse">
                <Star size={20} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-2 shadow-lg">
                <Heart size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-800 mb-12 text-center">About Me</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">
                I&apos;m currently finishing my masters in BioInformatics, specializing in small language models, autonomous agents and their
                applications in healthcare.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When I&apos;m not buried in research papers or coding late into the night, you can find me 
                testing on card and board games or over a mountain.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Coffee className="mr-2" size={20} />
                  Current Status
                </h4>
                <p className="text-blue-700">
                  📖 Writing my thesis defense<br/>
                  🔬 Building efficient agents<br/>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-4">Education & Background</h4>
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-green-500 pl-4">
                  <h5 className="font-medium text-slate-800">MS in Bioinformatics</h5>
                  <p className="text-slate-600 text-sm">University of Guadalajara • 2023-2025</p>
                  <p className="text-slate-500 text-sm">Thesis: SLM Applications in Healthcare</p>
                </div>
              </div>

              <h4 className="font-semibold text-slate-800 mb-4">When I&apos;m Not Researching</h4>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest, index) => (
                  <div key={index} className="text-slate-600 text-sm py-1">
                    {interest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-16 px-6 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-800 mb-12 text-center">Research Areas</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-purple-600" size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-4">Agency</h4>
              <p className="text-slate-600 leading-relaxed">
                Exploring the intersection of AI and human agency, focusing on how autonomous systems can enhance decision-making.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-4">Secure AI</h4>
              <p className="text-slate-600 leading-relaxed">
                Research in differential privacy and privacy-preserving machine learning techniques 
                for responsible AI development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-800 mb-12 text-center">Publications</h3>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors">
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  <a href={pub.link} className="hover:text-blue-600 transition-colors flex items-center space-x-2">
                    <span>{pub.title}</span>
                    <ExternalLink size={16} />
                  </a>
                </h4>
                <p className="text-slate-600 mb-1">{pub.authors}</p>
                <p className="text-slate-500 text-sm">{pub.journal} • {pub.year}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              📚 More publications coming soon! Currently working on several exciting papers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-slate-800 mb-6">Let&apos;s Connect</h3>
          <p className="text-xl text-slate-600 mb-12">
            Interested in collaborating or just want to chat about research? <br/>
            I&apos;d love to hear from you! ☕
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <a href="mailto:jose.aguirre5645@alumnos.udg.mx" className="bg-blue-50 p-8 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors group">
              <Mail className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors mx-auto mb-4" />
              <h4 className="font-semibold text-slate-800 mb-2">Email</h4>
              <p className="text-slate-600 text-sm">Academic mail</p>
            </a>
            
            <a href="#" className="bg-green-50 p-8 rounded-xl border border-green-100 hover:border-green-200 transition-colors group">
              <Linkedin className="w-8 h-8 text-green-600 group-hover:text-green-700 transition-colors mx-auto mb-4" />
              <h4 className="font-semibold text-slate-800 mb-2">LinkedIn</h4>
              <p className="text-slate-600 text-sm">@alberto-leon</p>
            </a>
            
            <a href="#" className="bg-purple-50 p-8 rounded-xl border border-purple-100 hover:border-purple-200 transition-colors group">
              <Github className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors mx-auto mb-4" />
              <h4 className="font-semibold text-slate-800 mb-2">GitHub</h4>
              <p className="text-slate-600 text-sm">@strahlenguy</p>
            </a>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 inline-block">
            <p className="text-slate-600">
              <span className="font-medium">Fun fact:</span> I&apos;m always up for discussing research over a good cup of coffee! ☕
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Alberto León • Built with Next.js and lots of ☕ • Made with <Heart size={14} className="inline text-red-500" /> for research
          </p>
        </div>
      </footer>
    </div>
  )
}