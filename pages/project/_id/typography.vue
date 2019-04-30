<template>
	<main class="page page--checklist">
		<checklist-field title="Typography" sub-title="OVERVIEW">
			<template v-slot:top>
				<bread-crumbs :title="title" />
			</template>
			<template v-slot:header>
				<typography-block :fonts="fonts" :edit-mode="status" />
			</template>
			<template v-slot:footer>
				<div class="checklist__footer">
					<p v-if="error" class="error">
						{{ error }}
					</p>
					<p v-if="succes" class="succes">
						{{ succes }}
					</p>
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
		TypographyBlock: () => import('~/components/elements/typography-block.vue'),
		BreadCrumbs: () => import('~/components/elements/bread-crumbs.vue')
	},
	data() {
		return {
			fonts: [],
			weight: [],
			error: '',
			succes: ''
		};
	},
	async asyncData({ params, app }) {
		const responseProject = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		let fonts;
		let status = false;
		let title = '';
		if (responseProject && responseProject.data && responseProject.data.typoStatus) {
			fonts = responseProject.data.typographies;
			title = responseProject.data.name;
			status = true;
		} else {
			const response = await app.$axios({
				method: 'get',
				withCredentials: true,
				url: `/project/${params.id}/upload/typo?scan=true`
			});
			if (response && response.data && response.data.code === 0) {
				fonts = response.data.data.allFonts;
				title = response.data.projectTitle;
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
			colors,
			status,
			title
		};
	},
	created() {
		this.$nuxt.$on('Typo_change', () => {
			this.succes = '';
			this.error = '';
		});
		this.$nuxt.$on('Typo_save', () => {
			this.confirm();
		});
	},
	beforeDestroy() {
		this.$nuxt.$off('Typo_save');
		this.$nuxt.$off('Typo_change');
	},
	methods: {
		buttonText() {
			if (!this.status) {
				return 'Go to checklist';
			} else {
				return 'Edit';
			}
		},
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
				this.succes = 'Typography updated';
			} else {
				this.error = response.data.message;
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
