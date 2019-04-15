<template>
	<div>
		<ul v-if="projects">
			<li v-for="(item, index) of projects" :key="index">
				{{ item.name }}
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
		try {
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
		} catch {
			return {
				projects: []
			};
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
