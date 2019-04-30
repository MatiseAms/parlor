<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Add an user to your project
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
				<div class="login__form-container">
					<form @submit.prevent="addUser">
						<div class="login__form">
							<label class="login__label-el">
								<span class="login__label">Username</span>
								<input
									v-model="username"
									type="text"
									placeholder="Enter your username or email"
									required="true"
									:class="{ error: error }"
								/>
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
									Add
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
			error: '',
			succes: ''
		};
	},
	middleware: 'session',
	methods: {
		addUser() {
			if (this.username) {
				this.submit = true;
				this.fallback();
				this.succes = '';
				this.$axios({
					method: 'post',
					withCredentials: true,
					url: `/project/${this.$route.params.id}/new-user`,
					data: {
						email: this.username
					}
				})
					.then((response) => {
						if (response.data && response.data.code === 5) {
							this.fallback(response.data);
							return;
						} else {
							if (response.data.code !== 0) {
								this.fallback(response.data.message);
							} else {
								this.fallback('');
								this.succes = response.data.message;
							}
							return;
						}
					})
					.catch((e) => {
						this.fallback(e.response.data.message);
						return;
					});
				//code 5 is failed login
			} else {
				this.fallback('Missing credentials');
			}
		},
		fallback(message) {
			this.error = message;
		}
	}
};
</script>
