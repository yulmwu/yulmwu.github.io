import { useEffect } from 'react'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { socials } from '../data/socials'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SocialsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='page-content'>
            <NavBar active='socials' />

            <div className='content-wrapper'>
                <h1 className='text-3xl font-bold mb-10 text-center pt-25'>Social Links</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {socials.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-2xl outline outline-gray-100 bg-white shadow-lg hover:bg-[#fbfbfb] hover:opacity-100 transition-colors duration-300 p-6 flex items-center gap-5'
                        >
                            <div className='text-2xl text-gray-700 flex-shrink-0'>
                                <FontAwesomeIcon icon={social.icon} />
                            </div>
                            <div>
                                <div className='font-bold text-gray-900'>{social.name}</div>
                                <div className='text-sm text-gray-500 break-all'>{social.display}</div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className='pt-20'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
