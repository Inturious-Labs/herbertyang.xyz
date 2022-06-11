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
	


If you want to start working on your project right away, you might want to try the following commands:

```bash
cd hyxyz/
dfx help
dfx config --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.
