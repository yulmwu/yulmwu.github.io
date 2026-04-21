import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ArticlesPage as Articles } from './pages/Articles'
import { ProjectsPage as Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { SocialsPage as Socials } from './pages/Socials'
import { PresentationsPage as Presentations } from './pages/Presentations'
import { PledgePage as Pledge } from './pages/Pledge'
import Event0420 from './pages/events/Event0421'

const App = () => (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:id' element={<ProjectDetail />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/presentations' element={<Presentations />} />
            <Route path='/socials' element={<Socials />} />
            <Route path='/pledge' element={<Pledge />} />
            <Route path='/event0421' element={<Event0420 />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
)

export default App
