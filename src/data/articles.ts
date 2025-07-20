export interface Article {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
}

export const articles: Article[] = [
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/96e98f66-9e55-49f7-b979-ee4b92c94689/image.png',
        title: '첫 번째 블로그 글',
        description:
            '이것은 첫 번째 블로그 글의 내용입니다. Gemini가 웹사이트에 블로그 섹션을 추가하는 방법에 대해 이야기합니다.',
        date: '2025-07-21',
        url: '#',
    },
    {
        title: 'React와 TypeScript',
        description:
            'React와 TypeScript를 함께 사용하여 타입-세이프한 웹 애플리케이션을 구축하는 방법에 대한 팁입니다.',
        date: '2025-07-22',
        url: '#',
    },
    {
        title: 'Vite의 속도',
        description: 'Vite가 어떻게 빠른 개발 서버와 빌드 속도를 제공하는지 알아봅니다.',
        date: '2025-07-23',
        url: '#',
    },
    {
        title: 'CSS Grid 마스터하기',
        description: 'CSS Grid를 사용하여 복잡한 반응형 레이아웃을 만드는 기술을 배웁니다.',
        date: '2025-07-24',
        url: '#',
    },
]
