import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'

import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="w-full bg-background text-text-main font-sans selection:bg-primary selection:text-white overflow-x-hidden min-h-screen transition-colors duration-300">
        <CustomCursor />
        <Navbar />
        <main className="space-y-0">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>

      </div>
    </ThemeProvider>
  )
}

export default App
