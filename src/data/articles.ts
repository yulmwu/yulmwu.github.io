export interface Article {
    thumbnail?: string
    title: string
    description: string
    date: string
    url: string
    tags?: string[]
    homePin?: boolean
}

export const articlesRaw: Article[] = [
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/c5cc7a50-ab4c-4676-ba91-2fd01d3b2ba5/image.png',
        title: '[AWS] Lambda Serverless API With Cognito Authentication',
        description: 'Deploying Serverless Architecture on AWS',
        date: '2025-06-22',
        url: 'https://velog.io/@yulmwu/aws-serverless',
        tags: ['AWS', 'Serverless'],
        homePin: true,
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/e258960e-a9e3-4a22-996c-08d7ad9d9db2/image.png',
        title: '[AWS] Backup Velog periodically (Lambda, EventBridge Scheduler, S3)',
        description: 'Velog Backup with AWS Lambda + EventBridge Scheduler',
        date: '2025-07-05',
        url: 'https://velog.velcdn.com/images/yulmwu/post/e258960e-a9e3-4a22-996c-08d7ad9d9db2/image.png',
        tags: ['AWS', 'Velog'],
        homePin: true,
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/26d80d29-ab77-4e1b-bcff-c324418489ce/image.png',
        title: '[AWS] Deployment with ECR, ECS and Fargate',
        description: 'Docker Container Deployment with ECR + ECS Fargate on AWS',
        date: '2025-07-04',
        url: 'https://velog.io/@yulmwu/ecs-deploy',
        tags: ['AWS'],
        homePin: true,
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/96e98f66-9e55-49f7-b979-ee4b92c94689/image.png',
        title: '[AWS] Configure EC2 Bastion Host',
        description: 'Configuring Bastion Host EC2 on AWS',
        date: '2025-07-18',
        url: 'https://velog.io/@yulmwu/ec2-bastion-host',
        tags: ['AWS'],
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/86034b29-11ca-4bd7-b0d1-e68db3472270/image.png',
        title: '[AWS] EC2 Deployment with CodeDeploy + Github Actions (Single EC2 Instance)',
        description: 'EC2 Deployment with AWS CodeDeploy + Github Actions (Single EC2 Instance)',
        date: '2025-07-23',
        url: 'https://velog.io/@yulmwu/aws-codedeploy-single-ec2',
        tags: ['AWS'],
        homePin: true,
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/8c93d6d6-8d11-4f7b-949a-c37c4fcd3720/image.png',
        title: '[AWS] EC2 Deployment with CodeDeploy + Github Actions #2 (with Auto Scaling)',
        description: 'EC2 Deployment with AWS CodeDeploy + Github Actions (EC2 Auto Scaling)',
        date: '2025-07-25',
        url: 'https://velog.io/@yulmwu/aws-codedeploy-asg',
        tags: ['AWS'],
        homePin: true,
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/09a35325-c71c-4859-8b15-7dc78b99441e/image.png',
        title: '[AWS] 요금 환불 요청기',
        description: 'Refund AWS Billing.. Feat. AWS 사랑합니다',
        date: '2025-07-15',
        url: 'https://velog.io/@yulmwu/refund-aws',
        tags: ['AWS', '일상'],
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/fe88f69f-e8fe-4a82-ada8-8a64d5c90fe8/image.png',
        title: '[Tools] AWS 다이어그램 만드는 방법 (draw.io)',
        description: '다이어그램 도구, draw.io 사용법 (AWS 다이어그램 만드는 방법)',
        date: '2025-07-19',
        url: 'https://velog.io/@yulmwu/how-to-use-draw-io',
        tags: ['AWS', 'Tools'],
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/1e17c7f3-549c-4523-be5a-c4375bf0144d/image.png',
        title: '[NestJS] class-transformer @Exclude(), @Expose Decorators and NestJS Interceptor',
        description: 'How can I exclude only specific values when responding to the client?',
        date: '2025-07-28',
        url: 'https://velog.io/@yulmwu/nestjs-class-transformer-exclude-expose',
        tags: ['NestJS', 'class-transformer'],
        homePin: true,
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/1e17c7f3-549c-4523-be5a-c4375bf0144d/image.png',
        title: '[NestJS] IntersectionType: @nestjs/mapped-types vs @nestjs/swagger',
        description: 'DTO inheritance: IntersectionType, @nestjs/mapped-types vs @nestjs/swagger',
        date: '2025-07-28',
        url: 'https://velog.io/@yulmwu/nestjs-intersectiontype',
        tags: ['NestJS'],
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/52d8a60e-ddb3-4b83-a7d1-b3b5ac8545d0/image.png',
        title: '[AWS] ECS, S3 Deployment with CodePipeline',
        description: 'ECS, S3(Static Web Hosting) Deployment with AWS CodePipeline CI/CD',
        date: '2025-08-01',
        url: 'https://velog.io/@yulmwu/aws-codepipeline',
        tags: ['AWS'],
    },
    {
        thumbnail: 'https://velog.velcdn.com/images/yulmwu/post/0a091c94-25ab-4c83-b34f-950f25561bde/image.png',
        title: '[NestJS] Using AWS S3 Presigned URL',
        description: 'What is AWS S3 Presigned URL and How to use it in NestJS',
        date: '2025-08-03',
        url: 'https://velog.io/@yulmwu/nestjs-s3-presigned-url',
        tags: ['NestJS', 'AWS'],
    },
]

export const articles: Article[] = articlesRaw
    .filter((article) => article.homePin)
    .concat(articlesRaw.filter((article) => !article.homePin))
