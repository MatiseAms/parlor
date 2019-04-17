<template>
	<main class="page page--logout"></main>
</template>

<script>
export default {
	beforeCreate() {
		this.$store.dispatch('session/logOut');
	}
};
</script>
<style lang="scss">
@import '~tools';
</style>
