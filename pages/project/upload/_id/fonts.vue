<template>
	<main class="page page--login">
		<section v-if="missingFonts.length" class="login">
			<div>
				<h1 class="center">
					We are missing some fonts
				</h1>
				<p class="center grey">
					There are missing some fonts in your project. Please provide a valid upload.
				</p>
			</div>
			<div class="login__form-container">
				<form @submit.prevent="uploadFonts">
					<div v-for="(item, index) of missingFonts" :key="index" class="login__form">
						<label class="login__label-el">
							<span class="login__label">Missing Font: {{ item }}</span>
							<input
								:ref="item"
								accept=".woff2"
								multiple
								:name="item"
								type="file"
								value="[]"
								:class="{ error: error[item] }"
								@change="onFileChange(item)"
							/>
							<span class="login__check"></span>
							<p v-if="error[item]" class="error">
								{{ error[item] }}
							</p>
						</label>
					</div>
					<div class="login__submit">
						<button class="button" type="submit" :disabled="disabled">
							Continue
						</button>
					</div>
				</form>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data: () => ({
		error: {},
		fonts: {},
		disabled: true,
		status: '',
		timeout: 4,
		missingFonts: []
	}),
	async asyncData({ params, app, redirect }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}/upload/typo`
		});
		if (response && response.data && response.data.code === 0) {
			//succes
			if (!response.data.data.missingFonts.length) {
				redirect(`/project/upload/${params.id}/typo`);
			} else {
				return {
					status: 0,
					missingFonts: response.data.data.missingFonts
				};
			}
		} else {
			return {
				status: 1
			};
		}
	},
	created() {
		if (this.status === 1) {
			this.notReady();
		} else if (this.status === 0) {
			this.everythingIsReady();
		}
	},
	methods: {
		onFileChange(item) {
			this.fonts[item] = this.$refs[item][0].files;
			const items = Object.values(this.fonts).filter((font) => font);
			this.disabled = items.length !== this.missingFonts.length;
		},
		async uploadFonts() {
			let formData = new FormData();
			Object.keys(this.fonts).forEach((font) => {
				for (let i = 0; i < this.fonts[font].length; i++) {
					formData.append(font, this.fonts[font][i]);
				}
			});
			const response = await this.$axios.post(`/project/${this.$route.params.id}/upload/fonts`, formData, {
				method: 'post',
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			if (response && response.data && response.data.code === 0) {
				this.$router.push(`/project/upload/${this.$route.params.id}/typo`);
			}
		},
		notReady() {
			setTimeout(async () => {
				await this.checkIfStatusChanged();
				if (this.status === 1 && this.timeout !== 0) {
					this.timeout--;
					this.notReady();
				} else if (this.status === 0) {
					this.everythingIsReady();
				}
			}, 1000);
		},
		async checkIfStatusChanged() {
			const response = await this.$axios({
				method: 'get',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/typo`
			});
			if (response && response.data && response.data.code === 0) {
				//succes
				if (!response.data.data.missingFonts.length) {
					this.$router.push(`/project/upload/${this.$route.params.id}/typo`);
				} else {
					this.status = 0;
					this.missingFonts = response.data.data.missingFonts;
					return true;
				}
			} else {
				this.status = 1;
				return true;
			}
		},
		everythingIsReady() {
			console.log(this.missingFonts);
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
