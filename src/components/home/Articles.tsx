import { articles } from '../../data/articles'
import { Article } from './components/Article'

interface ArticlesProps {
    responsive?: boolean
}

export const Articles = (props: ArticlesProps) => (
    <div className={`grid grid-cols-1 ${props.responsive ? 'xl:grid-cols-2' : ''} gap-6`}>
        {articles.map((article, index) => (
            <Article
                key={index}
                thumbnail={article.thumbnail}
                title={article.title}
                description={article.description}
                date={article.date}
                url={article.url}
            />
        ))}
    </div>
)
