<script context="module">
    // import all markdown files from ./posts and turn it into an array
    const posts = Object.entries(import.meta.globEager('./posts/**/*.md'))
      .map(([, post]) => post.metadata)
      .sort((a, b) => (a.created < b.created ? 1 : -1))
  
    export const load = async ({ page: { query } }) => {
      const PAGE_SIZE = 10
  
      // get page parameter from URL
      const page = parseInt(query.get('page') ?? '1')
  
      return {
        props: {
          // return the page of posts
          posts: posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
          page
        }
      }
    }
  </script>
  
  <script>
    export let posts
    export let page
  </script>
  
  <!-- render each post -->
  <div>
    {#each posts as post}
        <a href={`/blog/post/${post.slug}`}>{post.title}</a>
    {/each}
  </div>
  
  <!-- pagination -->
  <div>
    {#if page > 1}
      <a href={`/blog/post?page=${page - 1}`}>back</a>
    {/if}
    {#if posts.length === PAGE_SIZE}
      <a href={`/blog/post?page=${page + 1}`}>next</a>
    {/if}
  </div>