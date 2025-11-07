import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { Presentation } from '../components/home/components/Presentation'
import { presentations } from '../data/presentations'

export const PresentationsPage = () => (
    <>
        <div className='page-content'>
            <NavBar active='presentations' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>발표 & 세미나</h1>
                    <p className='text-lg text-gray-600 mb-12'>
                        컨퍼런스나 세미나에서 발표한 내용들을 소개합니다.
                    </p>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {presentations.map((presentation, index) => (
                            <Presentation
                                key={index}
                                thumbnail={presentation.thumbnail}
                                title={presentation.title}
                                event={presentation.event}
                                date={presentation.date}
                                description={presentation.description}
                                tags={presentation.tags}
                                slidesLink={presentation.slidesLink}
                                videoLink={presentation.videoLink}
                                blogLink={presentation.blogLink}
                            />
                        ))}
                    </div>

                    <div className='pt-20'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    </>
)
