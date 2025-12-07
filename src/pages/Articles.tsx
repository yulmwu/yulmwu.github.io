import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'

import { Articles } from '../components/home/Articles'

export const ArticlesPage = () => {
    const [viewMode, setViewMode] = useState<'default' | 'many'>('default')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar active='articles' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <Articles showViewOptions={true} viewMode={viewMode} onViewModeChange={setViewMode} />

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
