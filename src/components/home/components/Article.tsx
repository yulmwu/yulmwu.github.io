import { Link } from 'react-router-dom'

interface ArticleProps {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
    tags?: string[]
}

export const Article = (props: ArticleProps) => (
    <div className='rounded-2xl opacity-80 h-full outline outline-gray-100 shadow-lg hover:bg-[#fbfbfb] hover:opacity-100 transition-colors duration-300'>
        <div className='p-6'>
            <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                    <Link to={props.url} target='_blank' rel='noopener noreferrer' className='no-underline'>
                        <div className='pt-3 text-base font-bold text-gray-900 mb-1'>{props.title}</div>
                        <div className='text-sm text-blue-500 mb-2'>{props.date}</div>
                        <p className='text-sm text-gray-600 leading-relaxed break-keep'>{props.description}</p>
                        {props.tags && (
                            <div className='mt-4 flex flex-wrap gap-2'>
                                {props.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className='text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full'
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </Link>
                </div>
                {props.thumbnail && (
                    <Link to={props.url} target='_blank' rel='noopener noreferrer' className='no-underline'>
                        <div className='w-full md:w-36 min-w-[6rem] aspect-square overflow-hidden rounded-xl'>
                            <img
                                src={props.thumbnail}
                                alt={props.title}
                                className='w-full h-full object-cover object-center rounded-xl'
                            />
                        </div>
                    </Link>
                )}
            </div>
        </div>
    </div>
)
