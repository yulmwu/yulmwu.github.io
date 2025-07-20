import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

interface ArticleProps {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
}

export const Article = (props: ArticleProps) => (
    <div className='rounded-2xl opacity-80 h-full outline outline-gray-100 shadow-lg hover:bg-[#fbfbfb] hover:opacity-100 transition-colors duration-300'>
        <div className='p-6'>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                    <Link to={props.url} className='no-underline'>
                        <div className='pt-3 text-base font-bold text-gray-900 mb-1'>{props.title}</div>
                        <div className='text-sm text-blue-500 mb-2'>{props.date}</div>
                        <p className='text-sm text-gray-600 leading-relaxed break-keep'>{props.description}</p>
                    </Link>
                    <div className='flex items-center text-xs text-gray-500 group mt-4'>
                        <span className='font-bold group-hover:text-teal-500 transition-colors duration-300'>
                            <Link to={props.url} className='inline-flex items-center'>
                                <FontAwesomeIcon icon={faLink} />
                            </Link>
                        </span>
                    </div>
                </div>
                {props.thumbnail && (
                    <div className='w-full md:w-36 flex-shrink-0 aspect-square overflow-hidden rounded-xl'>
                        <img src={props.thumbnail} alt={props.title} className='w-full h-full object-cover' />
                    </div>
                )}
            </div>
        </div>
    </div>
)
