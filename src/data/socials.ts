import { faDiscord, faGithub, faYoutube, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faLink } from '@fortawesome/free-solid-svg-icons'

export interface Social {
    type: 'social' | 'blog' | 'mail'
    name: string
    url: string
    display: string
    icon: IconDefinition
}

export const socials: Social[] = [
    {
        type: 'social',
        name: 'GitHub',
        url: 'https://github.com/yulmwu',
        display: '@yulmwu',
        icon: faGithub,
    },
    {
        type: 'social',
        name: 'Homepage',
        url: 'https://swua.kr',
        display: 'swua.kr',
        icon: faHome,
    },
    {
        type: 'social',
        name: 'Discord',
        url: 'https://discord.com/users/615383266412724246',
        display: '@rlawnsdud',
        icon: faDiscord,
    },
    {
        type: 'mail',
        name: 'Email',
        url: 'mailto:normal8781@gmail.com',
        display: 'normal8781@gmail.com',
        icon: faEnvelope,
    },
    {
        type: 'blog',
        name: 'Blog',
        url: 'https://velog.io/@yulmwu',
        display: 'Velog — @yulmwu',
        icon: faLink,
    },
    {
        type: 'blog',
        name: 'Blog (Outdated)',
        url: 'https://originalkim.github.io/',
        display: 'Blog — originalKim',
        icon: faLink,
    }
]
