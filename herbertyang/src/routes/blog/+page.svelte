<script>
    export let data
</script>
    
<h2>Blog</h2>
      
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