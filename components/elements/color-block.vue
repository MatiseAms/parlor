<template>
	<li class="color__item">
		<slot v-if="editMode" />
		<span class="color__block" :style="`background: ${color.value}`"></span>
		<label v-if="!editMode" class="color__name color__input">{{ color.name }}</label>
		<label v-if="!editMode" class="color__value color__input">{{ color.value }}</label>
		<input v-if="editMode" v-model="color.name" type="text" class="color__name color__input" />
		<input v-if="editMode" v-model="color.value" type="text" maxlength="7" class="color__value color__input" />
	</li>
</template>
<script>
export default {
	props: {
		color: {
			type: Object,
			default: () => []
		},
		editMode: {
			type: Boolean,
			default: false
		}
	}
};
</script>
