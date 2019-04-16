<template>
	<main class="page page--login">
		<section class="login">
			<div v-if="!this.$store.state.session.loggedIn">
				<h1 class="center">
					Get started!
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				<div class="login__form-container">
					<form @submit.prevent="login">
						<div class="login__form">
							<label class="login__label-el">
								<span class="login__label">Username</span>
								<input
									v-model="username"
									type="text"
									placeholder="Enter your username or email"
									required="true"
									:class="{ error: error.username }"
								/>
								<span class="login__check"></span>
								<p v-if="error.username" class="error">
									{{ error.username }}
								</p>
							</label>
							<label class="login__label-el">
								<span class="login__label">Password</span>
								<input
									v-model="password"
									type="password"
									placeholder="Enter your password"
									required="true"
									:class="{ error: error.password }"
								/>
								<span class="login__check"></span>
								<p v-if="error.password" class="error">
									{{ error.password }}
								</p>
							</label>
							<div class="login__submit">
								<nuxt-link to="/signup">
									Or create an account
								</nuxt-link>
								<button class="button" type="submit">
									Login
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
			username: '',
			password: '',
			error: {
				username: '',
				password: ''
			}
		};
	},
	beforeCreate() {
		if (this.$store.state.session.loggedIn) {
			this.$router.push('/projects');
		}
	},
	methods: {
		async login() {
			if (this.username && this.password) {
				this.submit = true;
				this.fallback();
				const response = await this.$axios({
					method: 'post',
					withCredentials: true,
					url: '/login',
					data: {
						username: this.username,
						password: this.password
					}
				});
				//code 5 is failed login
				if (response.data && response.data.code === 5) {
					this.fallback(response.data);
					return;
				} else {
					this.$store.dispatch('session/userLoggedIn', response.data.fName);
					if (response.data && response.data.code === 4 && !this.$route.query.redirect) {
						this.$router.push(response.data.redirect);
					} else if (this.$route.query.redirect) {
						this.$router.push(this.$route.query.redirect);
					}
					return;
				}
			}
			this.fallback('Missing credentials');
		},
		fallback(message = {}) {
			const el = message.error;
			if (el) {
				const allErrors = this.error;
				let newError = {};
				Object.keys(allErrors).forEach((error) => {
					newError[error] = el === error ? message.message : '';
				});
				this.error = newError;
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
