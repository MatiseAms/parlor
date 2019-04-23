<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Check the Colors
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
			</div>
			<div class="login__form-container">
				<form @submit.prevent="confirm">
					<div v-if="colors.filter((color) => color.doubleName).length > 1" class="double">
						<h2>Double colors</h2>
						<div
							v-for="(color, index) of colors.filter((color) => color.doubleName)"
							:key="`double-${index}`"
							class="colors-double__color login__form"
						>
							<label class="login__label-el">
								<input v-model="color.name" type="text" />
								<span class="login__label">Original name: {{ color.ogName }}</span>
								<input v-model="color.value" type="text" maxlength="7" />
								<span class="login__check"></span>
								<button @click.prevent="deleteColor(color.id)">Delete color</button>
								<p v-if="error" class="error">
									{{ error }}
								</p>
							</label>
						</div>
					</div>
					<h2>All colors</h2>
					<div v-for="(color, index) of colors" :key="index" class="colors-double__color login__form">
						<label class="login__label-el">
							<input v-model="color.name" type="text" />
							<span class="login__label">Original name: {{ color.ogName }}</span>
							<input v-model="color.value" type="text" maxlength="7" />
							<span class="login__check"></span>
							<button @click.prevent="deleteColor(color.id)">Delete color</button>
							<p v-if="error" class="error">
								{{ error }}
							</p>
						</label>
					</div>
					<div class="login__submit">
						<button class="button" @click="confirm">
							Confirm and continue
						</button>
					</div>
				</form>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			colors: [],
			error: ''
		};
	},
	async asyncData({ params, app }) {
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
	},
	methods: {
		deleteColor(id) {
			const index = this.colors.findIndex((el) => el.id === id);
			this.colors.splice(index, 1);
		},
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
				//start checklist
				this.$router.push(`/project/upload/${this.$route.params.id}/grid`);
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
