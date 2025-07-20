import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface ProjectProps {
    logo: string
    title: string
    description: string
    period: string
    link: string
    github?: string
}

export const Project = (props: ProjectProps) => (
    <div className='rounded-2xl opacity-80 h-full outline outline-gray-300 shadow-md hover:bg-[#fbfbfb] hover:opacity-100 transition-colors duration-300'>
        <div className='p-6'>
            <Link to={props.link} className='no-underline'>
                <div className='w-8 h-8'>
                    <img src={props.logo} alt='logo' className='w-full h-full' />
                </div>
                <div className='pt-4 text-base font-bold text-gray-900 mb-1'>{props.title}</div>
                <div className='text-sm text-blue-500 mb-2'>{props.period}</div>
                <p className='text-sm text-gray-600 leading-relaxed'>{props.description}</p>
            </Link>
            {props.github && (
                <div className='flex items-center text-xs text-gray-500 group mt-4'>
                    <span className='font-bold group-hover:text-teal-500 transition-colors duration-300'>
                        <Link to={props.github} className='inline-flex items-center'>
                            <FontAwesomeIcon icon={faLink} />
                        </Link>
                    </span>
                </div>
            )}
        </div>
    </div>
)
