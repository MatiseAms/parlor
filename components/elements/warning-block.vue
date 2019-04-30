<template>
	<div class="project-warning">
		<p>
			You have not finished the checklist yet. The following data has not been checked yet and therefore can not be
			editted.
		</p>
		<nuxt-link :to="`/project/${$route.params.id}/upload/${name}?redirect=project`" class="button">
			Finish checklist
		</nuxt-link>
	</div>
</template>
<script>
export default {
	props: {
		name: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		items: []
	})
};
</script>
<style lang="scss">
@import '~tools';
.project-warning {
	margin: rem(60 0);
	text-align: center;
}
</style>
