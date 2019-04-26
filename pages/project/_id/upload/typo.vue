<template>
	<main class="page page--checklist">
		<checklist-field title="Typography">
			<template v-slot:header>
				<typography-block :fonts="fonts" />
			</template>
			<template v-slot:footer>
				<div class="checklist__footer">
					<nuxt-link :to="`/project/${$route.params.id}/upload/colors`" class="checklist__skip">
						Skip Typography
					</nuxt-link>
					<button class="button button--black" @click="confirm">
						Next step
					</button>
				</div>
			</template>
		</checklist-field>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	components: {
		checklistField: () => import('~/components/elements/checklist-field.vue'),
		TypographyBlock: () => import('~/components/elements/typography-block.vue')
	},
	data() {
		return {
			fonts: [],
			weight: [],
			error: ''
		};
	},
	async asyncData({ params, app }) {
		const responseProject = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		let fonts;
		if (responseProject && responseProject.data && responseProject.data.typoStatus) {
			fonts = responseProject.data.typographies;
		} else {
			const response = await app.$axios({
				method: 'get',
				withCredentials: true,
				url: `/project/${params.id}/upload/typo`
			});
			if (response && response.data && response.data.code === 0) {
				fonts = response.data.data.allFonts;
			}
		}
		//some sorting and mappingx
		fonts = fonts.sort((a, b) => {
			const nameA = a.key.toUpperCase();
			const nameB = b.key.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
		const weight = fonts.map((font) => ({
			weight: font.weight,
			active: 0
		}));
		const colors = fonts.map((font) => ({
			colors: font.colors,
			active: 0
		}));
		return {
			fonts,
			weight,
			colors
		};
	},
	methods: {
		async confirm() {
			const response = await this.$axios({
				method: 'post',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/typo`,
				data: {
					typographies: this.fonts
				}
			});
			if (response && response.data && response.data.code === 0) {
				//start checklist
				this.$router.push(`/project/${this.$route.params.id}/upload/colors`);
			}
		},
		getFontSize(font) {
			const base = font.baseSize;
			const fontSize = base / 80;
			if (font.key === 'p') {
				return `${base}px`;
			} else {
				const grid = 100 / 24;
				const size = Math.round(grid * fontSize * 100) / 100;
				return `${size}vw`;
			}
		}
	}
};
//we don't need to include the fonts anymore, maybe later
// mounted() {
// 	const allFonts = this.fonts.map((font) => {
// 		const weight = font.weight.map((weight) => weight);
// 		return {
// 			name: font.family,
// 			weight
// 		};
// 	});
// 	const fontFamily = this.flattenDeep(allFonts);
// 	const api = process.env.api;
// 	Object.keys(fontFamily).forEach((font) => {
// 		const newStyle = document.createElement('style');
// 		const baseURL = `${api}/uploads/projects/${this.$route.params.id}/fonts/${font.toLowerCase()}/`;
// 		const string = fontFamily[font].map((weight) => `url("${baseURL}${font}-${weight}.woff2") format("woff2")`);
// 		newStyle.appendChild(
// 			document.createTextNode('@font-face { font-family: ' + font + '; src: ' + string.join(',') + ' ;}')
// 		);
//
// 		document.head.appendChild(newStyle);
// 	});
// },
</script>
