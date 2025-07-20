import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'

import { Articles } from '../components/home/Articles'

export const ArticlesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar active='articles' />

            <div className='content-wrapper'>
                <div className='pt-15'>
                    <div className='pt-10'>
                        <Articles />
                    </div>

                    <div className='pt-12'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
