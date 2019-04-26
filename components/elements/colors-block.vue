<template>
	<div class="color">
		<div v-if="colors.filter((color) => color.doubleName).length > 1" class="color__settings">
			<div class="color__header">
				<h4>We have found 2 warnings</h4>
			</div>
			<div class="color__double">
				<ul class="color__list">
					<li
						v-for="(color, index) of colors.filter((color) => color.doubleName)"
						:key="`double-${index}`"
						class="color__item"
					>
						<button class="color__delete" @click.prevent="deleteColor(color.id)">
							Delete color
						</button>
						<span class="color__block" :style="`background: ${color.value}`"></span>
						<input v-model="color.name" type="text" class="color__name color__input" />
						<input v-model="color.value" type="text" maxlength="7" class="color__value color__input" />
					</li>
				</ul>
			</div>
		</div>
		<div class="color__settings">
			<div class="color__header">
				<h4>All colors</h4>
			</div>
			<div class="color__double">
				<ul class="color__list">
					<li v-for="(color, index) of colors" :key="`double-${index}`" class="color__item">
						<button class="color__delete" @click.prevent="deleteColor(color.id)">
							Delete color
						</button>
						<span class="color__block" :style="`background: ${color.value}`"></span>
						<input v-model="color.name" type="text" class="color__name color__input" />
						<input v-model="color.value" type="text" maxlength="7" class="color__value color__input" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		colors: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		itemActive: -1
	}),
	methods: {
		deleteColor(id) {
			const index = this.colors.findIndex((el) => el.id === id);
			this.colors.splice(index, 1);
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.color {
	margin: grid(2 0);
	&__header {
		margin: grid(0.5 1);
		h4 {
			font-size: rem(24);
			color: color(ParlorBlack);
			letter-spacing: -0.24;
			font-weight: 500;
		}
	}
	&__settings {
		margin: grid(0 3);
		position: relative;
		&:first-of-type {
			&:after {
				content: '';
				display: block;
				position: absolute;
				left: grid(1);
				right: grid(1);
				height: 1px;
				background: color(Gallery);
			}
		}
	}
	&__list {
		margin: 0 grid(50/80);
		display: flex;
		flex-wrap: wrap;
	}
	&__item {
		margin: grid(0 30/80 30/80);
		width: grid(1);
		position: relative;
		&:hover {
			.color__delete {
				opacity: 1;
				pointer-events: all;
			}
		}
	}
	&__block {
		width: 100%;
		height: grid(1);
		display: block;
		border-radius: 10px;
		border: 1px solid color(Grey, 0.5);
		margin-bottom: rem(10);
	}
	&__input {
		outline: none;
		border: none;
		margin: rem(5 0 0);
		font-size: rem(14);
		font-family: $primary-font-family;
		color: color(ParlorBlack, 0.6);
		font-weight: 500;
		line-height: 1;
		transition: 0.2s $easing;
		&:hover {
			color: color(ParlorBlack, 0.7);
		}
		&:focus {
			color: color(ParlorBlack);
		}
	}
	&__value {
		font-size: rem(14);
	}
	&__delete {
		position: absolute;
		left: 100%;
		bottom: 100%;
		background: color(ParlorBlack);
		width: rem(20);
		height: rem(20);
		text-indent: -9999rem;
		transform: translate(-50%, 50%);
		border-radius: 50%;
		border: none;
		box-shadow: none;
		opacity: 0;
		pointer-events: none;
		cursor: pointer;
		&:after {
			content: '';
			display: block;
			width: 50%;
			height: 2px;
			background: color(Grey);
			position: absolute;
			left: 25%;
			transform-origin: center center;
			top: 50%;
			transform: translate(0%, -50%) rotate(45deg);
		}
		&:before {
			content: '';
			display: block;
			width: 50%;
			height: 2px;
			background: color(Grey);
			position: absolute;
			left: 25%;
			transform-origin: center center;
			top: 50%;
			transform: translate(0%, -50%) rotate(-45deg);
		}
	}
}
</style>
