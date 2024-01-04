<script setup lang="ts">
import * as Schema from '~/assets/common/types/craftSchema'
import { redactor, titleCase, unique } from '~/assets/common/lib/utils';
import * as Util from '~/assets/common/types/utility'
const { $craft } = useNuxtApp()
const route = useRoute()
const { data:entries } = await $craft.query.menus()
const { data:globalSet } = await $craft.query.globalSet.magicHatMenu()

const getMostRecentMenuDate = (entries:Schema.MenuEntry[]) => {
    const dates = entries.map(entry => new Date(entry.date).getTime())
    const mostRecentDate = Math.max(...dates)
    return new Date(mostRecentDate).toISOString().split('T')[0]
}
const getTodayAsString = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    return yyyy.toString() + '-' + mm.toString() + '-' + dd.toString() as Util.DateStringHyphenated
}
let targetDateString:Util.DateStringHyphenated = getTodayAsString()

const isDate = (date:string):boolean => {
    return !isNaN(Date.parse(date))
}
const getDateFromDdMmYyyy = (date:string):Date => {
    const parts = date.split('-')
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
}
if ( route.query['date'] ) {
    let date = new Date(route.query['date'] as string)
    if ( !isDate(route.query['date'] as string) ) {
        console.warn('Invalid date provided in query string, reformatting...')
        date = getDateFromDdMmYyyy(route.query['date'] as string)
    }
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = date.getFullYear()
    targetDateString = yyyy.toString() + '-' + mm.toString() + '-' + dd.toString() as Util.DateStringHyphenated
} else {
    targetDateString = getMostRecentMenuDate(entries.value || []) as Util.DateStringHyphenated
}
const projectorView = route.query['projector'] == 'true'

