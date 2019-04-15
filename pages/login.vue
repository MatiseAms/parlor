<template>
	<div class="login">
		<h1>
			Login
		</h1>
		<form class="login__form" @submit.prevent="login">
			<input v-model="username" type="text" />
			<input v-model="password" type="text" />
			<input type="submit" />
		</form>
		<button @click="logout">
			log out
		</button>
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
		},
		async logout() {
			await this.$axios({
				withCredentials: true,
				method: 'post',
				url: '/logout'
			});
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
