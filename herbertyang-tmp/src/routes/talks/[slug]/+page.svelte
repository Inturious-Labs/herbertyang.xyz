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
 
    <svelte:component this={data.content} />
  
    <center>-------------------------- &infin; -----------------------------</center>

    <p>
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="Great article! " data-via="herbertyang" data-lang="en" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
        <a href="https://twitter.com/herbertyang?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-size="large" data-text="Great article! " data-via="herbertyang" data-lang="en" data-show-count="false">Follow @herbertyang</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </p>
</article>