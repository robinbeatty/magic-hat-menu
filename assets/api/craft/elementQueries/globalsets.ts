import * as Type from './../../../common/types/types'
import * as Assets from './assets'
import * as Matrix from './matrix'

export const magicHatMenu_GlobalSet = `
    name
    ${Matrix.matrixBlocks('menuItems', Matrix.menuItemsBlockTypes)}
    openingHours {
        day
        openFrom
        openTo
    }
    body
    handle
`