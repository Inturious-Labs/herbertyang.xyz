<script>
    import Header from '$lib/components/Header.svelte'
    import '$lib/styles/style.css'
    import '$lib/styles/prism-coldark-cold.css'
 // import '$lib/styles/prism-one-light.css'
</script>

<Header />

<header>Hi, I'm a header</header>

<main>
  <slot />
</main>

<footer>Hello, I'm the footer.</footer>