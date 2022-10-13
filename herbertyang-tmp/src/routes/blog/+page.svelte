<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Herbert Yang's blog">
<meta name="twitter:creator" content="Herbert Yang">
<meta name="twitter:description" content="Herbert Yang's blog articles since 2006">
<meta name="twitter:image" content="../image/blog_writing.jpeg">

<script>
    import PostsList from '$lib/components/PostsList.svelte'
    import Pagination from '$lib/components/Pagination.svelte'
    import { siteDescription } from '$lib/config'

    export let data
</script>
    
<svelte:head>
	<title>Blog</title>
	<meta data-key="description" name="description" content={siteDescription}>
</svelte:head>

<h2>Blog</h2>

<img src="../img/blog_writing.jpeg" alt="writing" width="100%" loading="lazy">

<PostsList posts={data.posts} />

<Pagination currentPage={1} totalPosts={data.total} />