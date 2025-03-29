import './App.css'
import FixedMenu from './components/FixedMenu'
import Main from './components/Main'
import History from './components/History'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

const App = () => {
    return (
        <div>
            <FixedMenu />
            <Main />
            <History />
            <Skills />
            <Projects />
            <Contact />
        </div>
    )
}

export default App
