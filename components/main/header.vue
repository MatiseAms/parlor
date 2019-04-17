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
	width: rem(80);
	overflow: hidden;
	display: flex;
	align-items: center;
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
	right: 0;
	top: calc(100% + 5px);
	border: 1px solid color(ParlorBlack, 0);
	max-height: 0;
	padding: 0;
	overflow: hidden;
	transition: 0.4s $easing;
	opacity: 0;
	&.active {
		border: 1px solid color(ParlorBlack);
		opacity: 1;
		padding: rem(15 0);
		max-height: rem(999);
	}
	&__item {
		width: 100%;
	}
	&__url {
		display: block;
		padding: rem(15 30);

		font-size: rem(14);
		text-decoration: none;
		white-space: nowrap;
		color: color(ParlorBlack);
		&:hover {
			text-decoration: underline;
		}
	}
}
#header {
	padding: 0 grid(2);
	height: rem(120);
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	position: relative;
	z-index: 2;
}
</style>
