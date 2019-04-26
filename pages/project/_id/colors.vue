<template>
	<main class="page page--checklist">
		<checklist-field title="Colors">
			<template v-slot:header>
				<colors-block :colors="colors" />
			</template>
		</checklist-field>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	components: {
		checklistField: () => import('~/components/elements/checklist-field.vue'),
		ColorsBlock: () => import('~/components/elements/colors-block.vue')
	},
	data() {
		return {
			colors: []
		};
	},
	async asyncData({ params, app }) {
		const responseProject = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		if (responseProject && responseProject.data && responseProject.data.colorStatus) {
			return {
				colors: responseProject.data.colors
			};
		}
	},
	methods: {
		async confirm() {
			const response = await this.$axios({
				method: 'post',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/colors`,
				data: {
					colors: this.colors
				}
			});
			if (response && response.data && response.data.code === 0) {
				this.$router.push(`/project/${this.$route.params.id}/upload/grid`);
			}
		}
	}
};
</script>
