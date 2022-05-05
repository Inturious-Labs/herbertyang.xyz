import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		prerender: {
			// need to turn this ON to create an index.html
			default: true
		}
	}
};

export default config;