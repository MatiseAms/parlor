export default ({ $axios, redirect }) => {
	$axios.onResponse((response) => {
		const code = parseInt(response && response.status);
		if (code === 200) {
			if (response.data && response.data.code === 4) {
				redirect(response.data.redirect);
			}
		}
	});
};
