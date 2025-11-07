import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

interface ArticleProps {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
    tags?: string[]
}

export const Article = (props: ArticleProps) => (
    <div className='rounded-2xl outline outline-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden'>
        {props.thumbnail && (
            <div className='w-full h-48 overflow-hidden bg-gray-100'>
                <img src={props.thumbnail} alt={props.title} className='w-full h-full object-cover' />
            </div>
        )}
        <div className='p-6 flex flex-col flex-1'>
            <div className='flex-1'>
                <div className='text-lg font-bold text-gray-800 mb-2'>{props.title}</div>
                <div className='text-sm text-gray-400 font-medium mb-3'>{props.date}</div>
                <p className='text-sm text-gray-600 leading-relaxed break-keep mb-4'>{props.description}</p>
                {props.tags && props.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {props.tags.map((tag, index) => (
                            <span key={index} className='text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg font-medium'>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className='mt-auto pt-4 border-t border-gray-100'>
                <Link
                    to={props.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 font-medium'
                >
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-xs' />
                    <span>게시글 보기</span>
                </Link>
            </div>
        </div>
    </div>
)
