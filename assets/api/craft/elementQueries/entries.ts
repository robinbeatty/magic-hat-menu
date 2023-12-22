import * as Type from './../../../common/types/types'
import * as Assets from './assets'

import * as Matrix from './matrix'

export const craftUser = `
    id
    fullName
    email
    status
    friendlyName
    photo {
        ${Assets.asset}
    }
`

export const entryBase = `
    id
    uri
    slug
    title
    sectionHandle
    typeHandle
    postDate
    dateCreated
    dateUpdated
`
export const seoFields = `
    seoTitle
    seoDescription
    seoImage {
        ${Assets.asset}
    }
`
export const menus_menu_entry = `
    ${entryBase}
    date
    ${Matrix.matrixBlocks('menuItems', Matrix.menuItemsBlockTypes)}
`