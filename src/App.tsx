import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

const App = () => (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/articles' element={<div>Articles Page</div>} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
)

export default App
