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
					<template v-if="editMode">
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
					</template>
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
		changeActive(index) {
			if (index === -1) {
				this.$nuxt.$emit('Typo_save', true);
			} else {
				this.$nuxt.$emit('Typo_change', true);
			}
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
		display: inline-block;
		box-shadow: none;
		border: none;
		outline: none;
		background: transparent;
		color: color(Grey);
		font-weight: 500;
		font-size: rem(14);
		font-family: $primary-font-family;
		cursor: pointer;
		margin-left: grid(1);
		&:after {
			content: '';
			top: 100%;
			left: 0;
			display: block;
			width: 100%;
			height: 1px;
			background: color(Grey);
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
			color: color(ParlorBlack);
			font-weight: 500;
			font-size: rem(14);
			line-height: 1;
			&--family {
				width: calc(100% / 4);
			}
		}
	}
	&__list {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0;
	}
	&__item {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		width: calc(100% - (#{$grid-1} * 4));
		color: color(ParlorBlack);
		transition: width 0.4s $easing 0.4s, box-shadow 0.4s $easing, padding 0.4s $easing 0.4s, margin-left 0.4s $easing 0.4s,
			margin-right 0.4s $easing 0.4s, opacity 0.4s $easing, margin-bottom 0.4s $easing, margin-top 0.4s $easing;
		margin-left: grid(2);
		margin-right: grid(2);
		padding: rem(40) 0 rem(40) grid(2);
		&:after {
			content: '';
			position: absolute;
			top: 100%;
			left: grid(2);
			display: flex;
			width: calc(100% - (#{$grid-1} * 4));
			height: 1px;
			background: color(Gallery);
			transition: 0;
		}
		&.active {
			width: 100%;
			box-shadow: 0 0 40px 0 rgba(black, 0.1);
			margin-left: 0;
			padding: rem(40) grid(2) rem(40) grid(4);
			margin-top: rem(5);
			margin-bottom: rem(5);
			&:after {
				left: 0;
				width: 100%;
				transition: 0.4s $easing 0.4s;
			}
			.font-element__block--family,
			.font-element__block--key,
			.font-element__block--colors {
				opacity: 0.2;
			}
		}
		&.inactive {
			opacity: 0.1;
			pointer-events: none;
		}
	}
	&__block {
		width: grid(2);
		&--family {
			width: grid(4);
		}
		&-title {
			display: flex;
			align-items: baseline;
			width: 100%;
			border: none;
			outline: none;
			font-weight: 500;
			font-size: rem(16);
			line-height: 1.75;
			&--colors {
				align-items: center;
				line-height: 1;
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
		display: inline-block;
		width: rem(24);
		height: rem(24);
		border: 1px solid color(Grey, 0.5);
		border-radius: 50%;
		margin-right: rem(10);
	}
}
</style>
