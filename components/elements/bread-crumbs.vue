<template>
	<div class="breadcrumbs">
		<ul class="breadcrumbs__list">
			<li v-for="(item, index) of items" :key="index" class="breadcrumbs__item">
				<template>
					<nuxt-link v-if="index !== items.length - 1" :to="item.url" class="breadcrumbs__url breadcrumbs__url--link ">
						{{ item.name }}
					</nuxt-link>
					<span v-else :to="item.url" class="breadcrumbs__url">
						{{ item.name }}
					</span>
				</template>
			</li>
		</ul>
		<slot />
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		items: []
	}),
	created() {
		const query = this.$route.path.split('/').filter((path) => path);
		let string = '';
		this.items = query.map((path, index) => {
			if (path === 'project') {
				string += '/project';
				return {
					name: 'Projects',
					url: '/projects'
				};
			} else {
				let name;
				if (index === 1) {
					name = this.title;
				} else {
					name = path.charAt(0).toUpperCase() + path.slice(1);
				}

				string += `/${path}`;
				return {
					name: name,
					url: string
				};
			}
		});
	}
};
</script>
<style lang="scss">
@import '~tools';
.breadcrumbs {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: grid(-2 2 1);
	&__item {
		padding: rem(0 5 0 0);
		&:before {
			content: '/';
			color: color(ParlorBlack);
			font-size: rem(12);
			line-height: 1;
			opacity: 0.8;
			padding: rem(0 5 0 0);
		}
		&:last-of-type {
			.breadcrumbs__url {
				opacity: 0.5;
			}
			&:before {
				opacity: 0.5;
			}
		}
		&:first-of-type {
			&:before {
				content: none;
			}
		}
	}
	&__url {
		color: color(ParlorBlack);
		font-size: rem(12);
		line-height: 1;
		text-decoration: none;
		opacity: 0.8;
		transition: 0.3s $easing;
		&--link {
			&:hover {
				opacity: 1;
			}
		}
	}
}
</style>
