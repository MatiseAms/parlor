<template>
	<div class="error-page">
		<h1>This page does not exist yet</h1>
		<nuxt-link to="/" class="error__url">
			Home page
		</nuxt-link>
	</div>
</template>

<style lang="scss">
@import '~tools';
.error-page {
	padding: grid(1 2);
}
.error__url {
	display: block;
	margin: rem(30 0);
}
</style>
