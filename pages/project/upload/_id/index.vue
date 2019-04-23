<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Upload your project
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				<div class="login__form-container">
					<form @submit.prevent="uploadFiles">
						<div class="login__form">
							<label class="login__label-el">
								<span class="login__label">Files</span>
								<input
									ref="file"
									multiple
									name="sketch"
									type="file"
									value="[]"
									:class="{ error: error }"
									@change="onFileChange"
								/>
								<span class="login__check"></span>
								<p v-if="error" class="error">
									{{ error }}
								</p>
							</label>
							<div class="login__submit">
								<button class="button" type="submit" :disabled="!sketch.length">
									Continue
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data: () => ({
		sketch: [],
		error: ''
	}),
	methods: {
		onFileChange() {
			this.sketch = this.$refs.file.files;
		},
		async uploadFiles() {
			if (this.sketch && this.sketch.length) {
				let formData = new FormData();
				for (let i = 0; i < this.sketch.length; i++) {
					formData.append('sketch', this.sketch[i]);
				}
				const response = await this.$axios.post(`/project/${this.$route.params.id}/upload`, formData, {
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				if (response && response.data && response.data.code === 0) {
					//start checklist
					this.$router.push(`/project/upload/${this.$route.params.id}/fonts`);
				}
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
