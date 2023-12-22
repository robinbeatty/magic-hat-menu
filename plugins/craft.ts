import * as Type from "~/assets/common/types/types";
import * as Schema from "~/assets/common/types/craftSchema";
import * as Craft from "~/assets/common/types/craftFactory";
import * as Util from "~/assets/common/types/utility";
import { type LocationQuery } from "vue-router";
import { getCraftHeaders, getEndpoint, handleFetchResponse, craftFetch, getCraftPreviewTokens } from "~/assets/project/rpc";
import * as entries from "~/assets/api/craft/elementQueries/entries";
import * as globalsets from "~/assets/api/craft/elementQueries/globalsets";

const getFetchParams = ({ query, variables }: { query:string, variables:Type.Variables }) => {
	const route = useRoute()
	let craftPreviewTokens:LocationQuery = {}
	if ( route ) {
		craftPreviewTokens = getCraftPreviewTokens(route)
	}
	const fetchParams:Craft.FetchParams = {
		method:'POST',
		headers: getCraftHeaders(craftPreviewTokens, 'craft_private_schema'),
		body: JSON.stringify({ query, variables })
	}
	return fetchParams
}
const getAsyncDataParams = ({ query, variables }: { query:string, variables:Craft.Variables }) => {
	const config = useRuntimeConfig()
	const endpoint = getEndpoint(config)
	const route = useRoute()
	const body = JSON.stringify({ query, variables })
	const key = body.slice(0,256).toLowerCase()
	const fetchParams = {
		method: 'POST' as const,
		headers:getCraftHeaders(getCraftPreviewTokens(route), 'craft_private_schema'),
		body
	}
	return { key, endpoint, fetchParams }
}
export default defineNuxtPlugin((NuxtApp) => {
	const message = useMessage()
	return {
		provide: {
			craft: {
				query: {
					menu: (date:Util.DateStringHyphenated) => {
						type DataT = Schema.MenuEntry

						const { key, endpoint, fetchParams } = getAsyncDataParams({
							query:`query menuEntry($section: [String], $date: [QueryArgument]) {
								entry(section: $section, date: $date) {
									...on menus_menu_Entry {
										${entries.menus_menu_entry}
									}
								}
							}`,
							variables:{
								section: 'menus',
								date: `${date}T00:00:00+00:00`
							}
						})
						return useAsyncData(key, ():Promise<Type.CraftGraphQlResponse<DataT>> => $fetch(endpoint, fetchParams), {
							transform: (data:Type.CraftGraphQlResponse<DataT>) => {
								console.log(data)
								return handleFetchResponse<DataT>(data, message)
							}
						})
					},
					menus: () => {
						type DataT = Schema.MenuEntry[]

						const { key, endpoint, fetchParams } = getAsyncDataParams({
							query:`query menuEntry($section: [String], $limit: Int) {
								entries(section: $section, orderBy: "date desc", limit:$limit) {
									...on menus_menu_Entry {
										${entries.menus_menu_entry}
									}
								}
							}`,
							variables:{
								section: 'menus',
								limit:5
							}
						})
						return useAsyncData(key, ():Promise<Type.CraftGraphQlResponse<DataT>> => $fetch(endpoint, fetchParams), {
							transform: (data:Type.CraftGraphQlResponse<DataT>) => {
								console.log(data)
								return handleFetchResponse<DataT>(data, message)
							}
						})
					},
					globalSet: {
						magicHatMenu: () => {
							type DataT = Schema.MagicHatGlobalSet

							const { key, endpoint, fetchParams } = getAsyncDataParams({
								query:`query magicHatMenu {
									globalSet(handle: "magicHatMenu") {
										...on magicHatMenu_GlobalSet {
											${globalsets.magicHatMenu_GlobalSet}
										}
									}
								}`,
								variables:{}
							})
							return useAsyncData(key, ():Promise<Type.CraftGraphQlResponse<DataT>> => $fetch(endpoint, fetchParams), {
								transform: (data:Type.CraftGraphQlResponse<DataT>) => {
									console.log(data)
									return handleFetchResponse<DataT>(data, message)
								}
							})

						}
					}
				},
				mutate: {
					
				}
			}
		}
	}
})