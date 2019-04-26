<template>
	<section class="checklist">
		<p class="center grey sub-title">
			CHECKLIST
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
		}
	}
};
</script>
