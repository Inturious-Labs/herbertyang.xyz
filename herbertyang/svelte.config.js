import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
		})
	],

	extensions: ['.svelte', '.md'],
};

export default config;
