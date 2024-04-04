import { type Ref, type WatchSource } from 'vue'
import { type RouteLocationNormalized, type LocationQuery } from 'vue-router'
import * as Type from 'assets/common/types/types'
import * as Schema from 'assets/common/types/craftSchema'
import * as Craft from 'assets/common/types/craftFactory'
import * as Utility from 'assets/common/types/utility'
import { cleanSlug, getRoutePath, getURLQueryString } from 'assets/common/lib/utils'

import { emailContact, siteHandle } from './project'
import { type RuntimeConfig } from 'nuxt/schema'


interface RefreshOptions {
	dedupe?: boolean
}

type ErrorT = {
	[key:string]:string // i think
}
type AsyncData<DataT, ErrorT> = {
	data: Ref<{ data:DataT } | null>
	pending: Ref<boolean>
	execute: () => Promise<void>
	refresh: (opts?: RefreshOptions) => Promise<void>
	error: Ref<ErrorT | null>
}
type AsyncDataOptions<DataT> = {
	server?: boolean
	lazy?: boolean
	default?: () => DataT | Ref<DataT> | null
	transform?: (input: DataT) => DataT
	pick?: string[]
	watch?: WatchSource[]
	immediate?: boolean
  }
export const getErrorMessage = (message: string) => {
	return {
		title: 'Something went wrong',
		body: message,
		button: [{
			title: 'Close',
			close: true
		}]
	}
}

export const genericErrorMessage = `
	<p>
		There's been an error communicating with our API. 
		We've been notified of the problem and are working to fix it.
	</p>
	<p>
		If you'd like to email us at <a class="underline" href="mailto:${emailContact}">${emailContact}</a>, 
		one of our agents will be happy to help you with your request.
	</p>
`
export const getGenericError = () => {
	return {
		title: 'Something went wrong',
		body: genericErrorMessage,
		button: [{
			title: 'Close',
			close: true
		}]
	}
}
export const getEmptyCraftGraphQlResponseError = (e?:unknown):Type.CraftGraphQlResponseError => {
	return {
		message:e as string || genericErrorMessage,
		extensions:{
			code:"INVALID",
			category:"graphql"
		},
		locations:[],
		path:[]
	}
}

export const reportResponseTime = (startMs:number) => {
	console.log(`Response returned in ${new Date().getTime() - startMs}ms`)
}
export const getCraftPreviewTokens = (route: RouteLocationNormalized|null) => {
	if ( !route ) {
		return {}
	}
	const query: LocationQuery = route.query
	
	const headers:Record<string, string> = {}
	
	if ('x-craft-preview' in query) {
		// it's a separate window
		headers['X-Craft-Preview'] = query['x-craft-preview'] as string
	}
	if ('x-craft-live-preview' in query) {
		// it's in the craft preview iframe
		headers['X-Craft-Live-Preview'] = query['x-craft-live-preview'] as string
	}
	if ('token' in query) {
		headers['X-Craft-Token'] = query.token as string
	}

	return headers
}
export const getAuthToken = (token:Type.CraftAuthTokens) => {
	const config = useRuntimeConfig()
	return config.public.craft.tokens[token]
	
}
export const getCraftHeaders = (craftPreviewTokens: LocationQuery | false, token:Type.CraftAuthTokens) => {
	const baseHeaders = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: getAuthToken(token)
	}
	// is it a preview request from craft?
	if (craftPreviewTokens) {
		// headers with token
		return {
			...baseHeaders,
			...craftPreviewTokens
		}
	}
	// it's a normal web request, return standard headers
	return baseHeaders
}

