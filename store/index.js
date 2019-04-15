export const actions = {
	nuxtServerInit({ dispatch }) {
		return Promise.all([dispatch('session/isLoggedIn')]);
	}
};
