<template>
	<main class="page page--checklist">
		<checklist-field :title="project.name" sub-title="OVERVIEW">
			<template v-slot:top>
				<bread-crumbs :title="project.name" />
			</template>
			<template v-slot:header>
				<div class="project__overview">
					<ul v-if="project" class="project__list">
						<li v-if="missingParts.includes('font')" class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/upload/font`" class="project__url">
								<h4>
									Fonts
								</h4>
							</nuxt-link>
							<nuxt-link :to="`/project/${$route.params.id}/upload/font`">
								Finish the checklist
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/typography`" class="project__url">
								<h4>
									Typography
								</h4>
								<p>See all Typography</p>
							</nuxt-link>
							<nuxt-link v-if="missingParts.includes('typo')" :to="`/project/${$route.params.id}/upload/typography`">
								Finish the checklist
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/colors`" class="project__url">
								<h4>
									Colors
								</h4>
								<p>See all Colors</p>
							</nuxt-link>
							<nuxt-link v-if="missingParts.includes('colors')" :to="`/project/${$route.params.id}/upload/colors`">
								Finish the checklist
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/grid`" class="project__url">
								<h4>
									Grid
								</h4>
								<p>See Grid layout</p>
							</nuxt-link>
							<nuxt-link v-if="missingParts.includes('grid')" :to="`/project/${$route.params.id}/upload/grid`">
								Finish the checklist
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/images`" class="project__url">
								<h4>
									Static images
								</h4>
								<p>See all images</p>
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/user`" class="project__url">
								<h4>
									Add an user
								</h4>
								<p>Add an user</p>
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/upload`" class="project__url">
								<h4>
									Upload new files
								</h4>
								<p>Upload new files</p>
							</nuxt-link>
						</li>
						<li class="project__item">
							<button class="project__url" @click="deleteProject">
								<h4>Delete "{{ project.name }}"</h4>
							</button>
						</li>
					</ul>
				</div>
			</template>
		</checklist-field>
	</main>
</template>

<script>
export default {
	components: {
		checklistField: () => import('~/components/elements/checklist-field.vue'),
		BreadCrumbs: () => import('~/components/elements/bread-crumbs.vue')
	},
	data() {
		return {
			project: [],
			missingParts: []
		};
	},
	middleware: 'session',
	async asyncData({ params, app, redirect }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		const missingParts = [];
		if (response && response.data) {
			const project = response.data;
			//check status and if we need to finish something before continue
			if (project.version === 0) {
				redirect(`/project/${params.id}/upload`);
			}
			if (!project.typoStatus) {
				missingParts.push('typo');
			}
			if (!project.colorStatus) {
				missingParts.push('colors');
			}
			if (!project.gridStatus) {
				missingParts.push('grid');
			}
			if (!project.fontStatus) {
				missingParts.push('font');
			}
			return {
				project: response.data,
				missingParts
			};
		}
	},
	methods: {
		async deleteProject() {
			const response = await this.$axios({
				method: 'delete',
				withCredentials: true,
				url: `/delete/${this.$route.params.id}`
			});
			if (response && response.data) {
				this.$router.push('/projects');
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.project {
	&__overview {
		margin: grid(1 6);
	}
	&__list {
		display: flex;
		flex-direction: column;
	}
	&__item {
		display: flex;
	}
}
</style>
