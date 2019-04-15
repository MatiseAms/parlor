<template>
	<div>
		<layout-header />
		<nuxt />
	</div>
</template>

<script>
import LayoutHeader from '~/components/main/header.vue';
export default {
	components: {
		LayoutHeader
	},
	head: {
		link: [
			// You don't need that line anymore!
			{ rel: 'stylesheet', href: 'https://use.typekit.net/rhl3ygp.css' }
		]
	}
};
</script>
