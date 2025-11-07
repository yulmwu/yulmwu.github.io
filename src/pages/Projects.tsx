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
                <div className='pt-30'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>프로젝트</h1>
                    <p className='text-lg text-gray-600 mb-12'>
                        개발하거나 참여했던 다양한 프로젝트들을 소개합니다.
                    </p>

                    <Projects />

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
