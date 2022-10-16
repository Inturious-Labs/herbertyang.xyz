<script>
    import teams from "/src/lib/ic/awesome_ic_teams.json"
</script>

<svelte:head>
	<title>Awesome IC</title>
	<meta data-key="description" name="description" content="directory of IC teams">
</svelte:head>

<h1>Awesome IC</h1>

Directory of project teams in the IC ecosystem

<ol>
	{#each teams.teams as { 
        teamSite, 
        teamName, 
        teamCity, 
        teamRegion,
        teamTwitter
        }, i}
		<li>
            <a href={teamSite}> {teamName}</a>,
            <a href={teamTwitter}>Twitter</a>,
            {teamCity}, 
            {teamRegion}
		</li>
	{/each}
</ol>
