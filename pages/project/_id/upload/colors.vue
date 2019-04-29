<template>
	<main class="page page--checklist">
		<checklist-field title="Colors" sub-title="CHECKLIST">
			<template v-slot:header>
				<colors-block :colors="colors" :edit-mode="true" />
			</template>
			<template v-slot:footer>
				<div class="checklist__footer">
					<nuxt-link :to="`/project/${$route.params.id}/upload/grid`" class="checklist__skip">
						Skip
					</nuxt-link>
					<button class="button button--black" @click="confirm">
						Save
					</button>
				</div>
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
		} else {
			const response = await app.$axios({
				method: 'get',
				withCredentials: true,
				url: `/project/${params.id}/upload/colors`
			});
			if (response && response.data && response.data.code === 0) {
				return {
					colors: response.data.data
				};
			}
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
