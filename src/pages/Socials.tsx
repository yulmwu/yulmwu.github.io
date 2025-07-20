import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faYoutube, faDiscord, faBloggerB, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'

import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'

interface Social {
    type: 'social' | 'blog' | 'mail'
    name: string
    url: string
    display: string
    icon: IconDefinition
}

const socials: Social[] = [
    {
        type: 'social',
        name: 'GitHub',
        url: 'https://github.com/yulmwu',
        display: '@yulmwu',
        icon: faGithub,
    },
    {
        type: 'social',
        name: 'Youtube',
        url: 'https://www.youtube.com/@rlawnsdud',
        display: '@rlawnsdud',
        icon: faYoutube,
    },
    {
        type: 'social',
        name: 'Discord',
        url: 'https://discord.com/users/615383266412724246',
        display: '@rlawnsdud',
        icon: faDiscord,
    },
    {
        type: 'mail',
        name: 'Email',
        url: 'mailto:normal8781@gmail.com',
        display: 'normal8781@gmail.com',
        icon: faEnvelope,
    },
    {
        type: 'blog',
        name: 'Velog',
        url: 'https://velog.io/@yulmwu',
        display: '@yulmwu',
        icon: faLink,
    },
    {
        type: 'blog',
        name: 'Original Kim (Outdated)',
        url: 'https://originalkim.github.io/',
        display: 'originalKim',
        icon: faLink,
    },
]

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
