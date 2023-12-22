import * as Type from './../../../common/types/types'
export const getImageObjectTransforms = (transforms:(keyof Type.ImageTransforms)[]):string => {
    const transformsQuery = transforms.map(transformKey => {
        const transformName = transformKey.replace('_url','')
        return `${transformKey}:url(transform:"${transformName}")`
    }).join(`
    `)
    return transformsQuery
}
export const assetCustomFields = `
    alt
    caption
`
export const assetBase = `
    id
    filename
    title
    url
    mimeType
`
export const asset = `
    ${assetBase}
    ... on images_Asset {
        
        focalPoint
        ${getImageObjectTransforms([
            'w1920_url',
            'w1440_url',
            'w1024_url',
            'w720_url',
            'w480_url',
            'og_image_url',
            'tw_image_url'
        ])}
    }
    ... on logos_Asset {
        ${getImageObjectTransforms([
            'logo_url',
        ])}
    }
`
export const assetThumb = `
    filename
    title
    id
    ... on images_Asset {
        w480_url:url(transform:"w480")
        focalPoint
    }
`
export const seoImageObject = `
    filename
    url
    og_image_url:url(transform:"og_image")
    tw_image_url:url(transform:"tw_image")
    focalPoint
    id
`
export const videoObject = `
    filename
    url
`
export const assetQuery = `
    query assetQuery($id: [QueryArgument]) {
        asset(id: $id) {
            ${asset}
        }
    }
`
export const assetsQuery = `
    query assetsQuery($id: [QueryArgument]) {
        assets(id: $id) {
            ${asset}
        }
    }
`
