<template>
	<main class="page page--login">
		<section class="login">
			<div>
				<h1 class="center">
					Check the typography
				</h1>
				<p class="center grey">
					It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
					automatically.
				</p>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	data() {
		return {
			sketch: [],
			error: '',
			status: '',
			timeout: 0
		};
	},
	async asyncData({ params, app, redirect }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}/upload/typo`
		});
		if (response && response.data && response.data.code === 0) {
			//succes
			if (!response.data.data.missingFonts.length) {
				redirect(`/project/upload/${params.id}/upload/typo`);
			} else {
				return {
					status: 0,
					missingFonts: response.data.data.missingFonts
				};
			}
		} else {
			return {
				status: 1
			};
		}
	},
	created() {
		if (this.status === 1) {
			this.notReady();
		} else if (this.status === 0) {
			this.everythingIsReady();
		}
	},
	methods: {
		notReady() {
			setTimeout(async () => {
				await this.checkIfStatusChanged();
				if (this.status === 1 && this.timeout < 10) {
					this.timeout++;
					this.notReady();
				} else if (this.status === 0) {
					this.everythingIsReady();
				}
			}, 300);
		},
		async checkIfStatusChanged() {
			const response = await this.$axios({
				method: 'get',
				withCredentials: true,
				url: `/project/${this.$route.params.id}/upload/typo`
			});
			if (response && response.data && response.data.code === 0) {
				//succes
				if (!response.data.data.missingFonts.length) {
					this.$router.push(`/project/upload/${this.$route.params.id}/upload/typo`);
				} else {
					this.status = 0;
					this.missingFonts = response.data.data.missingFonts;
					return true;
				}
			} else {
				this.status = 1;
				return true;
			}
		},
		everythingIsReady() {
			console.log('we are ready');
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
@font-face {
	font-family: 'Favorit';
	src: url('http://localhost:3000/uploads/fonts/Favorit/Favorit-regular.woff2') format('woff2');
}
body {
	font-family: Favorit;
}
</style>
