import * as Type from '../types/types'


export const isClient = () => true
export const isDev = () => false

export const getPublicAsset = (uri: string) => {
	if (uri.split('')[0] != '/') {
		console.warn('Asset paths should begin with "/". ', uri)
	}
	return uri
}
export const download = (path: string) => {
	const link = document.createElement('a')
	// If you don't know the name or want to use
	// the webserver default set name = ''
	const name = ''
	link.setAttribute('download', name)
	link.setAttribute('target', '_blank')
	link.href = path
	document.body.appendChild(link)
	link.click()
	link.remove()
}
export const normalizeString = (str: string | null) => str ? str.normalize('NFD').replace(/[\u0300-\u036F]/g, '') : '' // Remove accents 
export const titleCase = (string:string) => string.charAt(0).toUpperCase() + string.slice(1)
export const cleanSlug = (slug:string) => {
	// remove hash and query props from slug
	let cleanedSlug:string = ''
    
	const toRemove = ['#', '?']
    
	toRemove.forEach((char) => {
		if (slug.includes(char)) {
			const dirtySlugSegs = slug.split(char)
			// remove the last item (after the hash) from the arr
			cleanedSlug = dirtySlugSegs.slice(0, dirtySlugSegs.length - 1).join('/')
		}
	})
	const happySlug = cleanedSlug || slug
	return happySlug
}
export const cleanParagraphs = (html: string | null) => {
	if (!html) {
		return null
	}
	const cleanedHtml = html
		.replaceAll('\n<p>', '<p>')
		.replaceAll('\t', '')
		.replaceAll('<p></p>', '')
		.replaceAll('<br /></p>', '</p>')
	return normalizeString(cleanedHtml)
}
export const getDocumentHeight = () => {
	// Returns the max height of the document's contents, including margins + borders.
	const body = document.body; const html = document.documentElement
	const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
	return height
}
export const imageTransformWidths:Type.ImageTransformWidth[] = [
	480,
	720,
	1024,
	1440,
	1920
]
export const getImageTransformKey = (width:Type.ImageTransformWidth):keyof Type.ImageTransforms => {
	return `w${width}_url`
}
export const getImageTransform = (image: Type.ImageObj, transform?: Type.ImageTransformWidth):string => {
	const defaultWidth = 1440
	if (transform) {
		// get the transform defined or the next available transform that exists in the image object
		let width:Type.ImageTransformWidth|null = null

		const targetTransforms = imageTransformWidths.filter(val => {
			return val <= transform
		})
		if ( targetTransforms.length ) {
			targetTransforms.every(val => {
				const key = getImageTransformKey(val)
				if ( key in image && image[key] ) {
					width = val
					return false
				}
				return true
			})
		} else {
			const key = getImageTransformKey(defaultWidth)
			if ( key in image && image[key] ) {
				width = defaultWidth
			}
		}
		if ( width ) {
			const key = getImageTransformKey(width)
			if ( key in image && image[key] ) {
				return image[key] as string
			}
		}
	}
	// return image url
	console.log(transform, image)
	console.warn(`Image ${image.filename} used without transform`)
	return image.url
}

