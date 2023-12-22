import { getPublicAsset } from '~/assets/common/lib/utils'

export default {
    // based on favicons generated from realfavicongenerator.net
    link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicon/favicon-16x16.png' },
        { rel: 'manifest', href: '/assets/favicon/site.webmanifest' },
        { rel: 'mask-icon', href: '/assets/favicon/safari-pinned-tab.svg', color: '#5bbad5' }
    ],
    meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' }
    ]
}