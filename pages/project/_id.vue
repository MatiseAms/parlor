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
	async asyncData({ params, app, redirect }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		if (response && response.data) {
			const project = response.data;
			if (project.version === 0) {
				redirect(`/project/upload/${params.id}`);
			} else if (!project.typoStatus) {
				redirect(`/project/upload/${params.id}/fonts`);
			} else if (!project.colorStatus) {
				redirect(`/project/upload/${params.id}/colors`);
			} else if (!project.gridStatus) {
				redirect(`/project/upload/${params.id}/grid`);
			}
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
