<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Herbert Yang's blog">
<meta name="twitter:creator" content="Herbert Yang">
<meta name="twitter:description" content="Herbert Yang's blog articles since 2006">
<meta name="twitter:image" content="../image/blog_writing.jpeg">

<script>
    export let data
</script>
    
<h2>Talks</h2>

<img src="../img/bird_chirping.jpeg" alt="talks" width="100%" loading="lazy">

<ul>
    {#each data.posts as post}
        <li>        
            <a href={post.path}>
              {post.meta.title}, 
              {post.meta.date}
            </a>
        </li>
    {/each}
</ul>
