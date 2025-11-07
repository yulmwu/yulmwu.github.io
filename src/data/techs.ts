export type TechStacks = {
    [category: string]: string[]
}

export const techStacks: TechStacks = {
    'Languages / Runtime': ['TypeScript', 'JavaScript', 'Python', 'C/C++', 'Go', 'Node.js'],
    'Backend / Database / ...': ['Express', 'NestJS', 'TypeORM', 'PostgreSQL', 'Redis'],
    'DevOps / Cloud / CI·CD': ['AWS', 'Kubernetes', 'ArgoCD', 'Prometheus', 'Istio', 'Docker', 'Github Actions'],
    'Other / Tools': ['Kafka', 'RabbitMQ', 'ElasticSearch', 'Git', 'Linux/MacOS'],
}
