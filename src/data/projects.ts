export interface Project {
    logo?: string
    title: string
    description: string
    period: string
    link: string
    github?: string
    homePin?: boolean
    tags?: string[]
    markdown: string
}

export const projectsRaw: Project[] = [
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
        title: '0725',
        description: '커뮤니티(포럼) 프로젝트',
        period: '25.07.25 ~',
        link: '/projects/0725',
        github: 'https://github.com/yulmwu/0725',
        homePin: true,
        tags: ['TypeScript', 'NestJS', 'Next.js', 'AWS'],
        markdown: `# 0725
테스트
`,
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: '조선인사이드',
        description: '세명컴퓨터고등학교 유연화주간 융합 수업 프로젝트',
        period: '25.07.10 ~ 25.07.14',
        link: '/projects/chosun',
        github: 'https://github.com/yulmwu/smc-project-25-07',
        homePin: true,
        tags: ['TypeScript', 'NestJS', 'React', 'AWS'],
        markdown: `# 조선인사이드
테스트
`,
    },
    {
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-jekyll-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-12-pack-icons-283293.png',
        title: 'OriginalKim Blog',
        description: '#1 Personal Tech Blog (Legacy)',
        period: '~ 25.05.08',
        link: '/projects/originalkim',
        github: 'https://github.com/originalkim/originalkim.github.io',
        tags: ['Jekyll', 'GitHub Pages'],
        markdown: `# OriginalKim Blog
테스트
`,
    },
    {
        logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/aws-icon.png',
        title: 'Velog Backup',
        description: 'Velog Backup with AWS Lambda + EventBridge Scheduler',
        period: '25.07.05',
        link: '/projects/velog-backup',
        github: 'https://github.com/yulmwu/velog-backup',
        homePin: true,
        tags: ['AWS', 'Velog'],
        markdown: `# Velog Backup
테스트
`,
    },
    {
        logo: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
        title: 'Japanese Study Website',
        description: 'Japanese Hiragana Study Website',
        period: '25.03.17 ~ 25.03.28',
        link: '/projects/jp-study',
        github: 'https://github.com/yulmwu/jp-study',
        tags: ['React'],
        markdown: `# Japanese Study Website
테스트
`,
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png',
        title: 'Swua Programming Language',
        description: 'Toy programming language using LLVM',
        period: '23.10.08 ~ 24.04.19',
        link: '/projects/swua',
        github: 'https://github.com/yulmwu/swua',
        homePin: true,
        tags: ['Rust', 'LLVM'],
        markdown: `# Swua Programming Language
테스트
`,
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png',
        title: '6502 Emulator',
        description: 'MOS Technology 6502 Emulator & Assembler (WIP)',
        period: '23.07.2 ~ 23.11.20',
        link: '/projects/6502',
        github: 'https://github.com/yulmwu/6502',
        homePin: true,
        tags: ['Rust'],
        markdown: `# 6502 Emulator
테스트
`,
    },
    {
        logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132222.png',
        title: 'USwua C++',
        description: 'USwua bytecode C++ porting',
        period: '24.08.15 ~ 25.01.02',
        link: '/projects/swua-cpp',
        github: 'https://github.com/yulmwu/uswua-cpp',
        homePin: true,
        tags: ['C++'],
        markdown: `# USwua C++
테스트
`,
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: 'Type',
        description: 'Type Level programming with TypeScript',
        period: '22.03.26 ~ 22.09.10',
        link: '/projects/type',
        github: 'https://github.com/yulmwu/type',
        tags: ['TypeScript'],
        markdown: `# Type
테스트
`,
    },
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
        title: 'Portfolio Website',
        description: 'Personal Portfolio Website',
        period: '22.03.26 ~ 22.09.10',
        link: '/projects/portfolio',
        github: 'https://github.com/yulmwu/yulmwu.github.io',
        tags: ['React'],
        markdown: `# Portfolio Website
테스트
`,
    },
]

export const projects: Project[] = projectsRaw
    .filter((project) => project.homePin)
    .concat(projectsRaw.filter((project) => !project.homePin))
