import nationalities from '../fieldOptions/countries'
import * as Schema from './craftSchema'
import * as Craft from './craftFactory'

export * from './craftSchema'
export * from './craftFactory'

export type NationalityValue = typeof nationalities[number]["code"]
export type Nationality = { label:string, value:NationalityValue }
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type StorageTypes = "sessionStorage"|"localStorage"

export type StorageData = (Craft.Authenticated & {
    set:number // date
})|null


