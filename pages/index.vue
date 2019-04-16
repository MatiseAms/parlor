<template>
	<main class="page page--home">
		<section class="mockup">
			<h1>
				Parlor = Designer & Developer
			</h1>
			<div class="mockup__image">
				<p>
					Here comes a video
				</p>
			</div>
		</section>
	</main>
</template>
<style lang="scss">
@import '~tools';

.mockup {
	width: 100%;
	position: relative;
	&__image {
		margin: rem(80) auto;
		width: grid(20);
		height: grid(11.25);
		background: color(Gallery);
		overflow: hidden;
		border: 1px solid color(ParlorBlack, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
