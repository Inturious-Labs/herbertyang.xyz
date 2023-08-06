<script>
    export let data
    // console.log(data.apps)
    // figure out the right way of using fetch from youtube tutorial: https://www.youtube.com/watch?v=g23Xz6Gm-yw
    
    let unique_type_set = new Set(data.apps.apps.map(category=>category.appType)); 
    const unique_type_json = Array.from(unique_type_set);

</script>

<svelte:head>
	<title>Awesome IC</title>
	<meta data-key="description" name="description" content="directory of IC teams">
</svelte:head>

<h1>Awesome IC 2023</h1>
<i>Updated on Feb 19, 2023</i>

<p>
    <b>Awesome IC 2023</b> is a curated list of major DApps, tools, demos, developer studios, and communities for the <a href="https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki">Internet Computer</a> ecosystem. It helps interested investors, developers, partners keep track of the hottest IC apps. It's a different cut from the 70+ DApps <a href="https://internetcomputer.org/ecosystem">IC Showcase</a> featured by the <a href="https://dfinity.org">DFINITY Foundation</a>, or <a href="https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/#/">CYQL of 300+ IC Dapps</a> that's developed by <a href="https://twitter.com/cyqlio">cyql</a>. Detailed explanation of how this list is curated and developed can be found <a href="#notes">here</a>.
</p>

<h2>DApps</h2>

<ul>
    {#each unique_type_json as category}
    <li>
        <h3>{category}</h3>
        <hr>
        <ul>
            {#each data.apps.apps as { 
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
	{#each data.teams.teams as { 
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

<h2><a id="notes">Notes</a></h2>
<hr>

<small>
    <ul>
        <li>
            <b>Awesome IC 2023</b> supercededs its <a href="https://github.com/zire/awesome-IC/tree/2022">earlier version</a> that <a href="https://twitter.com/herbertyang">Herbert Yang</a> started in 2021. DApps come and go. Many DAapps in IC's early days since Genesis have evolved, pivoted, or changed ownership. This list has 3 features:
            <ul>
                <li>
                    No more NFTs. There are just too many to track and their status are too fluid. Most NFTs on IC can be found on either <a href="https://twitter.com/EntrepotApp">Entrepot</a> or <a href="https://twitter.com/YumiMarketplace">Yumi</a>, two of the largest NFT marketplaces on IC.
                </li>
                <li>
                    No more repetition. Each DApp will belong to one product category only. 
                </li>
                <li>
                    Community's contributions are welcome. Please send in PR for merge from its <a href="https://github.com/zire/awesome-IC/tree/main">public Github repo</a>. 
                </li>
            </ul>
        </li>
        <li>
            For each project, while its raw JSON input on Github repo may contain several additional fields, only its Twitter handle is displayed on the Awesome IC list. Usually, a project's Twitter handle can lead to all other useful sites such as Github repo, Discord, Telegram, home page, etc.
        </li>
        <li>
            Whether the project is still on-going and usable is an important factor in compiling this list. For example, ic.rocks is no longer listed here.
        </li>
        <li>
            Once its related <a href="https://github.com/zire/awesome-IC">Github repo</a> is updated (via JSON inputs), this webpage, which is deployed on a canister on the Internet Computer, will automatically display the most recent data.
        </li>
    </ul>

</small>