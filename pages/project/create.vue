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
</style>
