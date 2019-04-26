<template>
	<div class="font-element__settings">
		<div class="font-element__typo-header">
			<ul class="font-element__typo-list row">
				<li class="font-element__typo-item font-element__typo-item--key">
					Key
				</li>
				<li class="font-element__typo-item font-element__typo-item--family">
					Font-Family
				</li>
				<li class="font-element__typo-item font-element__typo-item--size">
					Font-Size
				</li>
				<li class="font-element__typo-item font-element__typo-item--min-size">
					Min-Font-Size
				</li>
				<li class="font-element__typo-item font-element__typo-item--line">
					Line-Height
				</li>
				<li class="font-element__typo-item font-element__typo-item--space">
					Spacing
				</li>
				<li class="font-element__typo-item font-element__typo-item--colors">
					Colors
				</li>
			</ul>
		</div>
		<ul class="font-element__list">
			<li
				v-for="(font, index) of fonts"
				:key="index"
				class="font-element__item"
				:class="{ active: itemActive === index, inactive: itemActive !== index && itemActive !== -1 }"
			>
				<form class="form" @submit.prevent="">
					<div class="font-element__block font-element__block--key">
						<p class="font-element__block-title">
							{{ font.key !== 'p' ? font.key.toUpperCase() : font.key }}
						</p>
					</div>
					<div class="font-element__block font-element__block--family">
						<p class="font-element__block-title">
							<span class="font-element__block-title--main">
								{{ font.family }}
							</span>
							<span v-if="font.hasItalic" class="font-element__block-title--sub">
								- Italic
							</span>
						</p>
						<p class="font-element__block-title">
							<span class="font-element__block-title--sub">
								{{ font.weight.join(',') }}
							</span>
						</p>
					</div>
					<div class="font-element__block">
						<p v-if="itemActive !== index" class="font-element__block-title">
							{{ `${font.baseSize}px` }}
						</p>
						<input
							v-if="itemActive === index"
							:ref="`font-${index}`"
							v-model="font.baseSize"
							type="number"
							class="font-element__block-title"
						/>
					</div>
					<div class="font-element__block">
						<p v-if="itemActive !== index" class="font-element__block-title">
							{{ `${font.minSize}px` }}
						</p>
						<input v-if="itemActive === index" v-model="font.minSize" type="number" class="font-element__block-title" />
					</div>
					<div class="font-element__block">
						<p v-if="itemActive !== index" class="font-element__block-title">
							{{ `${font.lineheight}` }}
						</p>
						<input v-if="itemActive === index" v-model="font.lineheight" type="number" class="font-element__block-title" />
					</div>
					<div class="font-element__block">
						<p v-if="itemActive !== index" class="font-element__block-title">
							{{ `${font.kerning}px` }}
						</p>
						<input v-if="itemActive === index" v-model="font.kerning" type="number" class="font-element__block-title" />
					</div>
					<div class="font-element__block font-element__block--colors">
						<p
							v-for="(color, i) of font.colors"
							:key="i"
							class="font-element__block-title font-element__block-title--colors "
						>
							<span :style="`background: ${color}`" class="font-element__color-el"></span>
							<span class="font-element__color-text">
								{{ color.toUpperCase() }}
							</span>
						</p>
					</div>
					<button
						v-if="itemActive === -1 || itemActive !== index"
						class="font-element__edit"
						@click.prevent="changeActive(index)"
					>
						Edit
					</button>
					<button
						v-if="itemActive === index"
						class="font-element__edit font-element__edit--save"
						@click.prevent="changeActive(-1)"
					>
						Save
					</button>
				</form>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		fonts: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		itemActive: -1
	}),
	methods: {
		changeActive(index) {
			this.itemActive = index;
			if (index !== -1) {
				setTimeout(() => {
					this.$refs[`font-${index}`][0].focus();
				});
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.font-element {
	&__edit {
		cursor: pointer;
		display: inline-block;
		border: none;
		box-shadow: none;
		background: transparent;
		font-family: $primary-font-family;
		font-size: rem(14);
		font-weight: 500;
		color: color(Grey);
		margin-left: grid(1);
		outline: none;
		&:after {
			content: '';
			display: block;
			top: 100%;
			left: 0;
			width: 100%;
			background: color(Grey);
			height: 1px;
			opacity: 0;
			transition: 0.2s $easing;
		}
		&:hover {
			&:after {
				opacity: 1;
			}
		}
		&--save {
			font-weight: bold;
		}
	}
	&__settings {
		margin: grid(2 0);
	}
	&__typo {
		&-header {
			padding: grid(0 4);
		}
		&-list {
			padding-bottom: rem(20);
			border-bottom: 1px solid color(Gallery);
		}
		&-item {
			width: calc(100% / 8);
			font-size: rem(14);
			font-weight: 500;
			line-height: 1;
			color: color(ParlorBlack);
			&--family {
				width: calc(100% / 4);
			}
		}
	}
	&__list {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 0;
	}
	&__item {
		width: calc(100% - (#{$grid-1} * 4));
		margin-left: grid(2);
		margin-right: grid(2);
		display: flex;
		align-items: flex-start;
		padding: rem(40) 0 rem(40) grid(2);
		position: relative;
		flex-direction: row;
		transition: width 0.4s $easing 0.4s, box-shadow 0.4s $easing, padding 0.4s $easing 0.4s, margin-left 0.4s $easing 0.4s,
			margin-right 0.4s $easing 0.4s, opacity 0.4s $easing, margin-bottom 0.4s $easing, margin-top 0.4s $easing;
		color: color(ParlorBlack);
		&:after {
			content: '';
			display: flex;
			position: absolute;
			top: 100%;
			left: grid(2);
			width: calc(100% - (#{$grid-1} * 4));
			height: 1px;
			background: color(Gallery);
			transition: 0;
		}
		&.active {
			box-shadow: 0 0 40px 0 rgba(black, 0.1);
			width: 100%;
			margin-left: 0;
			padding: rem(40) grid(2) rem(40) grid(4);
			margin-top: rem(5);
			margin-bottom: rem(5);
			&:after {
				transition: 0.4s $easing 0.4s;
				width: 100%;
				left: 0;
			}
			.font-element__block--family,
			.font-element__block--key,
			.font-element__block--colors {
				opacity: 0.2;
			}
		}
		&.inactive {
			pointer-events: none;
			opacity: 0.1;
		}
	}
	&__block {
		width: grid(2);
		&--family {
			width: grid(4);
		}
		&-title {
			font-size: rem(16);
			font-weight: 500;
			line-height: 1.75;
			width: 100%;
			display: flex;
			border: none;
			outline: none;
			align-items: baseline;
			&--colors {
				line-height: 1;
				align-items: center;
			}
			& + p {
				margin-top: rem(5);
			}
			&--sub {
				font-size: rem(14);
				opacity: 0.75;
			}
		}
	}
	&__color-el {
		width: rem(24);
		height: rem(24);
		display: inline-block;
		border-radius: 50%;
		box-shadow: 0 0 10px 0 rgba(black, 0.1);
		margin-right: rem(10);
	}
}
</style>
