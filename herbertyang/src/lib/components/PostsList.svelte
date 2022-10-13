<script>
    export let posts = []
</script>

<ul class="posts-list">
    {#each posts as post}
        <li>
            <article>
                <a href="/blog/{post.slug}">     
                    {post.title}, {post.date}
                </a>
            </article>
        </li>
    {/each}
</ul>