import * as Assets from './assets'
import * as Schema from './../../../common/types/craftSchema'
import * as entries from './entries'

type BlockTypeMapping<BlockTypes> = { blockType: BlockTypes, fragment: string }

export const matrixBlocks = <BlockTypes>(fieldName:string, arrayOfBlockTypes:BlockTypeMapping<BlockTypes>[]) => {
    /* Where arrayOfBlockTypes is an array of blockType objects e.g.
    [{ blockType: blockType, blockQuery:blockQuery }]
    */
    const matrixFieldQuery = arrayOfBlockTypes.map(block => {
        return `
        ... on ${fieldName}_${block.blockType}_BlockType {
            typeHandle
            ${block.fragment} 
        }`
    }).join(`
    `)
    const query = `${fieldName} { ${matrixFieldQuery} }`
    return query
}

const entryBase = `
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
export const menuItemBlockType = `
    typeHandle
    id
    itemName
    description
    notes
    price
    allergens {
        ... on allergens_Category {
            id
            title
        }
    }
    dietaryCompliance(label: true)
    menu {
        ... on menus_Category {
            id
            title
            description
        }
    }
`
export const menuItemsBlockTypes:BlockTypeMapping<Schema.MenuItemsMatrix[number]["typeHandle"]>[] = [
    { blockType: 'menuItem', fragment: menuItemBlockType },
]