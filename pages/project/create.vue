<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Create a new project
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				<div class="login__form-container">
					<form @submit.prevent="createProject">
						<div class="login__form">
							<label class="login__label-el">
								<span class="login__label">Project name</span>
								<input
									v-model="name"
									type="text"
									placeholder="Enter your desired project name"
									required="true"
									:class="{ error: error.name }"
								/>
								<span class="login__check"></span>
								<p v-if="error.name" class="error">
									{{ error.name }}
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
			name: '',
			error: {
				name: ''
			}
		};
	},
	methods: {
		async createProject() {
			if (this.name) {
				this.submit = true;
				this.error.name = '';
				const response = await this.$axios({
					method: 'post',
					withCredentials: true,
					url: '/newproject',
					data: {
						name: this.name
					}
				});
				//code 5 is failed login
				if (response.data && response.data.code !== 0) {
					this.error.name = response.data.message;
					return;
				} else if (response.data.code === 0) {
					this.$router.push(`/project/upload/${response.data.projectId}`);
					return;
				}
			}
			this.error.name = 'Missing information';
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
