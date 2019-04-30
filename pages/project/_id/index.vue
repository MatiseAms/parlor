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
							<nuxt-link :to="`/project/${$route.params.id}/upload/fonts?redirect=project`" class="project__url">
								<h4>
									Fonts
								</h4>
							</nuxt-link>
							<nuxt-link :to="`/project/${$route.params.id}/upload/fonts?redirect=project`" class="project__warning">
								Upload all fonts
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/typography`" class="project__url">
								<h4>
									Typography
								</h4>
							</nuxt-link>
							<nuxt-link
								v-if="missingParts.includes('typo')"
								:to="`/project/${$route.params.id}/upload/typography?redirect=project`"
								class="project__warning"
							>
								Finish the Typography
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/colors`" class="project__url">
								<h4>
									Colors
								</h4>
							</nuxt-link>
							<nuxt-link
								v-if="missingParts.includes('colors')"
								:to="`/project/${$route.params.id}/upload/colors?redirect=project`"
								class="project__warning"
							>
								Finish the Colors
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/grid`" class="project__url">
								<h4>
									Grid
								</h4>
							</nuxt-link>
							<nuxt-link
								v-if="missingParts.includes('grid')"
								:to="`/project/${$route.params.id}/upload/grid?redirect=project`"
								class="project__warning"
							>
								Finish the Grid layout
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/images`" class="project__url">
								<h4>
									Images
								</h4>
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/user`" class="project__url">
								<h4>
									Add an user
								</h4>
							</nuxt-link>
						</li>
						<li class="project__item">
							<nuxt-link :to="`/project/${$route.params.id}/upload`" class="project__url">
								<h4>
									Upload new files
								</h4>
							</nuxt-link>
						</li>
						<li class="project__item">
							<button class="project__url project__url--delete" @click="deleteProject">
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
			if (confirm('You sure you want to delete the project?')) {
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
		margin: rem(20 0);
		position: relative;
	}
	&__url {
		box-shadow: none;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		text-decoration: none;
		display: flex;
		width: 100%;
		border-bottom: 1px solid color(Gallery, 0.5);
		cursor: pointer;
		transition: 0.3s $easing;
		&:after {
			content: '';
			display: block;
			width: 100%;
			height: 0;
			background: color(Grey, 0.5);
			top: 100%;
			left: 0;
			position: absolute;
			transition: 0.3s $easing;
		}
		&:hover {
			&:after {
				height: 1px;
			}
			h4 {
				opacity: 1;
			}
		}
		h4 {
			font-size: rem(32);
			line-height: 2;
			text-decoration: none;
			color: color(ParlorBlack);
			opacity: 0.5;
			transition: 0.3s $easing;
		}
		&--delete {
			border-bottom: none;
			&:after {
				content: none;
			}
			h4 {
				color: color(Red);
				font-size: rem(16);
			}
		}
	}
	&__warning {
		display: flex;
		align-items: center;
		height: 100%;
		position: absolute;
		right: 0;
		color: color(Orange);
		text-decoration: none;
	}
}
</style>
