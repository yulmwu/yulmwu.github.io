export interface Project {
    logo?: string
    title: string
    description: string
    period: string
    link: string
    github?: string
}

export const projectsData: Project[] = [
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: '테스트 프로젝트',
        description: '테스트 프로젝트 설명입니다.',
        period: '23.10.10 ~ 23.11.24',
        link: '/projects/1',
        github: 'https://github.com/example/repo1'
    }
]
