export default ({ $axios, redirect, app }) => {
	$axios.onResponse((response) => {
		const code = parseInt(response && response.status);
		if (code === 200) {
			const query = app.context.route.query;
			//if there is a redirect in the url don't redirect amd let the login page take care of it
			if (response.data && response.data.code === 4 && !query.redirect) {
				redirect(response.data.redirect);
			}
		}
	});
};
