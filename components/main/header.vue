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
			<nuxt-link v-if="!isLoggedIn" to="/login" class="button">
				Login
			</nuxt-link>
			<button v-else class="button button--black" @click="toggleSubNav" @blur="toggleSubNav">
				{{ name }}
			</button>
			<ul :class="{ active: isLoggedIn && subNav }" class="sub-nav">
				<li class="sub-nav__item">
					<nuxt-link to="/profile" class="sub-nav__url">
						Profile
					</nuxt-link>
				</li>
				<li class="sub-nav__item">
					<nuxt-link to="/profile/password" class="sub-nav__url">
						Change password
					</nuxt-link>
				</li>
				<li class="sub-nav__item">
					<nuxt-link to="/profile/picture" class="sub-nav__url">
						Profile picture
					</nuxt-link>
				</li>
				<li class="sub-nav__item">
					<nuxt-link to="/logout" class="sub-nav__url">
						Uitloggen
					</nuxt-link>
				</li>
			</ul>
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
			subNav: false,
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
		},
		name() {
			return this.$store.state.session.name;
		}
	},
	methods: {
		toggleSubNav() {
			this.subNav = !this.subNav;
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.title {
	display: flex;
	align-items: center;
	width: rem(80);
	overflow: hidden;
	&__text {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		text-indent: -999em;
	}
}
.parlor-logo {
	width: 100%;
}

.nav {
	&__item {
		color: color(ParlorBlack);
		font-weight: 500;
		font-size: rem(16);
		line-height: 1;
		padding: rem(0 30);
	}
	&__url {
		text-decoration: none;
		opacity: 0.5;
		transition: 0.15s ease-in-out;
		&.nuxt-link-active {
			text-decoration: underline;
			opacity: 1;
		}
		&:hover {
			opacity: 1;
		}
	}
	&__status {
		position: relative;
		.button,
		button {
			position: relative;
			z-index: 1;
		}
	}
}
.sub-nav {
	position: absolute;
	top: calc(100% + 5px);
	right: 0;
	max-height: 0;
	border: 1px solid color(ParlorBlack, 0);
	overflow: hidden;
	opacity: 0;
	transition: 0.4s $easing;
	padding: 0;
	&.active {
		max-height: rem(999);
		border: 1px solid color(ParlorBlack);
		opacity: 1;
		padding: rem(15 0);
	}
	&__item {
		width: 100%;
	}
	&__url {
		display: block;
		color: color(ParlorBlack);

		font-size: rem(14);
		white-space: nowrap;
		text-decoration: none;
		padding: rem(15 30);
		&:hover {
			text-decoration: underline;
		}
	}
}
#header {
	position: relative;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: rem(120);
	padding: 0 grid(2);
}
</style>
