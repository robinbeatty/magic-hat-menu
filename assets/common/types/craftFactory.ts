import * as Schema from "./craftSchema"
export type CraftAuthTokens = "craft_private_schema"

export type FetchParams = {
    method:"post" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "get" | "head" | "patch" | "put" | "delete" | "connect" | "options" | "trace",
    headers:{ [key:string]:string },
    body:string
}
export type SystemAuthors = "system"
export type SystemAuthorIds = { [String in SystemAuthors]:number }

export type CraftHeaders = {
    "Content-Type":string,
    "Accept":string,
    "Authorization":string
}

export interface CraftGraphQlResponseError {
    message: string,//"Username \"robin@robinbeatty.co.uk\" has already been taken.",
    extensions: {
        code: string, //"INVALID",
        category: "graphql"
    },
    locations: { line:number, column:number }[],
    path?: string[] // possible static types should be names of graphql query functions e.g. registerCustomers, entries
}
export type CraftGraphQlResponse<T> = {
	data?: T,
	errors?: CraftGraphQlResponseError[]
}
export type Variables<T = {}> = {
    descendantOf?: number, // entryId
    errorString?:string,
    file?:GraphQLFileInput,
    group?: Schema.CraftCategoryGroups,
    id?: number|number[],
    limit?:number,
    level?:number,
    operation?:string,
    orderBy?:string,
    packages?:string,
    project?:string,
    relatedTo?:string,
    relatedToEntries?: string[],
    route?:string,
    search?:string,
    section?:Schema.CraftSections|Schema.CraftSections[],
    slug?: string,
    tags?: string[], // category id
    title?:string,
    user?:string[],
    email?:string,
    draftId?:number|number[],
    date?: string,
    status?: ("live"|"pending"|"expired"|"disabled")[] | null // null will return all status states
} & {
    [K in keyof T]?: T[K]
}


export type GraphQLFileInput = {
    url?:string,
    fileData?:string, // base64 encoded data
    filename:string
}

export interface VariablesArguments {
    section?: "[String]", // [String]
    slug?: "[String]", // [String]
    id?: "[QueryArgument]", // [QueryArgument]
    group?: "[QueryArgument]", // [QueryArgument]
    sites?: "[QueryArgument]" // [QueryArgument]
    descendantOf?: "Int" // Int,
    tags?:"[QueryArgument]",
    relatedTo?:"[QueryArgument]",
    relatedToEntries?: "[QueryArgument]",
    search?: "String",
    orderBy?: "String",
    title?: "[String]",
    limit?: "Int",
    level?: "Int",
    serviceType:"[QueryArgument]",
    packages:"[QueryArgument]",
    operation:"[QueryArgument]",
    project:"[QueryArgument]",
    elementType:"String",
    file:"FileInput",
    route:"String",
    errorString:"String",
    user:"[QueryArgument]",
    email:"[QueryArgument]",
    status:"[String]",
    draftId:"[Int]"
}

export interface AuthenticatedTokens {
    jwt: string,
    jwtExpiresAt: string,
    refreshToken: string,
    refreshTokenExpiresAt: string,
}
export type Authenticated = { 
    user:Schema.CraftUser|null
} & AuthenticatedTokens