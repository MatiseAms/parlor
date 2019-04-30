<template>
	<main class="page page--login">
		<simple-form title="Profile" sub-title="Upload your new profile picture here.">
			<form @submit.prevent="uploadFiles">
				<div class="login__form">
					<label class="login__label-el">
						<span class="login__label">Profile image</span>
						<input ref="file" name="sketch" type="file" value="[]" :class="{ error: error }" @change="onFileChange" />
						<span class="login__check"></span>
						<p v-if="error" class="error">
							{{ error }}
						</p>
						<p v-if="succes" class="succes">
							{{ succes }}
						</p>
					</label>
					<div class="login__submit">
						<button class="button" type="submit">
							Upload file
						</button>
					</div>
				</div>
			</form>
		</simple-form>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	components: {
		simpleForm: () => import('~/components/elements/simple-form.vue')
	},
	data() {
		return {
			image: null,
			error: '',
			succes: ''
		};
	},
	methods: {
		onFileChange() {
			this.image = this.$refs.file.files;
		},
		async uploadFiles() {
			this.succes = '';
			this.error = '';
			if (this.image) {
				let formData = new FormData();
				for (let i = 0; i < this.image.length; i++) {
					formData.append('image', this.image[i]);
				}
				const response = await this.$axios.post(`/user/image`, formData, {
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				if (response && response.data && response.data.code === 0) {
					//start checklist
					this.succes = response.data.message;
				} else {
					this.error = response.data.message;
				}
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
