<template>
	<main class="page page--checklist">
		<section class="checklist checklist__grid">
			<div>
				<p class="center grey sub-title">
					CHECKLIST
				</p>
				<h1 class="center">
					Grid
				</h1>
			</div>
			<div class="login__form-container">
				<form class="form form__column" @submit.prevent="confirm">
					<label class="login__label-el">
						<span class="login__label">Grid columns</span>
						<input v-model.number="gridAmount" max="50" min="1" type="number" @input="setGrid" />
						<span class="login__check"></span>
						<p v-if="error" class="error">
							{{ error }}
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
		<div class="checklist__footer">
			<nuxt-link v-if="!$route.query.redirect" :to="`/project/${$route.params.id}`" class="checklist__skip">
				Skip
			</nuxt-link>
			<button class="button button--black" @click="confirm">
				Save
			</button>
		</div>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			gridAmount: 0,
			grid: Array(0),
			error: ''
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
				gridAmount: responseProject.data.grids[0].value
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
					gridAmount: response.data.data
				};
			}
		}
	},
	methods: {
		async confirm() {
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
				this.$router.push(`/project/${this.$route.params.id}`);
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
