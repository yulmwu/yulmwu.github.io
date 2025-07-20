import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ArticlesPage as Articles } from './pages/Articles'
import { ProjectsPage as Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { SocialsPage as Socials } from './pages/Socials'

const App = () => (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:id' element={<ProjectDetail />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/socials' element={<Socials />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
)

export default App
