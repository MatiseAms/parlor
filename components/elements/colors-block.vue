<template>
	<div class="color">
		<div v-if="colors.filter((color) => color.doubleName).length > 1" class="color__settings">
			<div class="color__header">
				<h4>We have found 2 warnings</h4>
			</div>
			<div class="color__double">
				<ul class="color__list">
					<color-block
						v-for="(color, index) of colors.filter((color) => color.doubleName)"
						:key="`${index}`"
						class="color__item"
						:color="color"
						:edit-mode="editMode"
					>
						<button class="color__delete" type="button" @click="deleteColor(color.id)">
							Delete color
						</button>
					</color-block>
				</ul>
			</div>
		</div>
		<div class="color__settings">
			<div class="color__header">
				<h4>All colors</h4>
			</div>
			<div class="color__double">
				<ul class="color__list">
					<color-block v-for="(color, index) of colors" :key="`double-${index}`" :color="color" :edit-mode="editMode">
						<button class="color__delete" type="button" @click="deleteColor(color.id)">
							Delete color
						</button>
					</color-block>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {
		ColorBlock: () => import('~/components/elements/color-block.vue')
	},
	props: {
		colors: {
			type: Array,
			default: () => []
		},
		editMode: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		itemActive: -1
	}),
	methods: {
		deleteColor(id) {
			console.log();
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
			color: color(ParlorBlack);
			font-weight: 500;
			font-size: rem(24);
			letter-spacing: -0.24;
		}
	}
	&__settings {
		margin: grid(0 3);
		position: relative;
		&:first-of-type {
			&:after {
				content: '';
				position: absolute;
				right: grid(1);
				left: grid(1);
				display: block;
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
		position: relative;
		width: grid(1.5);
		margin: grid(0 30/80 30/80);
		&:hover {
			.color__delete {
				opacity: 1;
				pointer-events: all;
			}
		}
	}
	&__block {
		display: block;
		width: 100%;
		height: grid(1.5);
		border: 1px solid color(Grey, 0.5);
		border-radius: 10px;
		margin-bottom: rem(10);
	}
	&__input {
		display: block;
		width: 100%;
		border: none;
		outline: none;
		color: color(ParlorBlack, 0.6);
		font-weight: 500;
		font-size: rem(14);
		font-family: $primary-font-family;
		line-height: 1;
		transition: 0.2s $easing;
		margin: rem(5 0 0);
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
		bottom: 100%;
		left: 100%;
		width: rem(20);
		height: rem(20);
		box-shadow: none;
		border: none;
		border-radius: 50%;
		background: color(ParlorBlack);
		text-indent: -9999rem;
		transform: translate(-50%, 50%);
		opacity: 0;
		cursor: pointer;
		pointer-events: none;
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 25%;
			display: block;
			width: 50%;
			height: 2px;
			background: color(Grey);
			transform: translate(0%, -50%) rotate(45deg);
			transform-origin: center center;
		}
		&:before {
			content: '';
			position: absolute;
			top: 50%;
			left: 25%;
			display: block;
			width: 50%;
			height: 2px;
			background: color(Grey);
			transform: translate(0%, -50%) rotate(-45deg);
			transform-origin: center center;
		}
	}
}
</style>
