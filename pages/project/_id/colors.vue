<template>
	<main class="page page--checklist">
		<checklist-field title="Colors" sub-title="OVERVIEW">
			<template v-slot:top>
				<bread-crumbs :title="title" />
			</template>
			<template v-slot:header>
				<warning-block v-if="!status" name="colors" />
				<form @submit.prevent="confirm">
					<colors-block :colors="colors" :edit-mode="editMode" />
					<input type="submit" style="position: absolute; left: -9999px" />
				</form>
			</template>
			<template v-if="status" v-slot:footer>
				<div class="checklist__footer">
					<p v-if="error" class="error">
						{{ error }}
					</p>
					<p v-if="succes" class="succes">
						{{ succes }}
					</p>
					<button class="button button--black" @click="edit">
						{{ buttonText() }}
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
		ColorsBlock: () => import('~/components/elements/colors-block.vue'),
		BreadCrumbs: () => import('~/components/elements/bread-crumbs.vue'),
		WarningBlock: () => import('~/components/elements/warning-block.vue')
	},
	data() {
		return {
			colors: [],
			editMode: false,
			error: '',
			succes: ''
		};
	},
	async asyncData({ params, app }) {
		const responseProject = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		if (responseProject && responseProject.data) {
			return {
				colors: responseProject.data.colors,
				status: responseProject.data.colorStatus,
				title: responseProject.data.name
			};
		}
	},
	methods: {
		buttonText() {
			if (!this.status) {
				return 'Go to checklist';
			}
			if (this.editMode) {
				return 'Save';
			} else {
				return 'Edit';
			}
		},
		async edit() {
			if (!this.status) {
				this.$router.push(`/project/${this.$route.params.id}/upload/colors`);
			}
			this.succes = '';
			this.error = '';
			this.editMode = !this.editMode;
			if (!this.editMode) {
				this.confirm();
			}
		},
		async confirm() {
			this.editMode = false;
			const response = await this.$axios({
				method: 'post',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/colors`,
				data: {
					colors: this.colors
				}
			});
			if (response && response.data && response.data.code === 0) {
				//start checklist
				this.succes = 'Colors updated';
			} else {
				this.error = response.data.message;
			}
		}
	}
};
</script>
