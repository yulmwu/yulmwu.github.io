import posts from './posts.json'

export interface Article {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
    tags?: string[]
    homePin?: boolean
}

export const articles: Article[] = posts.map((post) => ({
    thumbnail: post.thumbnail,
    title: post.title,
    description: post.short_description,
    date: post.released_at,
    url: `https://velog.io/@${post.user.username}/${post.url_slug}`,
    tags: post.tags,
    // homePin: post.homePin,
}))
