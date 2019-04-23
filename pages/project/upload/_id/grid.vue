<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Check the Grid
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
			</div>
			<div class="login__form-container">
				<form @submit.prevent="confirm">
					<label class="login__label-el">
						<span class="login__label">Grid columns</span>
						<input v-model="grid" type="text" />
						<span class="login__check"></span>
						<p v-if="error" class="error">
							{{ error }}
						</p>
					</label>
					<div class="login__submit">
						<button class="button" @click="confirm">
							Finish checklist
						</button>
					</div>
				</form>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			grid: 0,
			error: ''
		};
	},
	async asyncData({ params, app }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}/upload/grid`
		});
		if (response && response.data && response.data.code === 0) {
			return {
				grid: response.data.data
			};
		}
	},
	methods: {
		async confirm() {
			const response = await this.$axios({
				method: 'post',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/grid`,
				data: {
					grid: this.grid
				}
			});
			if (response && response.data && response.data.code === 0) {
				//start checklist
				this.$router.push(`/project/${this.$route.params.id}`);
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
