import pkg from './package';
import config from './config/latest';

if (config.env === 'development') {
	process.env.DEBUG = 'nuxt:*';
}

module.exports = {
	mode: 'universal',
	env: {
		environment: config.env || 'production',
		api: config.api
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://use.typekit.net/rhl3ygp.css' }
		]
	},

	/*
	 ** Customize the progress bar color
	 */
	loading: {
		color: '#070c0f'
	},

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{
			ssr: true,
			src: 'plugins/axios'
		}
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: ['nuxt-rfg-icon', '@nuxtjs/axios'],

	/*
	 ** Axios module configuration
	 */
	axios: {
		retry: {
			retries: 3
		},
		baseURL: config.api
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Define toolset shortcut
			config.resolve.alias['~tools'] = 'assets/scss/tools.scss';
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	},

	/*
	 ** Global CSS
	 */
	css: [
		{
			src: '~assets/scss/app.scss',
			lang: 'scss'
		}
	]
};
