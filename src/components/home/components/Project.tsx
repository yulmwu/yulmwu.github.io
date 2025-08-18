import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface ProjectProps {
    isDetailPage?: boolean
    logo?: string
    title: string
    description: string
    period: string
    link: string
    github?: string
    tags?: string[]
    detailTags?: string[]
    openLinkWithNewTab?: boolean
}

export const Project = (props: ProjectProps) => (
    <div className='rounded-2xl outline outline-gray-100 bg-white shadow-lg hover:bg-[#fbfbfb] hover:opacity-100 transition-colors duration-300'>
        <div className='p-6'>
            <Link to={props.link} className='no-underline' target={props.openLinkWithNewTab ? '_blank' : '_self'}>
                {props.logo && (
                    <div className='w-8 h-8'>
                        <img src={props.logo} alt='logo' className='w-full h-full' />
                    </div>
                )}
                <div className='pt-4 text-base font-bold text-gray-900 mb-1'>{props.title}</div>
                <div className='text-sm text-blue-500 mb-2'>{props.period}</div>
                <p className='text-sm text-gray-600 leading-relaxed break-keep'>{props.description}</p>
                {props.tags && (
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {((props.isDetailPage ? props.detailTags : props.tags) ?? []).map((tag, index) => (
                            <span key={index} className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full'>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </Link>
            {props.github && (
                <div className='flex items-center text-xs text-gray-500 group mt-4'>
                    <span className='font-bold group-hover:text-teal-500 transition-colors duration-300'>
                        <Link
                            to={props.github}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center'
                        >
                            <FontAwesomeIcon icon={faLink} />
                        </Link>
                    </span>
                </div>
            )}
        </div>
    </div>
)
