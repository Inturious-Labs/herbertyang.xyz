<script>
    import { is_empty } from "svelte/internal"
    import teams from "/src/lib/ic/awesome_ic_teams.json"
    import apps from "/src/lib/ic/awesome_ic_apps.json"
    let unique_type_set = new Set(apps.apps.map(category=>category.appType))
    const unique_type_json = Array.from(unique_type_set)
</script>

<svelte:head>
	<title>Awesome IC</title>
	<meta data-key="description" name="description" content="directory of IC teams">
</svelte:head>

<h1>Awesome IC</h1>
<i>Updated on Dec 03, 2022</i>

<h2>DApps</h2>

<ul>
    {#each unique_type_json as category}
    <li>
        {category}
        <ul>
            {#each apps.apps as { 
                appType, 
                appName, 
                appSite,
                appIntro,
                appTeam,
                appTwitter
                }, i}
                {#if appType == category }
                    {#if appTwitter.length == 0}
                        <li>
                            <b><a href={appSite}>{appName}</a></b> by <code>{appTeam}</code>,
                            {appIntro}
                        </li>
                    {:else}
                        <li>
                            <b><a href={appTwitter}>{appName}</a></b> by <code>{appTeam}</code>,
                            {appIntro}
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>
    </li>
    {/each}
</ul>

<h2>Developer Teams</h2>

<ol>
	{#each teams.teams as { 
        teamSite, 
        teamName, 
        teamCity, 
        teamRegion,
        teamTwitter
        }, i}
		<li>
            <a href={teamSite}>{teamName}</a>,
            <a href={teamTwitter}>Twitter</a>,
            {teamCity}, 
            {teamRegion}
		</li>
	{/each}
</ol>