export const getEndpoint = (config:RuntimeConfig, craftPreviewTokens?: LocationQuery) => {
	const env = config.public.ENV
	let endpointUrl = config.public.craft.endpoints.production
	if ( env === 'staging' ) {
		endpointUrl = config.public.craft.endpoints.staging
	}
	const useTokenParam = false
	// append token param to endpoint if it's a preview request
	const endpoint = craftPreviewTokens && useTokenParam ? `${endpointUrl}?token=${craftPreviewTokens.token}` : endpointUrl
	//console.log(endpoint)
	return endpoint
}
export const getFetchParams = ({ query, variables }: { query:string, variables:Type.Variables }) => {
	const route = useRoute()
	let craftPreviewTokens:LocationQuery = {}
	if ( route ) {
		craftPreviewTokens = getCraftPreviewTokens(route)
	}
	const headers = getCraftHeaders(craftPreviewTokens, 'craft_private_schema')
	const config = useRuntimeConfig()
	const endpoint = getEndpoint(config, craftPreviewTokens)
	const params:Type.FetchParams = {
		method:'POST',
		headers,
		body:JSON.stringify({ query, variables })
	}
	return {
		endpoint,
		params
	}
}
export const handleAsyncDataResponse = <T>(res:AsyncData<T,ErrorT>) => {
	try {
		const { data, error, pending, refresh } = res
		if (data.value?.data) {
			const elementType = Object.keys(data.value.data)[0] as keyof T
			const element = data.value.data[elementType]
			return element
		}
		if (error.value) {
			console.error(error.value)
		}
	} catch (e) {
		console.error(e)
	}
}
export const getFetchKey = ({ variables }: { variables:Type.Variables })  => {
	const inputString = JSON.stringify({ variables })
	return inputString
}
export const craftElementLoader = async <T>(queries: {
    [key:string]: { query: string, variables: Type.Variables }
}, options?:AsyncDataOptions<T>) => {
	const start:number = new Date().getTime()
	const elementKeys: string[] = Object.keys(queries)
	
	const resArr = await Promise.all(elementKeys.map(async (key) => {
		const { query, variables } = queries[key as keyof typeof queries]
		const { endpoint, params } = getFetchParams({ query, variables })
		//console.log({ query, variables, endpoint, params })
		const fetchKey = getFetchKey({ variables })

		let server = true
		if ( options?.server === false ) {
			server = options.server
		}
		try {
			const res = await useAsyncData<T>(fetchKey, () => $fetch<T>(endpoint, params), { server }) as AsyncData<T,ErrorT>
			const element = handleAsyncDataResponse<T>(res)	

			return [key, element]
		} catch(e) {
			console.error(e)
			return [key, null]
		}
	}))
	// map the array of responses to an object of element keys as cast as T
	const filteredRes = resArr.filter(res => res)
	const obj = Object.fromEntries(filteredRes) as T

	console.log(`${elementKeys.length} queries returned in ${new Date().getTime() - start}ms`)
	
	return obj
}
export const handleFetchResponse = <T>({ data, errors }:Type.CraftGraphQlResponse<T>, message:Ref<Utility.UseMessage>) => {
	if ( !data && !errors ) {
		console.trace('Network error')
		return null
	}
	if ( errors ) {
		const error: Type.CraftGraphQlResponseError = errors[0]
		if ( error?.message ) {
			// show user readable error returned from craft
			console.trace(error.message)
			message.value = getErrorMessage(error.message)
		} else {
			// unknown error
			console.trace(errors)
			message.value = getErrorMessage(error.message)
		}
		return null
	}
	if ( data ) {
		const elementType = Object.keys(data)[0] as keyof T
		return data[elementType] as T
	} else {
		return null
	}
}
export const craftFetch = async <DataT>({ query, variables, token, authorization }: { query:string, variables?:Type.Variables, token?:Type.CraftAuthTokens, authorization?:string }) => {
	const config = useRuntimeConfig()
	const endpoint = getEndpoint(config)
	let headers = {}
	if ( authorization ) {
		headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `JWT ${authorization}`
		}
	}
	if ( token ) {
		headers = getCraftHeaders(false, token)
	}
	if ( !token && !authorization ) {
		console.error('No token or authorization provided')
	}
	if ( !variables ) {
		variables = {}
	}
	//console.log({ query, variables  })
	try {
		const { data, errors } = await $fetch<{ 
			data?:DataT, 
			errors?:Type.CraftGraphQlResponseError[] 
		}>(endpoint, {
			method:'POST',
			headers,
			body:JSON.stringify({ query, variables })
		})
		return { data, errors }
	} catch (e) {
		console.trace(e)
		return { data:undefined, errors:[ getEmptyCraftGraphQlResponseError(e) ] }
	}
}
export const getSlug = (route:RouteLocationNormalized) => cleanSlug(getRoutePath(route).slug)

export const handleCraftErrors = (errors:Type.CraftGraphQlResponseError[], message:Ref<Utility.UseMessage>, silent?:boolean) => {
	if ( !silent ) {
		message.value = {
			title:'Something went wrong',
			body:errors.map(({ message }) => message).join(', '),
			closeable:false,
			button:[{
				title:'Close',
				close:true
			}]
		}
	}
}
export const authenticateUser = async ({ email, password }: { email: string, password: string }) => {
    const mutation = 'authenticate'
    interface DataT {
        authenticate: Type.Authenticated
    }
    const query = `mutation Authenticate {
        ${mutation}(
          email: "${email}"
          password: "${password}"
        ) {
          jwt
          jwtExpiresAt
          refreshToken
          refreshTokenExpiresAt
          user {
            id
			email
            fullName
            friendlyName
            wishlist {
                id
            }
          }
        }
    }`
    return await craftFetch<DataT>({ query, token: 'craft_private_schema' })
}
export const getRefreshToken = async ({ refreshToken }: { refreshToken: string }) => {
    const mutation = 'refreshToken'

    const query = `mutation RefreshToken {
        ${mutation}(refreshToken: "${refreshToken}") {
            jwt
            jwtExpiresAt
            refreshToken
            refreshTokenExpiresAt
        }
    }`

    interface DataT {
        refreshToken: {
            jwt:string,
            jwtExpiresAt:string,
            refreshToken:string,
            refreshTokenExpiresAt:string
        }
    }
    return await craftFetch<DataT>({ query, token: 'craft_private_schema' })
}