<template>
	<main class="page page--login">
		<section class="login">
			<div v-if="!this.$store.state.session.loggedIn">
				<h1 class="center">
					Signup
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				<div class="login__form-container">
					<form @submit.prevent="signup">
						<div class="login__form">
							<label class="login__label-el">
								<span class="login__label">First name</span>
								<input
									v-model="fName"
									type="text"
									placeholder="Enter your first name"
									required="true"
									:class="{ error: error.fName }"
								/>
								<span class="login__check"></span>
								<p v-if="error.fName" class="error">
									{{ error.fName }}
								</p>
							</label>
							<label class="login__label-el">
								<span class="login__label">Last name</span>
								<input
									v-model="lName"
									type="text"
									placeholder="Enter your last name"
									required="true"
									:class="{ error: error.lName }"
								/>
								<span class="login__check"></span>
								<p v-if="error.lName" class="error">
									{{ error.lName }}
								</p>
							</label>
							<label class="login__label-el">
								<span class="login__label">Email</span>
								<input
									v-model="email"
									type="text"
									placeholder="Enter your email"
									required="true"
									:class="{ error: error.email }"
								/>
								<span class="login__check"></span>
								<p v-if="error.email" class="error">
									{{ error.email }}
								</p>
							</label>
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
								<nuxt-link to="/login">
									Or login
								</nuxt-link>
								<button class="button" type="submit">
									Signup
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
			fName: '',
			lName: '',
			email: '',
			username: '',
			password: '',
			error: {
				fName: '',
				lName: '',
				email: '',
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
		async signup() {
			if (this.username && this.password) {
				this.fallback();
				const response = await this.$axios({
					method: 'post',
					withCredentials: true,
					url: '/signup',
					data: {
						username: this.username,
						fName: this.fName,
						lName: this.lName,
						email: this.email,
						password: this.password
					}
				});
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
</style>
