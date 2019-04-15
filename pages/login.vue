<template>
	<div class="login">
		<div v-if="!this.$store.state.session.loggedIn" class="login__form">
			<h1>Login</h1>
			<form class="login__form" @submit.prevent="login">
				<input v-model="username" type="text" />
				<input v-model="password" type="text" />
				<input type="submit" />
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: 'Dipsaus',
			password: 'admin'
		};
	},
	beforeCreate() {
		if (this.$store.state.session.loggedIn) {
			this.$router.push('/projects');
		}
	},
	methods: {
		async login() {
			await this.$axios({
				method: 'post',
				withCredentials: true,
				url: '/login',
				data: {
					username: this.username,
					password: this.password
				}
			});
			this.$store.dispatch('session/userLoggedIn');
			console.log(this.$route.query.redirect);
			if (this.$route.query.redirect) {
				this.$router.push(this.$route.query.redirect);
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
