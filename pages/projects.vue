<template>
	<main>
		<section class="header projects">
			<h1>Overview</h1>
			<div v-if="!projects.length" class="no-project">
				<p class="projects-overview__empty">
					It seems like you are not part of any proect yet. Create one or ask permission in an existing project!
				</p>
				<nuxt-link to="/project/create" class="button projects__new-project">
					Create new project
				</nuxt-link>
			</div>
			<div v-if="projects.length" class="projects__navigation">
				<ul class="projects__sort">
					<li v-for="(item, index) of sortOptions" :key="index" class="projects__sort-item">
						<button :class="{ active: sortMethod === item }" class="projects__sort-button" @click="changeSorting(item)">
							{{ item }}
						</button>
					</li>
				</ul>
				<nuxt-link to="/project/create" class="button projects__new-project">
					Create new project
				</nuxt-link>
			</div>
		</section>
		<section class="projects-overview">
			<ul v-if="projects.length" class="projects-overview__list row">
				<li
					v-for="(item, index) of projects"
					:key="index"
					class="projects-overview__item column small-full medium-half large-third"
				>
					<div class="single-project">
						<nuxt-link :to="`/project/${item.id}`" class="single-project__url">
							{{ item.name }}
						</nuxt-link>
						<span class="single-project__process-bar">
							<span class="single-project__process-bar-status" :style="`width: ${calculateProcess(item)}%`"></span>
						</span>
						<h3 class="single-project__title">
							{{ item.name }}
						</h3>
						<p class="grey">
							<span class="format">
								Updated:
							</span>
							<span class="value">
								{{ formatDate(item.updatedAt) }}
							</span>
						</p>
						<p class="grey">
							<span class="format">
								Created:
							</span>
							<span class="value">
								{{ formatDate(item.createdAt) }}
							</span>
						</p>
						<ul class="single-project__users">
							<li v-for="(user, i) of item.users" :key="i" class="single-project__user">
								<img :src="`${host}/${user.image}`" :alt="`Profile picture of ${user.name}`" />
								<span class="single-project__name">
									{{ user.firstName }}
								</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</section>
	</main>
</template>

<script>
export default {
	data() {
		return {
			host: process.env.baseURL,
			sortMethod: 'Created',
			sortOptions: ['Created', 'Last updated', 'Name'],
			projects: []
		};
	},
	async asyncData({ app }) {
		const response = await app.$axios({
			method: 'get',
			withCredentials: true,
			url: '/projects'
		});
		if (response && response.data) {
			return {
				projects: response.data
			};
		}
	},
	methods: {
		changeSorting(val) {
			this.sortMethod = val;
			const projects = this.projects;
			if (val === 'Name') {
				projects.sort((a, b) => {
					const nameA = a.name.toUpperCase();
					const nameB = b.name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}

					// names must be equal
					return 0;
				});
			} else if (val === 'Created') {
				projects.sort((a, b) => {
					const val1 = new Date(a.createdAt);
					const val2 = new Date(b.createdAt); // ignore upper and lowercase
					if (val1.getTime() < val2.getTime()) {
						return 1;
					}
					if (val1.getTime() > val2.getTime()) {
						return -1;
					}
					return 0;
				});
			} else if (val === 'Last updated') {
				projects.sort((a, b) => {
					const val1 = new Date(a.updatedAt);
					const val2 = new Date(b.updatedAt); // ignore upper and lowercase
					if (val1.getTime() < val2.getTime()) {
						return 1;
					}
					if (val1.getTime() > val2.getTime()) {
						return -1;
					}
					return 0;
				});
			}
			this.projects = projects;
		},
		calculateProcess(project) {
			const check = ['colors', 'grids', 'typographies'];

			let complete = 0;
			check.forEach((name) => {
				if (project[name].length) {
					complete++;
				}
			});
			return ((complete / check.length) * 100) | 0;
		},
		formatDate(oldDate) {
			const date = new Date(`${oldDate}`);
			const now = new Date();
			const diff = Math.abs(date - now) / 1000 / 60; //diff is in minutes
			if (diff < 60) {
				if (Math.floor(diff) <= 1) {
					return `1 minute ago`;
				} else {
					return `${Math.floor(diff)} minutes ago`;
				}
			} else if (diff < 1440) {
				const hours = Math.floor(diff / 60);
				if (hours <= 1) {
					return `1 hour ago`;
				} else {
					return `${hours} hours ago`;
				}
			} else {
				const days = Math.floor(diff / 1440);
				if (days <= 1) {
					return `1 day ago`;
				} else {
					return `${days} days ago`;
				}
			}
		}
	}
};
</script>
<style lang="scss">
@import '~tools';
.no-project {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}
.projects {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: grid(0 2);

	&__navigation {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		margin-top: rem(60);
	}
	&__new-project {
		white-space: nowrap;
	}
	&__sort {
		width: 100%;
		margin: 0;
		&-button {
			border: none;
			box-shadow: none;
			background: transparent;
			font-size: rem(16);
			color: color(ParlorBlack);
			padding: rem(0 40 0 0);
			font-weight: 500;
			opacity: 0.5;
			transition: 0.15s ease-in-out;
			cursor: pointer;
			outline: none;
			&.active {
				opacity: 1;
				text-decoration: underline;
			}
			&:hover {
				opacity: 1;
			}
		}
	}
	&-overview {
		padding: grid(0 1.5);
		&__empty {
			margin: grid(1 0.5 0);
			font-weight: 500;
		}
		&__item {
			padding: grid(1 0.5);
		}
	}
}

.single-project {
	width: grid(6);
	height: grid(3);
	background: color(Gallery, 0.5);
	position: relative;
	padding: rem(20 30);
	transition: 0.3s $easing;
	display: flex;
	flex-direction: column;
	&:hover {
		box-shadow: rem(0 0 10 0) color(ParlorBlack, 0.1);
	}
	.grey {
		font-size: rem(14);
		display: inline-block;
		line-height: 1;
		& + .grey {
			margin-top: rem(10);
		}
	}
	.value {
		font-weight: 600;
	}
	&__title {
		margin-top: rem(15);
		z-index: 1;
		position: relative;
	}
	&__url {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		text-indent: -9999rem;
		overflow: hidden;
	}
	&__users {
		position: absolute;
		bottom: rem(20);
		display: flex;
	}
	&__name {
		opacity: 0;
		height: 0;
		white-space: nowrap;
		font-size: rem(12);
		color: color(ParlorBlack);
		transition: opacity 0.2s $easing;
	}
	&__user {
		width: rem(25);
		height: rem(25);
		position: relative;
		border-radius: 50%;
		margin-right: rem(10);
		&:hover {
			.single-project__name {
				opacity: 1;
			}
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
	&__process-bar {
		display: inline-block;
		position: relative;
		width: 100%;
		height: rem(4);
		background: color(Grey, 0.2);
		border-radius: 5px;
		&-status {
			width: 0;
			border-radius: 5px;
			display: block;
			background: color(Parlor);
			height: 100%;
			position: relative;
			z-index: 1;
		}
	}
}
</style>
