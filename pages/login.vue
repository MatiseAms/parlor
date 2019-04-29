<template>
	<main class="page page--login">
		<simple-form
			v-if="!this.$store.state.session.loggedIn"
			title="Login"
			sub-title="It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets automatically."
		>
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
		</simple-form>
	</main>
</template>

<script>
export default {
	components: {
		simpleForm: () => import('~/components/elements/simple-form.vue')
	},
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
</style>
