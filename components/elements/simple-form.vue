<template>
	<section class="login">
		<div>
			<h1 class="center">
				{{ title }}
			</h1>
			<p class="center grey">
				{{ subTitle }}
			</p>
			<div class="login__form-container">
				<slot />
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		}
	}
};
</script>
