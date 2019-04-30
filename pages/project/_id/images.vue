<template>
	<main class="page page--checklist">
		<checklist-field title="Images" sub-title="OVERVIEW">
			<template v-slot:top>
				<bread-crumbs :title="title" />
			</template>
			<template v-slot:header>
				<div class="images__overview">
					<ul class="images__list">
						<li v-for="(image, index) of images" :key="index" class="images__item">
							<img :src="image" alt="Image of project" />
						</li>
					</ul>
				</div>
			</template>
			<template v-slot:footer>
				<div class="checklist__footer"></div>
			</template>
		</checklist-field>
	</main>
</template>

<script>
export default {
	middleware: 'session',
	components: {
		checklistField: () => import('~/components/elements/checklist-field.vue'),
		BreadCrumbs: () => import('~/components/elements/bread-crumbs.vue')
	},
	data() {
		return {};
	},
	async asyncData({ params, app }) {
		const responseProject = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: `/project/${params.id}/images`
		});
		if (responseProject && responseProject.data) {
			return {
				images: responseProject.data.images,
				title: responseProject.data.title
			};
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.images {
	&__overview {
		margin: grid(1 4);
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		position: relative;
	}
	&__item {
		width: 25%;
		height: grid(4);
		padding: rem(20);
		overflow: hidden;
		position: relative;
		img {
			object-fit: cover;
			object-position: center center;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
