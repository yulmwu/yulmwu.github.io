import { Link } from 'react-router-dom'
import { articles } from '../../data/articles'
import { Article } from './components/Article'

interface ArticlesProps {
    responsive?: boolean
    maxArticles?: number
}

export const Articles = (props: ArticlesProps) => (
    <div>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>Posts / Articles</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {articles.slice(0, props.maxArticles).map((article, index) => (
                <Article
                    key={index}
                    thumbnail={article.thumbnail}
                    title={article.title}
                    description={article.description}
                    date={article.date}
                    url={article.url}
                    tags={article.tags}
                />
            ))}
        </div>
        {props.maxArticles && articles.length > props.maxArticles ? (
            <div className='text-center mt-8 text-lg'>
                <Link to='/articles' className='text-gray-500 hover:text-gray-600 transition-colors duration-300'>
                    More Articles (+{articles.length - props.maxArticles})
                </Link>
            </div>
        ) : (
            <div className='text-center mt-8 text-lg'>
                <a
                    href='https://velog.io/@yulmwu'
                    className='text-gray-500 hover:text-gray-600 transition-colors duration-300'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    More Articles on Velog
                </a>
            </div>
        )}
    </div>
)
