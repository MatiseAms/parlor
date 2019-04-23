export default function({ store, redirect, app }) {
	// If the user is not authenticated
	const query = app.context.route.path;
	if (!store.state.session.loggedIn) {
		return redirect(`/login?redirect=${query}`);
	}
}
