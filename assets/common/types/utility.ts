import * as Schema from "./craftSchema"

export type MatrixBlockReturnFields<T> = {
    [K in keyof T]?: {
        [key:string]: string[] // could be improved
    }
}
export type MatrixFieldMutationBlockField<BlockType> = {
    id: string, // id of the block to update or newX where X is the index of the new block, which should correspond to the ids in sortOrder
} & {
    [K in keyof BlockType]?: BlockType[K]
}
export type MatrixFieldMutation<BlockType extends { typeHandle: string }> = {
    blocks: BlockType extends never ? undefined : ({
        typeHandle: BlockType["typeHandle"],
        fields:{
            [K in keyof MatrixFieldMutationBlockField<BlockType>]?:unknown
        }
    })[],
    sortOrder:string[]
}
export type MutationFields<T> = {
    [K in keyof Omit<T,"id">]?: {
        val: unknown;
        arg: string|null; // null on matrix field as arg requires a typeHandle
    }
} & {
    id?:{
        val:number,
        arg:"ID"
    }
}
export type MutationParams<T> = {
    section: Schema.CraftSections,
    entryType: Schema.CraftEntryTypes,
    id?:string,
    draftId?:string, // if updating a draft
    fields: MutationFields<T>,
    authorId?: number,
    returnFields: (keyof T|MatrixBlockReturnFields<T>)[]
}
export type DateStringFormats = "dd-mm-yyyy"|"yyyy-mm-dd"|"dd/mm/yyyy"|"yyyy/mm/dd"
export type DateRange = { 0:Date|null, 1?:Date|null }
export type MonthDayObj = {
    date:number,
    day:number,
    month:number,
    year:number,
    isCurrentMonth:boolean,
    isToday:boolean
}
export type MonthIndex = number

export type DateStringSlashed = `${string}/${string}/${string}`
export type DateStringHyphenated = `${string}-${string}-${string}`
export type ModifierKeys = {
    command:boolean,
    control:boolean,
    shift:boolean,
    option:boolean
}
export type TabSwitchItem = {
    label:string,
    value:string
}
export type AlgoliaResponseHit = {
    objectID:string, // entry id
    title:string,
    slug:string,
    Service_Type:string,
    Images:string|string[],
    Tags:string[]
}

export type HeroBlockTypes = "hero"
export type HeroBlockType = {
    id:string,
    typeHandle:HeroBlockTypes,
    heroType:"fader"|"slider"|"grid"|"chocolateBox"
    assets:(Schema.ImageObj|Schema.VideoObj)[],
    heading:string|null,
    subheading:string|null,
}
export type HeroMatrix = HeroBlockType[]
export type BreadcrumbsTypes = "BreadcrumbsDots" | "BreadcrumbsNumbers"
export type UseMessage = {
    title: string,
    body: string,
    button: {
        title: string,
        to?: string,
        close?: boolean,
        class?:string
        action?:() => void
    }[]
    closeable?:boolean,
    action?:() => void
}|null