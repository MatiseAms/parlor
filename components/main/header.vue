<template>
	<header id="header">
		<nuxt-link to="/">
			<h1 class="title">
				<span class="title__text">Parlor</span>
				<ParlorLogo class="parlor-logo" />
			</h1>
		</nuxt-link>
		<nav class="nav">
			<ul class="nav__list">
				<li v-for="(item, index) of navItems" :key="index" class="nav__item">
					<nuxt-link :to="item.url" class="nav__url">
						{{ item.title }}
					</nuxt-link>
				</li>
			</ul>
		</nav>
		<div class="nav__status">
			<nuxt-link v-if="!isLoggedIn" to="/login">
				Login
			</nuxt-link>
			<button v-else @click="$store.dispatch('session/logOut')">
				log out
			</button>
		</div>
	</header>
</template>

<script>
import ParlorLogo from '~/components/elements/parlor-logo.vue';
export default {
	components: {
		ParlorLogo
	},
	data() {
		return {
			title: 'Parlor',
			navItems: [
				{
					title: 'Projects',
					url: '/projects'
				},
				{
					title: 'Teams',
					url: '/teams'
				},
				{
					title: 'Docs',
					url: '/documentation'
				}
			]
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.state.session.loggedIn;
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.title {
	width: rem(80);
	display: block;
	overflow: hidden;
	&__text {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		text-indent: -999em;
	}
}
.parlor-logo {
	width: 100%;
}

.nav {
	&__item {
		font-size: rem(16);
		line-height: 1;
		color: color(ParlorBlack);
		font-weight: 500;
		padding: rem(0 30);
	}
	&__url {
		text-decoration: none;
		opacity: 0.5;
		transition: 0.15s ease-in-out;
		&.nuxt-link-active {
			opacity: 1;
			text-decoration: underline;
		}
		&:hover {
			opacity: 1;
		}
	}
}
#header {
	padding: 0 grid(2);
	height: rem(80);
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
}
</style>
