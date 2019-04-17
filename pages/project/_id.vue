<template>
	<div>
		<ul v-if="project">
			{{
				project.colors.map((color) => color.value)
			}}
			{{
				project.typographies.map((typo) => typo.key)
			}}
			<nuxt-link :to="`/project/upload/${$route.params.id}`" class="button">
				Update project
			</nuxt-link>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			project: []
		};
	},
	async asyncData({ params, app }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		if (response && response.data) {
			return {
				project: response.data
			};
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
