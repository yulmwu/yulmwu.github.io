import './App.css'
import Main from './components/Main'
import History from './components/History'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

const App = () => {
    return (
        <div>
            <div className='fixed bottom-4 left-4 z-50'>
                <button
                    className='bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
                    onClick={() => {
                        document.documentElement.classList.toggle('dark')
                    }}
                >
                    <img src='/emojis/moon.svg' alt='/' className='w-6 h-6' />
                </button>
            </div>
            <Main />
            <History />
            <Skills />
            <Projects />
            <Contact />
        </div>
    )
}

export default App
