// project/params.js
import { type RuntimeConfig } from "nuxt/schema"
export const noindex = true // add robot noindex, nofollow meta tag to head of all pages

export const baseUrl = {
    production: '//arcticface.is/',
    staging:'//arcticface.netlify.app/',
    dev:'//localhost:3000/'
}

export const siteName = 'Anything But Advertising'
export const siteContactEmail = 'hello@anythingbutadvertising.com'

export const mastheadUri = {
    light: '/assets/brand/arcticface-type2-white.png',
    dark: '/assets/brand/arcticface-type2-black.png'
}
export const headerHeight = 100
export const timelineHeight = 74
export const emailFrom = "Arctic Face <no-reply@arcticface.is>"
export const getBaseUrl = (config:RuntimeConfig) => {
    return baseUrl[config.public.ENV as keyof typeof baseUrl]
}
export const backgroundStyle = { backgroundSize:`100px 100px`,  backgroundRepeat:`repeat` }
// note globalMeta has no access to process so we must hard code siteUrl for any asset paths
export const getGlobalMeta = () => {
    const meta = [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
    ]
    if ( noindex ) {
		meta.push({ name: 'robots', content: 'noindex, nofollow' })
		console.warn('noindex, nofollow')
	}
    return {
        meta,
        bodyAttrs:{ 
            class:'bg-colour-1 font-brand-serif font-light',
            style:backgroundStyle
        },
        htmlAttrs:{
            lang:'en'
        }
    }
}