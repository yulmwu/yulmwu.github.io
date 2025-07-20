import { Link, useParams } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

export const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>()
    return (
        <div className='page-content'>
            <NavBar active='articles' />

            <div className='content-wrapper'>
                <div className='pt-15'>
                    <div className='pt-10'>
                        <h1 className='text-2xl font-bold mb-4'>Project Detail for {id}</h1>
                    </div>

                    <div className='pt-12'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
