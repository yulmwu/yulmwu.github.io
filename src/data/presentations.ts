export interface PresentationData {
    thumbnail?: string
    title: string
    event: string
    date: string
    description: string
    tags?: string[]
    slidesLink?: string
    videoLink?: string
    blogLink?: string
}

export const presentations: PresentationData[] = [
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/c5cc7a50-ab4c-4676-ba91-2fd01d3b2ba5/image.png',
        title: 'Lambda Serverless API with Cognito Authentication',
        event: '세명컴퓨터고등학교 전공동아리 연합 세미나',
        date: '2025.07',
        description:
            'AWS Lambda와 Cognito를 포함한 다양한 서비스를 활용한 서버리스 API 구축 및 인증 시스템 구현 방법을 소개하였습니다.',
        tags: ['AWS', 'Serverless', 'Lambda', 'API Gateway', 'Cognito'],
        slidesLink: 'https://github.com/yulmwu/presentation/tree/main',
        blogLink: 'https://velog.io/@yulmwu/aws-serverless',
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/df9b61c0-297e-464e-8526-1463b5c6232b/image.png',
        title: 'Null4U Sessions: Cloud Native',
        event: '세명컴퓨터고등학교 IT 컨퍼런스 2025',
        date: '2025.11',
        description:
            '전공동아리 Null4U를 대표하여 클라우드 네이티브 기술, Kubernetes 그리고 DevOps와 관련된 주제로 발표를 진행하였습니다.',
        tags: ['AWS', 'Kubernetes', 'Cloud Native', 'DevOps'],
        slidesLink: 'https://github.com/yulmwu/presentation/tree/main',
        blogLink: 'https://velog.io/@yulmwu/smch-2025-it-conference-null4u',
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/8a056078-c706-40fe-a616-471ab411dc4a/image.png',
        title: 'Kubernetes: Gateway API (Feat. AWS VPC Lattice)',
        event: '세명컴퓨터고등학교 전공동아리 연합 세미나',
        date: '2025.?? (예정)',
        description:
            'Kubernetes의 Gateway API와 AWS VPC Lattice를 활용한 서비스 메쉬 구축 및 North-South 트래픽 관리 방법에 대해 발표할 예정입니다.',
        tags: ['Kubernetes', 'Gateway API', 'AWS VPC Lattice', 'Service Mesh'],
        slidesLink: 'https://github.com/yulmwu/presentation/tree/main',
        blogLink: 'https://velog.io/@yulmwu/kubernetes-gateway',
    },
    // {
    //     thumbnail: 'https://i.imgur.com/Z2NIuia_d.webp?maxwidth=760&fidelity=grand',
    //     title: '전공 스터디 활동 세바시 발표',
    //     event: '세명컴퓨터고등학교 세바시 발표회',
    //     date: '2025.?? (예정)',
    //     description:
    //         'Kubernetes의 Gateway API와 AWS VPC Lattice를 활용한 서비스 메쉬 구축 및 North-South 트래픽 관리 방법에 대해 발표할 예정입니다.',
    //     tags: ['Kubernetes', 'Gateway API', 'AWS VPC Lattice', 'Service Mesh'],
    //     slidesLink: 'https://github.com/yulmwu/presentation/tree/main',
    // },
]
