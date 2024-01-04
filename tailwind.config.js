/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: 'class',
	content: [
		'./assets/**/*.{vue,js,ts,css}',
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
		'./tailwind.config.js'
	],
	theme: {
		screens: {
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1440px',
			'3xl': '1500px',
			portrait: {
				raw: '(max-height: 540px)'
			}
		},
		minWidth: {
			'2xs': '320px',
			xs: '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1440px',
			'3xl': '1500px',
		},
		extend: {
			colors: {
				'brand-colour-1': 'rgba(252,252,252,1)',
				'brand-colour-2': 'rgba(245,245,244,1)',
				'brand-colour-3': 'rgba(13,148,136,1)',
				'brand-colour-4': 'rgba(124,45,18,1)',
				'brand-colour-5': 'rgba(41,37,36,1)',
				'brand-colour-6': 'rgba(28,25,23,1)',
        
				'brand-red': '#d55c33',
				'brand-midnight': '#162832',
				'brand-green': '#426B69',
				'brand-black': '#14242d',
				'brand-silver': '#F3FDE8',
				'brand-white': 'rgba(252,252,252,1)',
				'brand-cyan': 'rgba(0,255,255,1)',
				'brand-blue': '#34A7E0'
			},
			fontSize: {
				'2xs': '0.6rem'
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
			  }
		}
	},
	plugins: [
		require('tailwind-scrollbar-hide'),
		require('tailwind-gradient-mask-image'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	]
}
