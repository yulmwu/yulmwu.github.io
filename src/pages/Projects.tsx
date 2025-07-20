import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { Projects } from '../components/home/Projects'
import { NavBar } from '../components/NavBar'

export const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar active='projects' />

            <div className='content-wrapper'>
                <div className='pt-15'>
                    <div className='pt-10'>
                        <Projects />
                    </div>

                    <div className='pt-12'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