const getDateString = (dateString:string) => {
    const segments = dateString.split('-')
    let yyyy = segments[0]
    let mm = segments[1]
    let dd = segments[2]
    if ( segments[2].length > 2 ) {
        yyyy = segments[2]
        dd = segments[0]
    }
    return new Date(`${yyyy}-${mm}-${dd}`).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

// find the menu with the most recent date, that is not in the future
const menu = entries.value?.find(entry => {
    const menuDate = new Date(entry.date).getTime()
    const targetDate = new Date(targetDateString).getTime()
    return menuDate === targetDate
}) || null

const mostRecentMenuDate = getMostRecentMenuDate(entries.value || [])

const getOpeningHoursForDate = (date:Util.DateStringHyphenated) => {
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = daysOfTheWeek[new Date(date).getDay()]?.toLowerCase()
    const openingHours = globalSet.value?.openingHours.find(row => {
        return row.day == dayName
    })
    if ( openingHours ) {
        return {
            day:titleCase(dayName),
            open:new Date(openingHours.openFrom).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
            close:new Date(openingHours.openTo).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        }
    }
    return null
}
const getOpeningHoursString = (date:Util.DateStringHyphenated) => {
    const openingHours = getOpeningHoursForDate(date)
    if ( openingHours ) {
        return `Kitchen Open ${openingHours.open} - ${openingHours.close}`
    }
    return `Kitchen Closed`
}
const getComplianceString = (string:string) => {
    if ( string.toLowerCase() == 'vegan' ) return 've'
    if ( string.toLowerCase() == 'vegetarian' ) return 'v'
    // else take the initial letters of the string
    return string.split(' ').map(word => word[0]).join('')
}
const getAllergensString = (allergens:Schema.AllergensCategory[]) => {
    return `Contains ${allergens.map(allergen => {
        return allergen.title
    }).join(', ')}`
}
const aggregatedMenu = computed(() => {
    if ( !menu ) return []
    const persistentMenuItems = globalSet.value?.menuItems || []

    const getCategoryTitle = (category:Schema.MenusCategory[]) => {
        return category.length ? category[0].title : ''
    }
    const getMenuCategoryDescription = (menu:Schema.MenuEntry, title:Schema.MenuEntry["menuItems"][number]["menu"][number]["title"]) => {
        return menu.menuItems.map(menuItem => menuItem.menu).flat().find(menu => menu.title == title)?.description || ''
    }
    const menuTypes = unique([
        ...menu.menuItems.map(item => getCategoryTitle(item.menu)), 
        ...persistentMenuItems.map(item => getCategoryTitle(item.menu))
    ].flat()).filter(item => item.length)


    return menuTypes.map(menuType => {
        const menuItems = menu.menuItems.filter(item => getCategoryTitle(item.menu) == menuType).map(item => {
            return {
                ...item,
                type:'menu'
            }
        })
        const persistentMenuItems = globalSet.value?.menuItems.filter(item => getCategoryTitle(item.menu) == menuType).map(item => {
            return {
                ...item,
                type:'persistent'
            }
        }) || []

        return {
            menuType,
            menuDescription:getMenuCategoryDescription(menu, menuType),
            items:[...menuItems, ...persistentMenuItems]
        }
    })
})

</script>
<template>
    <div class="font-mono p-3 md:p-10 min-h-screen dark:bg-stone-900 dark:text-stone-200" :class="[projectorView && 'lg:max-h-screen overflow-hidden']">
        <main v-if="menu" class="w-full items-start">
            <div>
                <div class="text-center w-full py-5">
                    <h1 class="xl:text-5xl">Magic Hat</h1>
                    <div class="uppercase text-lg md:text-3xl xl:text-2xl mt-3">
                        Coffee \ Kitchen \ Events
                    </div>
                    <div class="uppercase text-lg mt-5">
                        {{getOpeningHoursString(targetDateString)}}
                    </div>
                </div>
                <div class="border-y-2 border-black dark:border-stone-700 w-full min-h-6">
                    <div class="uppercase text-sm text-center p-3">{{ getDateString(targetDateString) }}</div>
                </div>
                <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-12 text-left">
                    <div v-for="menu in aggregatedMenu" :key="menu.menuType" class="border-b-2 border-black dark:border-stone-700 pt-5 pb-6 xl:pt-10 xl:pb-10">
                        <h2 class="text-2xl leading-none">
                            {{ menu.menuType }}
                            <span v-if="menu.menuDescription" class="text-xs">{{ menu.menuDescription }}</span>
                        </h2>
                        <div class="grid grid-cols-1 gap-5 mt-5">
                            <div v-for="item in menu.items" :key="item.id" class="flex gap-5 justify-between items-baseline">
                                <div class="max-w-lg space-y-1">
                                    <div class="text-lg leading-tight uppercase">
                                        <h4 class="mr-2 font-normal font-mono inline">
                                            {{item.itemName}}
                                        </h4>
                                        <span v-for="label in item.dietaryCompliance" :key="label" class="text-2xs uppercase rounded-sm border border-black dark:border-current font-medium font-sans size-5 text-black dark:text-current inline-flex items-center justify-center leading-[0] align-top mt-0">
                                            <span>{{ getComplianceString(label) }}</span>
                                        </span>
                                    </div>
                                    <div class="text-sm lowercase">{{item.description}}</div>
                                    <div class="leading-none">
                                        <span v-if="item.allergens.length">
                                            <span class="text-2xs">{{ getAllergensString(item.allergens) }}</span>
                                            <br v-if="item.notes?.length" />
                                            <span v-if="item.notes?.length" class="text-2xs">{{item.notes}}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="text-sm justify-end items-baseline">{{item.price}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden xl:block col-span-2"></div>
                    <div v-if="globalSet?.body" class="md:col-span-2 xl:col-span-2 space-y-3">
                        <div v-html="redactor(globalSet?.body)" class="mt-5 space-y-3 text-xs [&>h2]:text-2xl"></div>
                        <div>
                            <NuxtLink to="https://www.themagichatcafe.co.uk/" :external="true" class="underline">themagichatcafe.co.uk</NuxtLink>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <section v-else class="h-screen w-screen flex-center">
            <div class="space-y-5">
                <div class="text-2xl">No menu found for <br />{{ getDateString(targetDateString) }}</div>
                <div>
                    <NuxtLink :to="`/?date=${mostRecentMenuDate}`" :external="true" class="button border-2 border-black hover:text-white hover:bg-black">View most recent menu</NuxtLink>
                </div>
            </div>
       </section>
    </div>
</template>