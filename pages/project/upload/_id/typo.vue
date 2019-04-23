<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Check the typography
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				<div v-for="(font, index) of fonts" :key="index" class="font-element">
					<component :is="font.key">
						{{ font.key !== 'p' ? font.key.toUpperCase() : font.key }}
					</component>
					<span
						:style="
							`font-family: ${font.family};
							font-weight: ${getFontWeight(weight[index], index)};
							color: ${colors[index].colors[colors[index].active]};
							line-height: ${font.lineheight};
							letter-spacing: ${font.kerning}px;
							font-size: ${getFontSize(font)};`
						"
					>
						The quick brown fox jumps over the lazy dog
					</span>
					<button v-for="(singleWeight, i) of font.weight" :key="i" @click="changeWeight(index, i)">
						{{ singleWeight }}
					</button>
					<button v-for="(singleWeight, i) of font.colors" :key="`colors-${i}`" @click="changeColor(index, i)">
						{{ singleWeight }}
					</button>
				</div>
			</div>
			<button class="button" @click="confirm">
				Confirm and continue
			</button>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			fonts: [],
			weight: [],
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
				const fonts = response.data.data.allFonts.sort((a, b) => {
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
		const fontFamily = this.flattenDeep(allFonts);
		const api = process.env.api;
		Object.keys(fontFamily).forEach((font) => {
			const newStyle = document.createElement('style');
			const baseURL = `${api}/uploads/projects/${this.$route.params.id}/fonts/${font.toLowerCase()}/`;
			const string = fontFamily[font].map((weight) => `url("${baseURL}${font}-${weight}.woff2") format("woff2")`);
			newStyle.appendChild(
				document.createTextNode('@font-face { font-family: ' + font + '; src: ' + string.join(',') + ' ;}')
			);

			document.head.appendChild(newStyle);
		});
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
				this.$router.push(`/project/upload/${this.$route.params.id}/colors`);
			}
		},
		changeWeight(index, i) {
			this.weight[index].active = i;
		},
		changeColor(index, i) {
			this.colors[index].active = i;
		},
		getFontSize(font) {
			const base = font.baseSize;
			const fontSize = base / 80;
			if (font.key === 'p') {
				return `${base}px`;
			} else {
				const grid = 100 / 24;
				return `${grid * fontSize}vw`;
			}
		},
		getFontWeight(font, index) {
			const weightIndex = this.weight[index];
			switch (font.weight[weightIndex.active].toLowerCase()) {
				case 'medium':
					return '500';
				case 'regular':
					return 'normal';
				case 'bold':
					return '700';
				case 'heavy':
					return '900';
				case 'light':
					return '300';
				case 'thin':
					return '200';
				default:
					return 'normal';
			}
		},
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