export const iterateObject = <T>(obj:T, count:number) => {
	const arr:T[] = []
	for (let i = 0; i < count; i++) {
		arr.push(obj)
	}
	return arr
}
export const iterateNumber = (startIx:number, length:number) => {
    let arr:number[] = []
    for (let i = startIx; i < length+startIx; i++) {
        arr.push(i)
    }
    return arr
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const daysOfTheWeek = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export const arrayOrNull = (array:any[]) => {
	// return null if the array is empty
	return array !== undefined ? array.length ? array : null : null
}
export const preloadImage = (src:string) => {
	// preload another transform passed in as prop, where this.preload is the transform key e.g. "normal_url"
	if (src) {
		const img = new Image()
		img.src = src
	}
}
export const preloadVideo = (src:string) => {
	if (src) {
		const video = document.createElement('video')
		video.src = src
	}
}
export const gridConditions = [
	// where key is number of grid items
	{ count: 1, grid: 'grid-cols-1 grid-flow-row-dense', items: [''] }, 
	{ count: 2, grid: 'grid-cols-2 grid-flow-row-dense', items: [''] }, 
	{ count: 3, grid: 'grid-cols-2 grid-rows-2 grid-flow-row-dense', items: ['row-span-2', '', ''] },
	{
		count: 4,
		grid: 'grid-cols-5 grid-rows-2 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-full',
			'col-span-2',
			'col-span-1'
		] 
	},
	{
		count: 5,
		grid: 'grid-cols-5 grid-rows-3 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-2',
			'col-span-2 row-span-2',
			'col-span-3 row-span-1',
			'col-span-1 row-span-1'
		] 
	},
	{
		count: 6,
		grid: 'grid-cols-5 grid-rows-3 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-2',
			'col-span-2 row-span-2',
			'col-span-1 row-span-1',
			'col-span-1 row-span-1',
			'col-span-1 row-span-1',
			'col-span-2 row-span-1'
		] 
	},
	{
		count: 7,
		grid: 'grid-cols-5 grid-rows-3 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-2',
			'col-span-2 row-span-1',
			'col-span-2 row-span-1',
			'col-span-2 row-span-1',
			'col-span-1 row-span-1'
		] 
	},
	{
		count: 8,
		grid: 'grid-cols-5 grid-rows-3 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-2',
			'col-span-2 row-span-1',
			'col-span-2 row-span-1',
			'col-span-1 row-span-1'
		] 
	},
	{
		count: 9,
		grid: 'grid-cols-5 grid-rows-3 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-2',
			'col-span-2 row-span-1',
			'col-span-1 row-span-1'
		] 
	},
	{
		count: 10,
		grid: 'grid-cols-5 grid-rows-3 grid-flow-row-dense',
		items: [
			'col-span-3 row-span-2',
			'col-span-1 row-span-1'
		] 
	}
]
export const getGridColsStyle = (cols:number) => {
	return { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr)` }
}
export const getGridColsSpanStyle = (span:number) => {
	return { gridColumn: `span ${span} / span ${span}` }
}
export const getFocalPoint = (imageObj:Type.ImageObj):string => {
	const format = (val:string) => (parseFloat(val) * 100) + '%'
	return imageObj.focalPoint ? `${format(imageObj.focalPoint[0].toString())} ${format(imageObj.focalPoint[1].toString())}` : '50% 50%'
}
export const getPathSegments = (path:string) => path.split('/')
export const getRoutePath = (route:{ fullPath:string }) => {
	const segments = getPathSegments(route.fullPath)
	return {
		segments,
		slug: segments[segments.length - 1]
	}
}
export const toRad = (deg:number) => deg * (Math.PI / 180)

export const scrollToTop = () => {
	try {
		// @ts-ignore
		if ( typeof process !== undefined && 'client' in process && process.client && window !== undefined ) {
			window.scrollTo({ top: 0 })
		}
	} catch (e) {
		// don't worry about it
	}
}
export const paginate = (length:number, p:number, i:number) => {
	if (Boolean(length)) {
		// returns the index of the next item from the pagination direction (-1 or 1)
		return p == 1 ? i + p > length - 1 ? 0 : i + p : i + p < 0 ? length - 1 : i + p
	} else { return 1 }
}
export const nextIx = (arr:any[], i:number) => arr[i + 1] ? i + 1 : 0
export const prevIx = (arr:any[], i:number) => arr[i - 1] ? i - 1 : arr.length - 1

/*
export const isInViewport = (i, element, scrollTop, windowHeight) => {
    const elementTop = element.offsetTop
    const elementBottom = element.offsetTop + element.clientHeight
    const scrollBottom = Math.round(scrollTop,1) + windowHeight
    console.log({scrollBottom,elementBottom})
    return scrollBottom > elementBottom
}
*/
export const randomInt = (max:number) => Math.floor(Math.random() * max)

export const getGeometry = (el:HTMLElement) => {
	// the offset from the relatively postioned parent element
	if (el) {
		return {
			top: el.offsetTop,
			height: el.offsetHeight
		}
	} else {
		console.error('element not found', el)
		return { top: 0, height: 0 }
	}
}
export const cleanStringToArray = (string: string) => string.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(char => char.toLowerCase())
export const kebabCase = (string:string) => cleanStringToArray(string.replaceAll('í','i'))?.join('-')
export const createRoutePath = (arr:string[]) => '/' + arr.map(seg => kebabCase(seg)).join('/')
export const getAbsoluteUrl = (url:string) => '//' + url.replace('https://', '').replace('http://', '')
export const scrollToElement = (elementId:string) => {
	const el = document.querySelector('#' + elementId)
	if (el) {
		el.scrollIntoView({ behavior: 'smooth' })
	} else {
		console.error(`Element '#${elementId} not found`)
	}
}
export const getNthBlockOfTypes = <BlockType>(blocks: Type.ContentBlocks, typeHandles: Type.ContentBlocks[number]["typeHandle"], n:number) => {
	try {
		const blocksOfType = blocks.filter(block => typeHandles.includes(block.typeHandle as Type.ContentBlocks[number]["typeHandle"]))
		if (!blocksOfType.length) {
			return null
		}
		const nthBlock = blocksOfType[n]
		return nthBlock as BlockType
	} catch (e) {
		console.error(e)
		return null
	}
}
export const stripTags = (string: string|null) => {
	if ( !string ) {
		return null
	}
	try {
		return string.replace(/(<([^>]+)>)/gi, '').replace('&amp;', '')
	} catch (e) {
		console.error(e)
		return ''
	}
}

