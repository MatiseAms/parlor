export const state = () => ({
	loggedIn: false,
	name: ''
});

export const mutations = {
	changeStatus(state, value) {
		if (value) {
			state.loggedIn = true;
			state.name = value;
		} else {
			state.loggedIn = false;
			state.name = '';
		}
	}
};

export const actions = {
	userLoggedIn({ commit }, name) {
		commit('changeStatus', name);
	},
	async isLoggedIn({ commit }) {
		const response = await this.$axios({
			method: 'get',
			withCredentials: true,
			url: '/isloggedin'
		});
		if (response && response.data && response.data.status) {
			commit('changeStatus', response.data.fName);
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
