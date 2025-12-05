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
            <Link
                to='/articles'
                className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
            >
                <span>더 보기 (+{articles.length - props.maxArticles}개)</span>
            </Link>
        ) : (
            <a
                href='https://velog.io/@yulmwu'
                className='w-full mt-8 py-3 px-4 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-700'
                target='_blank'
                rel='noopener noreferrer'
            >
                <span>Velog에서 더 보기</span>
            </a>
        )}
    </div>
)
