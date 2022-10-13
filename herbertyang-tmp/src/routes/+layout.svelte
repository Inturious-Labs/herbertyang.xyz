<script>
    import Header from '$lib/components/Header.svelte'
    import '$lib/styles/style.css'
    import '$lib/styles/prism-coldark-cold.css'
 // import '$lib/styles/prism-one-light.css'
</script>

<Header />

<header></header>

<main>
  <slot />
</main>

<center><footer>
  <div>©Herbert Yang 2022 All Rights Reserved</div>
  <p />
  <div><a href="https://dfinity.org"><img src="/img/100_on_chain-slim-bg_dark.png" alt="100% built on the Internet Computer"></a></div>
</footer></center>