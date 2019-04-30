<template>
	<main class="page page--checklist">
		<bread-crumbs :title="title" />
		<section class="checklist checklist__grid">
			<div>
				<p class="center grey sub-title">
					OVERVIEW
				</p>
				<h1 class="center">
					Grid
				</h1>
			</div>
			<div class="login__form-container">
				<form @submit.prevent="confirm">
					<label class="login__label-el">
						<span class="login__label">Grid columns</span>
						<span v-if="!editMode" class="login__input" :class="{ error: error, succes: succes }">{{ gridAmount }}</span>
						<input
							v-if="editMode"
							ref="font"
							v-model.number="gridAmount"
							max="50"
							min="1"
							type="number"
							:class="{ error: error, succes: succes }"
							@input="setGrid"
						/>
						<span class="login__check"></span>
						<p v-if="error" class="error">
							{{ error }}
						</p>
						<p v-if="succes" class="succes">
							{{ succes }}
						</p>
					</label>
					<div class="row grid-example">
						<div
							v-for="(item, index) in grid"
							:key="index"
							class="column grid-example__column"
							:style="`width: calc(100% / ${grid.length})`"
						></div>
					</div>
				</form>
			</div>
		</section>
		<div v-if="status" class="checklist__footer">
			<button class="button button--black" @click="edit">
				{{ buttonText() }}
			</button>
		</div>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	components: {
		BreadCrumbs: () => import('~/components/elements/bread-crumbs.vue')
	},
	data() {
		return {
			gridAmount: 0,
			grid: Array(0),
			error: '',
			succes: '',
			editMode: false,
			status: false
		};
	},
	async asyncData({ params, app }) {
		const responseProject = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}`
		});
		if (responseProject && responseProject.data && responseProject.data.gridStatus) {
			return {
				grid: Array(responseProject.data.grids[0].value),
				gridAmount: responseProject.data.grids[0].value,
				status: true,
				title: responseProject.data.name
			};
		} else {
			const response = await app.$axios({
				method: 'get',
				withCredentials: true,
				url: `/project/${params.id}/upload/grid`
			});
			if (response && response.data && response.data.code === 0) {
				return {
					grid: Array(response.data.data),
					gridAmount: response.data.data,
					title: response.data.projectTitle
				};
			}
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
				this.$router.push(`/project/${this.$route.params.id}/upload/grid`);
			}
			this.succes = '';
			this.error = '';
			this.editMode = !this.editMode;
			if (!this.editMode) {
				this.confirm();
			} else {
				setTimeout(() => {
					this.$refs['font'].focus();
				});
			}
		},
		async confirm() {
			this.editMode = false;
			const response = await this.$axios({
				method: 'post',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/grid`,
				data: {
					grid: this.grid.length
				}
			});
			if (response && response.data && response.data.code === 0) {
				//start checklist
				this.succes = 'Grid layout updated';
			} else {
				this.error = response.data.message;
			}
		},
		setGrid() {
			if (this.gridAmount) {
				if (this.gridAmount <= 50) {
					this.grid = Array(this.gridAmount);
				} else {
					this.grid = Array(50);
				}
			} else {
				this.grid = Array(24);
			}
		}
	}
};
</script>
