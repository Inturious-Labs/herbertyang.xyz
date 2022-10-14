<script>
	export let posts = []
</script>


<ul class="posts-list">
	{#each posts as post}
		<li>
			<article>
				<a href="/blog/{post.slug}">
					<h2>
						{post.title}
					</h2>
					<img
					src={post.coverImage}
					alt=""
					width={post.coverWidth}
					height={post.coverHeight}
					style="ratio: {post.coverWidth} / {post.coverHeight}"
					/>
				</a>
			</article>

			<p>{post.excerpt}</p>
		</li>
	{/each}
</ul>