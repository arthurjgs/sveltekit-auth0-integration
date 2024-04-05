<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Authed</title>
	<meta name="description" content="Congratulations" />
</svelte:head>

<div class="text-column">
	<h1>Logged in as <strong>{data.props?.user.email}</strong> </h1>

	<p>
		You can logout here: <a href="/api/auth/logout">Logout</a>
	</p>

	Here are all the user details: <pre>{JSON.stringify(data, null, 2)}</pre>

	With token : <pre>{JSON.stringify(data.props?.token, null, 2)}</pre>
</div>
