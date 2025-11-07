import { faDiscord, faGithub, faYoutube, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons'

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
        name: 'Youtube',
        url: 'https://www.youtube.com/@rlawnsdud',
        display: '@rlawnsdud',
        icon: faYoutube,
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
        name: 'Velog',
        url: 'https://velog.io/@yulmwu',
        display: '@yulmwu',
        icon: faLink,
    },
    {
        type: 'blog',
        name: 'Original Kim (Outdated)',
        url: 'https://originalkim.github.io/',
        display: 'originalKim',
        icon: faLink,
    },
    {
        type: 'social',
        name: 'Phone',
        url: 'tel:+821029801336',
        display: '+82 10-2980-1336',
        icon: faLink,
    }
]
