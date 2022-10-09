# herbertyang.xyz

Canister URL:

[https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app/)

Domain hosted on: Google Domain Service under `clayton@1082.xyz`

## Deployment Workflow

1. Make changes in `herbertyang/` folder. The contents of the site are in `herbertyang/src`. 

2. Testing, deploy and build on Svelte server (run by vite)

	In `herbertyang/` folder, run

	Preview on local machine
	
	```bash
	npm run preview
	```

	or

	```bash
	npm run dev
	```
	
	Check out the site on port 3000: [http://localhost:3000](http://localhost:3000/)

	Build the final output files

	```bash
	npm run build
	```

	It will return
	
	```bash
	> Using @sveltejs/adapter-static
  	Wrote site to "build"
  	✔ done
	```
	
	The static files for the site have been updated in `frontend/build` folder. 
	

3. Testing and deploy on dfx server

	Return to the `dfx` project folder

	Make sure dfx is using the correct identity
	
	```bash
	dfx identity whoami
	```
	
	Switch to dfx identity `kun`
	
	```bash
	dfx identity use kun
	```

	Start dfx server on local machine

	```bash
	dfx start --clean
	```

	or run this in the background
	```bash
	dfx start --background
	```
	
	The local site can be viewed on [http://localhost:8000](http://localhost:8000)

	It will say `Could not find a canister id to forward to.`. 

	Deploy on the local dfx server

	```bash
	dfx deploy
	```

	It will complete the local deployment and return a canister id `rrkah-fqaaa-aaaaa-aaaaq-cai`

	Visit this URL to preview the locally deployed site [http://rrkah-fqaaa-aaaaa-aaaaq-cai.localhost:8000/](http://rrkah-fqaaa-aaaaa-aaaaq-cai.localhost:8000/)

	Deploy to `ic` network

	```bash
	dfx deploy --network=ic --no-wallet
	```
	
	It will return
	
	```bash
	Committing batch.
	Deployed canisters.
	```

	The site has gone live on the ic network and can be viewed at [https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app/)
	
4. Git push to Github repo

	Still in the dfx project folder (which shall also be the folder for git repo), 
	
	Check what's been changed
	
	```bash
	git status
	```
	Stage the changes for commit
	
	```bash
	git add .
	```
	Commit to git
	
	```bash
	git commit -m "some meaningful commit message"
	```
	Push up to the git server
	
	```bash
	git push
	```
	
	The private repo is here [https://github.com/zire/herbertyang.xyz](https://github.com/zire/herbertyang.xyz)

## References

- https://gotofritz.net/blog/blog-with-sveltekit-and-markdown
- https://fantinel.dev/blog-development-sveltekit/
- https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog
- https://mattjennings.io/blog/rewriting-my-website-in-sveltekit
- https://www.programonaut.com/how-to-create-a-blog-with-svelte-step-by-step/