<template>
	<section class="checklist">
		<slot name="top" />
		<p class="center grey sub-title">
			{{ subTitle }}
		</p>
		<h1 class="center">
			{{ title }}
		</h1>
		<slot name="header" />
		<slot name="footer" />
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
