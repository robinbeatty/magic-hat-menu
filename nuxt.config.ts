import social from "./assets/project/meta/social";
import { siteName } from "./assets/project/params";

export default defineNuxtConfig({
	ssr:false,
	devtools: { enabled: true },
	routeRules: {},
	modules: [
		'@vueuse/nuxt',
		'@nuxtjs/robots',
		'nuxt-simple-sitemap',
		//'@nuxtseo/module',
		//'@nuxt/image'
	],
	/*
	image: {
		format: ['webp']
	},
	site: {
		url: 'https://arcticface.is',
		name: siteName,
		description: 'Extraordinary journeys in Iceland, crafted by experts.',
		defaultLocale: 'en',
		identity: {
			type: 'Organization'
		},
		twitter: social.twitterHandle,
		facebook: social.facebookHandle,
		instagram: social.instagramHandle,
		linkedIn: social.linkedInHandle,
	},
	*/
	runtimeConfig: {
		indexable:process.env.INDEXABLE,
		public: {
			ENV: process.env.ENV,

			craft: {
				endpoints: {
					staging: process.env.CRAFT_API_ENDPOINT_STAGING,
					production: process.env.CRAFT_API_ENDPOINT_PRODUCTION,
				},
				tokens: {
					craft_private_schema: process.env.CRAFT_PRIVATE_SCHEMA,
				}
			},
		},
	},
	css: [
		'@/assets/css/main.css',
	],
	sitemap: {
		siteUrl: process.env.ROOT_URL,
	},
	postcss: {
		plugins: {
			'tailwindcss/nesting': {},
			tailwindcss: {},
			autoprefixer: {}
		}
	},
	typescript: {
		strict: true
	},
	/*
	vite: {
		server: {
			fs: {
				allow: [
					'./../common'
				]
			}
		}
	}
	*/
})
