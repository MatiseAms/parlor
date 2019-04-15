export const state = () => ({
	loggedIn: false
});

export const mutations = {
	changeStatus(state, value) {
		state.loggedIn = value;
	}
};

export const actions = {
	userLoggedIn({ commit }) {
		commit('changeStatus', true);
	},
	async isLoggedIn({ commit }) {
		const response = await this.$axios({
			method: 'get',
			withCredentials: true,
			url: '/isloggedin'
		});
		if (response && response.data && response.data.status) {
			commit('changeStatus', true);
		}
	},
	async logOut({ commit }) {
		await this.$axios({
			withCredentials: true,
			method: 'post',
			url: '/logout'
		});
		commit('changeStatus', false);
	}
};
