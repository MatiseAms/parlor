<template>
	<main class="page page--home">
		<section class="header columns-flow">
			<h1 class="center">
				Parlor = Designer & Developer
			</h1>
			<p class="center grey">
				It’s all about the details. Handoff designs and styleguides with accurate specs, assets, code snippets
				automatically.
			</p>
			<nuxt-link to="/signup" class="button center">
				Get Started
			</nuxt-link>
			<div class="mockup__image"></div>
		</section>
	</main>
</template>
<style lang="scss">
@import '~tools';

.mockup__image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: grid(20);
	height: grid(11.25);
	background: color(Gallery);
	overflow: hidden;
	margin: rem(80) auto;
}
</style>
