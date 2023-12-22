import type { type } from "os"

export type CraftUserGroups = "staff"
export type UserTypes = "staff"

export type CraftSections 
    = "menus"

export type CraftEntryTypes 
    = "menu"   
    

export type CraftCategoryGroups 
    = "foodTypes"|"dietraryCompliance"|"allergens"|"menus"|"organisationTypes"

export type CraftElementTypes 
    = "entry" 
    | "entries" 
    | "asset" 
    | "assets" 
    | "category" 
    | "categories" 
    | "group" 
    | "groups"
export type CraftGlobalSets = "magicHatMenu"
export type AssetCustomFields = {
}
export type ImageTransformWidth = 480|720|1024|1440|1920

export interface ImageTransforms {
    w1920_url?: string,
    w1440_url?: string,
    w1024_url?: string,
    w720_url?: string,
    w480_url?: string,
    og_image_url?:string,
    tw_image_url?:string,
    logo_url?:string
}
export type ImageObj = AssetBase & AssetCustomFields & {
    focalPoint: number[],
} & ImageTransforms
export type VideoObj = AssetBase & AssetCustomFields

export type AssetBase = {
    id: string,
    filename: string,
    title:string,
    url: string,
    mimeType:string, // could limit this further?
    pending?:boolean,
}
export interface SeoImageObj {
    og_image_url:string,
    tw_image_url:string,
    filename: string,
    url: string,
    focalPoint: number[],
    id: string
}


export type TimeString = `${string}:${string}`

export interface EntryBase {
    id: string,
    uri: string,
    slug: string,
    title: string,
    sectionHandle: CraftSections,
    typeHandle: CraftEntryTypes,
    postDate: string,
    dateCreated: string,
    dateUpdated: string
}
export type CraftUser = {
    id:string,
    fullName:string,
    friendlyName:string,
    email:string,
    status:string
    photo:ImageObj|null
}
export type AllergensCategory = {
    id:string,
    title:string
}
export type MenusCategory = {
    id:string,
    title:string,
    description:string
}
export type MenuItemBlockType = {
    typeHandle: "menuItem",
    id:string,
    itemName:string,
    description:string,
    notes:string,
    price:string,
    allergens:AllergensCategory[],
    dietaryCompliance:string[],
    menu:MenusCategory[],
}
export type MenuItemsMatrix = MenuItemBlockType[]

export type MenuEntry = EntryBase & {
    date:string,
    menuItems:MenuItemsMatrix
}
export type DateObj = {
    year:number,
    month:number,
    day:number,
}
export type DaysOfTheWeek = "monday"|"tuesday"|"wednesday"|"thursday"|"friday"|"saturday"|"sunday"
export type OpeningHoursTable = {
    day:DaysOfTheWeek,
    openFrom:string,
    openTo:string
}[]
export type MagicHatGlobalSet = {
    name:string,
    menuItems:MenuItemsMatrix,
    openingHours:OpeningHoursTable,
    body:string,
    handle:string
}