<template>
	<div>
		<ul v-if="project">
			<li>
				<nuxt-link v-if="missingParts.includes('font')" :to="`/project/${$route.params.id}/upload/fonts`">
					Finish the checklist and add all fonts
				</nuxt-link>
			</li>
			<li>
				<nuxt-link :to="`/project/${$route.params.id}/typo`">
					<h2>
						Typography
					</h2>
					<p>See all Typography</p>
				</nuxt-link>
				<nuxt-link v-if="missingParts.includes('typo')" :to="`/project/${$route.params.id}/upload/typo`">
					Finish the checklist
				</nuxt-link>
			</li>
			<li>
				<nuxt-link :to="`/project/${$route.params.id}/colors`">
					<h2>
						Colors
					</h2>
					<p>See all Colors</p>
				</nuxt-link>
				<nuxt-link v-if="missingParts.includes('colors')" :to="`/project/${$route.params.id}/upload/colors`">
					Finish the checklist
				</nuxt-link>
			</li>
			<li>
				<nuxt-link :to="`/project/${$route.params.id}/grid`">
					<h2>
						Grid
					</h2>
					<p>See Grid layout</p>
				</nuxt-link>
				<nuxt-link v-if="missingParts.includes('grid')" :to="`/project/${$route.params.id}/upload/fonts`">
					Finish the checklist
				</nuxt-link>
			</li>
		</ul>
		<button class="button button--black" @click="deleteProject">
			Delete project
		</button>
		<nuxt-link :to="`/project/${$route.params.id}/user`" class="button">
			Add an user
		</nuxt-link>
		<nuxt-link :to="`/project/${$route.params.id}/upload`" class="button">
			Update project
		</nuxt-link>
	</div>
</template>

<script>
export default {
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
