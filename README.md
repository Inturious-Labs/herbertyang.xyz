# herbertyang.xyz

Canister URL:

[https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app/)

Domain hosted on: Google Domain Service

## Deployment Workflow

1. Make changes in `frontend/` folder. The contents of the site are in `frontend/src`. 

2. In `frontend/` folder, run

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
	
	Preview on local machine
	
	```bash
	npm run preview
	```
	
	Check out the site on port 3000: [http://localhost:3000](http://localhost:3000/)

3. Return to the `dfx` project folder

	Make sure dfx is using the correct identity
	
	```bash
	dfx identity whoami
	```
	
	Switch to dfx identity `kun`
	
	```bash
	dfx identity use kun
	```
	
	Deploy to `ic`

	```bash
	dfx deploy --network=ic --no-wallet
	```
	
	It will return
	
	```bash
	Committing batch.
	Deployed canisters.
	```
	
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

- https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog
- https://mattjennings.io/blog/rewriting-my-website-in-sveltekit
- https://www.programonaut.com/how-to-create-a-blog-with-svelte-step-by-step/