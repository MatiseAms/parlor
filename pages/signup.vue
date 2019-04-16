<template>
	<main class="page page--sigup">
		<div class="sigup">
			<div v-if="!this.$store.state.session.loggedIn">
				<h1>Login</h1>
				<form class="signup__form" @submit.prevent="signup">
					<label>First name</label>
					<input v-model="fName" type="text" />
					<label>Last name</label>
					<input v-model="lName" type="text" />
					<label>Email</label>
					<input v-model="email" type="email" />
					<label>Usernam</label>
					<input v-model="username" type="text" />
					<label>password</label>
					<input v-model="password" type="password" />
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
			fName: '',
			lName: '',
			password: '',
			email: '',
			error: ''
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