export const hasExpired = (expiryDate: number) => new Date().getTime() > expiryDate

export const formatDate = (atom: string) => {
	const ms = Date.parse(atom)
	const date = new Date(ms)
	return date
}
export const iterate = (val:any, count:number) => {
	const arr = []
	for (let i = 0; i < count; i++) {
		arr.push(val)
	}
	return arr
}
export const unplauralize = (string: string) => {
	const arr: string[] = string.split('')
	const lastChar = arr[arr.length - 1]
	return lastChar === 's' ? arr.slice(0, arr.length - 1).join('') : string
}
export const msPerSecond = 1000
export const msPerMinute = 60000
export const msPerHour = 3600000
export const msPerDay = 86400000

export const getMs = (params: { days?: number, hours?: number, minutes?: number, seconds?: number }) => {
	let ms = 0
	if (params.days) {
		ms += params.days * msPerDay
	}
	if (params.hours) {
		ms += params.hours * msPerHour
	}
	if (params.minutes) {
		ms += params.minutes * msPerMinute
	}
	if (params.seconds) {
		ms += params.seconds * msPerSecond
	}
	return ms
}

export const dateDiff = ( t1:number, t2:number ) => {
    const diff = t2 - t1
    return {
        milliseconds: diff,
        seconds: Math.floor( diff / msPerSecond ),
        minutes: Math.floor( diff / msPerMinute ),
        hours: Math.floor( diff / msPerHour ),
        days: Math.floor( diff / msPerDay )
    }
}
export const formatRelativeDate = (d:Date, params?:{ short?:boolean }) => {
	const date:number = d.getTime()

	
	const msPerMonth = msPerDay * 30
	const msPerYear = msPerDay * 365

	const elapsed = Date.now() - date
	const getString = (n: number, unit: string) => {
		if ( params?.short ) {
			return `${n}${unit[0]} ago`
		}
		const plauralisedUnit = n > 1 ? `${unit}s` : unit
		if ( n === 0 && unit === 'second' ) {
			return 'just now'
		}
		return `${n} ${plauralisedUnit} ago`
	}
	if (elapsed < msPerMinute) {
		return getString(Math.round(elapsed / msPerSecond), 'second')
	}
	if (elapsed < msPerHour) {
		return getString(Math.round(elapsed / msPerMinute), 'minute')
	}
	if (elapsed < msPerDay) {
		return getString(Math.round(elapsed / msPerHour), 'hour') 
	}
	if (elapsed < msPerMonth) {
		return getString(Math.round(elapsed / msPerDay), 'day')
	}
	if (elapsed < msPerYear) {
		return getString(Math.round(elapsed / msPerMonth), 'month')
	} else {
		return getString(Math.round(elapsed / msPerYear), 'year')
	}
}
export const integerify = (string: string) => {
	let result: number|null
	if (string === 'null') {
		result = null
	}
	try {
		result = parseInt(string)
	} catch (e) {
		console.error(e)
		return null
	}
	return result
}

