<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center" :style="`font-family: Favorit`">
					Check the typography
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				{{ fonts }}
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			fontFamily: '',
			fonts: [],
			error: ''
		};
	},
	async asyncData({ params, app, redirect }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}/upload/typo`
		});
		if (response && response.data && response.data.code === 0) {
			if (response.data.data.missingFonts.length) {
				redirect(`/project/upload/${params.id}/fonts`);
			} else {
				return {
					fonts: response.data.data.allFonts
				};
			}
		}
	},
	mounted() {
		const allFonts = this.fonts.map((font) => {
			const weight = font.weight.map((weight) => weight);
			return {
				name: font.family,
				weight
			};
		});
		allFonts[0].weight.push('Medium');
		const fontFamily = this.flattenDeep(allFonts);
		const api = process.env.api;
		Object.keys(fontFamily).forEach((font) => {
			const newStyle = document.createElement('style');
			const baseURL = `${api}/uploads/projects/${this.$route.params.id}/fonts/${font}/`;
			const string = fontFamily[font].map((weight) => `url("${baseURL}${font}-${weight}.woff2") format("woff2")`);
			newStyle.appendChild(
				document.createTextNode('@font-face { font-family: ' + font + '; src: ' + string.join(',') + ' ;}')
			);

			document.head.appendChild(newStyle);
		});
	},
	methods: {
		flattenDeep(arr1) {
			return arr1.reduce((acc, curr) => {
				if (acc[curr.name]) {
					acc[curr.name] = [...new Set(acc[curr.name].concat(curr.weight))];
				} else {
					acc[curr.name] = [...curr.weight];
				}
				return acc;
			}, {});
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
