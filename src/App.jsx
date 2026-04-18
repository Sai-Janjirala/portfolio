import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import LeetCode from './sections/LeetCode'
import Projects from './sections/Projects'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import SmoothScroll from './components/SmoothScroll'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <SmoothScroll>
        <div className="w-full bg-background text-text-main font-sans overflow-x-hidden min-h-screen grain-overlay">
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <LeetCode />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  )
}

export default App
