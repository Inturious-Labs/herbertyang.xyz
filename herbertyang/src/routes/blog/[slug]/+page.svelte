<script>
    export let data;
    import { MetaTags } from 'svelte-meta-tags'
</script>

<article>
    <MetaTags 
        title={ data.title } 
        description={ data.tw_card_desc }
        twitter={{
            title:  data.title,
            cardType:  data.tw_card_type,
            description: data.tw_card_desc,
            image: data.tw_card_image 
        }}
    />
    <h1>{ data.title }</h1>
    <p>Published: {data.date}</p>
    <svelte:component this={data.content} />
</article>