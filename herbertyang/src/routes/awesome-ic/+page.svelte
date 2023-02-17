<script>
	import { onMount } from "svelte";

    // Use 'import' directly to load json files on the same server
    // import teams from "/src/lib/ic/awesome_ic_teams.json"
    // import apps from "/src/lib/ic/awesome_ic_apps.json"

    /* 
    // https://scottspence.com/posts/fetch-data-from-two-or-more-endpoints-in-svelte
    // https://www.sitepoint.com/svelte-fetch-data/
    // https://languageimperfect.com/2021/02/17/data-fetching-in-svelte.html
    // https://www.reddit.com/r/sveltejs/comments/z2lxww/how_to_import_a_json_file_from_public_directory/
    // https://betterprogramming.pub/how-to-fetch-files-from-github-in-javascript-e0ed2c72aeb4
    // https://www.koderhq.com/tutorial/svelte/http-fetch/
    // https://sveltesociety.dev/recipes/component-recipes/using-fetch-to-consume-apis
    // https://www.techiediaries.com/consume-json-rest-api-in-svelte-with-fetch-and-onmount/
    // https://reactgo.com/svelte-fetch-data-api/
    // https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

    export async function load({ fetch }) {
      const [appsReq, teamsReq] = await Promise.all([
        fetch('https://raw.githubusercontent.com/zire/awesome-IC/2023/ic/awesome_ic_apps.json'),
        fetch('https://github.com/zire/awesome-IC/blob/2023/ic/awesome_ic_teams.json'),
      ])
      if (appsReq.ok && teamsReq.ok) {
        const { apps } = await appsReq.json()
        const { teams } = await teamsReq.json()
        return {
          props: {
            apps,
            teams,
          },
        }
      }
    }
    export apps, teams
    */

    /*
    let apps = []
    let teams = []

    async () => {
        const appsReq = await fetch('https://raw.githubusercontent.com/zire/awesome-IC/2023/ic/awesome_ic_apps.json');
        console.log(appsReq)
        apps = await appsReq.json();
        const teamsReq = await fetch('https://raw.githubusercontent.com/zire/awesome-IC/2023/ic/awesome_ic_teams.json');
        teams = await teamsReq.json();
    };

    console.log(apps);
    */

    let apps = []
    fetch('https://raw.githubusercontent.com/zire/awesome-IC/2023/ic/awesome_ic_apps.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let apps = data; 
            // console.log(apps)
        })

    console.log("hellow")

    let teams = []
    fetch('https://raw.githubusercontent.com/zire/awesome-IC/2023/ic/awesome_ic_teams.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let teams = data; 
            // console.log(teams)
        })

    let unique_type_set = new Set(apps.apps.map(category=>category.appType));  
    const unique_type_json = Array.from(unique_type_set);

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
        <h3>{category}</h3>
        <hr>
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
