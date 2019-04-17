<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Check the typography
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			sketch: [],
			error: ''
		};
	},
	async asyncData({ params, app }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}/upload/typo`
		});
		if (response && response.data && response.data.code === 0) {
			//succes
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
