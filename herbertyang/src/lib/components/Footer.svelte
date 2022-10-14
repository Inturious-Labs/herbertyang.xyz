<script>
	import MainNav from './MainNav.svelte'
	import { siteAuthor } from '$lib/config'
</script>

<footer>
	<MainNav />

	<nav>
		<ul>
			<li>
				<a href="/api/rss.xml" rel="external">RSS</a>
			</li>
			<li>
				<a href="/">Home</a>
			</li>
		</ul>
	</nav>

	<div>
		&copy;{new Date().getFullYear()} {siteAuthor}
	</div>

	<img src="/img/100_on_chain-slim-bg_dark.png" alt="100% on IC">
	
</footer>