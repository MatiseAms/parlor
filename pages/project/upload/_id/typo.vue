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
								<button class="button" type="submit">
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
	data() {
		return {
			sketch: [],
			error: ''
		};
	},
	methods: {
		onFileChange() {
			this.sketch = this.$refs.file.files;
		},
		async uploadFiles() {
			if (this.sketch) {
				let formData = new FormData();
				for (let i = 0; i < this.sketch.length; i++) {
					formData.append('sketch', this.sketch[i]);
				}
				const response = await this.$axios.post(`/project/${this.$route.params.id}/upload`, formData, {
					method: 'post',
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log(response);
				if (response && response.data && response.data.code === 0) {
					//start checklist
				}
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.login {
	padding: grid(1 0);
	max-width: grid(9);
	margin: 0 auto;
	&__form-container {
		margin: rem(80 0);
	}
	&__form {
		display: flex;
		flex-direction: column;
	}
	&__label-el {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: rem(5 0);
	}
	&__label {
		font-size: rem(16);
		font-weight: 500;
		letter-spacing: 0.5px;
		line-height: 2;
		color: color(ParlorBlack);
		width: 100%;
		display: inline-block;
	}
	&__check {
		width: 100%;
		height: 2px;
		background: color(Grey);
		display: block;
		opacity: 0.2;
	}
	input {
		width: 100%;
		border: none;
		background: transparent;
		box-shadow: none;
		height: rem(40);
		padding: 0;
		margin: 0;
		line-height: rem(21);
		font-size: rem(16);
		color: color(ParlorBlack);
		outline: none;
		&::placeholder {
			opacity: 0.5;
		}
		&:focus {
			& + .login__check {
				opacity: 1;
			}
		}
	}
	&__submit {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: rem(30 0);
		a,
		button {
			margin: rem(0 10);
		}
	}
}

form.submitted {
	input.error {
		& + .login__check {
			opacity: 1;
			background: color(Red);
		}
	}
}
</style>