export const getURLQueryString = (query:Record<string,string>) => {
	return Object.keys(query).map(key => {
		return `${key}=${query[key as keyof typeof query]}`
	}).join('&')
}
export const craftLinkToRel = (string:string) => {
	// remove the domain from craft generated internal links so they are relative to the site
	return string.replace('https://app.hl.is', '')
}
export const redactor = (html:string|null):string => {
	if (html) {
		const text = cleanParagraphs(craftLinkToRel(html))?.replace('<p>','<p class="redactor">')
		if ( text ) {
			return text
		}
	}
	return ''
}
export const getSplitName = (fullName:string) => {
	const segs = fullName.split(' ')
	if ( segs.length > 1 ) {
		return {
			firstName:segs[0],
			lastName:segs[1]
		}
	} else {
		return {
			firstName:segs[0],
			lastName:''
		}
	}
}
export const truncateParagraphs = (html:string, limit:number) => {
	const paragraphs = html.split('</p>')
	paragraphs.splice(limit, paragraphs.length-1)
	return paragraphs.join('</p>')
}
export const truncateText = (text:string, chars:number) => {
	if ( text.length > chars ) {
		return text.slice(0,chars) + '...'
	}
	return text
}

export const generateUUID = (length?:number) => {
	if (!length) {
		length = 8
	}
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789';
	let key = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		key += characters[randomIndex];
	}
	return key;
}


export const omitKeys = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
	const _ = { ...obj }
	keys.forEach((key) => delete _[key])
	return _
  }
export const pickKeys = <T extends object, K extends keyof T>( obj: T, keys: Array<K> ): Pick<T, K> => {
  const ret = Object.create(null);
  for (const k of keys) {
    ret[k] = obj[k];
  }
  return ret;
}
export const numberify = (value:number|string|null) => {
    if ( value ) {
        if ( typeof value === 'string' ) {
            return parseInt(value)
        }
        return value
    }
    return 0
}
export const sum = (arr:number[]) => arr.reduce((a, b) => a + b, 0)
export const formatCurrency = (val:number|string, currency:string):string => {
	return val.toLocaleString('en', { currency:currency || 'ISK' })
}
export const getElementWidth = (el:Element):number => {
    if ( el ) {
        return el.getBoundingClientRect().width
    }
    return 0
}
export const getElementX = (el:Element) => el.getBoundingClientRect().x
export const delay = async (ms:number) => {
	return await new Promise((resolve) => setTimeout(() => resolve, ms))
}
export const JsonStringifyEscaped = (obj:any) => {
	const escapedString = JSON.stringify(obj).replace(/"/g, '\\"')
	return escapedString.slice(2,escapedString.length-2)
}

export const clone = <T>(data:T) => JSON.parse(JSON.stringify(data)) as T

export function bezierCurveAt(percent:number, curve:{ x1:number, y1:number, x2:number, y2:number }) {
	const { x1, y1, x2, y2 } = curve;
	const t = percent;
	const p0 = 0;
	const p3 = 1;
	const p1 = x1;
	const p2 = x2;
	const S = 1 - t;
	const t2 = t * t;
	const S2 = S * S;
	const tS = t * S;
	const B = 3 * tS * p2 + 3 * t2 * S * p1 + t2 * t * p3 + S2 * S * p0;
	return B;
  }
  export const unique = <T>(arr:T[]) => {
	return [...new Set(arr)]
  }
export const getAssetsImages = (assets:(Type.ImageObj|Type.VideoObj)[]):Type.ImageObj[] => {
    return assets.filter(asset => asset.mimeType.includes('image')) as Type.ImageObj[]
}
export const getAssetsVideos = (assets:(Type.ImageObj|Type.VideoObj)[]):Type.VideoObj[] => {
    return assets.filter(asset => asset.mimeType.includes('video')) as Type.VideoObj[]
}