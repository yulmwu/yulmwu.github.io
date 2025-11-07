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
                <div className='pt-30'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>게시글</h1>
                    <p className='text-lg text-gray-600 mb-12'>
                        작성했던 다양한 게시글들을 소개합니다.
                    </p>

                    <Articles />

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
