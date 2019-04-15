export default ({ $axios, redirect, app }) => {
	$axios.onResponse((response) => {
		const code = parseInt(response && response.status);
		if (code === 200) {
			const query = app.context.route.query;
			if (response.data && response.data.code === 4 && !query.redirect) {
				redirect(response.data.redirect);
			}
		}
	});
};
