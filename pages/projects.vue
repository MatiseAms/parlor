<template>
	<div>
		<ul v-if="projects">
			<li v-for="(item, index) of projects" :key="index">
				<nuxt-link :to="`/project/${item.id}`">
					{{ item.name }}
				</nuxt-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			projects: []
		};
	},
	async asyncData({ app }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: '/projects'
		});
		if (response && response.data) {
			return {
				projects: response.data
			};
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
