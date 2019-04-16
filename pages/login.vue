<template>
	<main class="page page--login">
		<div class="login">
			<div v-if="!this.$store.state.session.loggedIn" class="login__form">
				<h1>Login</h1>
				<form class="login__form" @submit.prevent="login">
					<input v-model="username" type="text" />
					<input v-model="password" type="text" />
					<input type="submit" />
				</form>
			</div>
			<p v-if="error" class="error">
				{{ error }}
			</p>
		</div>
	</main>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			error: ''
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
					this.fallback(response.data.message);
					return;
				} else {
					this.$store.dispatch('session/userLoggedIn');
					if (this.$route.query.redirect) {
						this.$router.push(this.$route.query.redirect);
					}
					return;
				}
			}
			this.fallback('Missing credentials');
		},
		fallback(message) {
			this.error = message;
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
