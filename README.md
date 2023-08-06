# herbertyang.xyz

## General Setup

Canister URL:

[https://hbc6w-gqaaa-aaaag-aagdq-cai.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app/)

Domain hosted on: Google Domain Service under `clayton@1082.xyz`

## Deployment

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
	
	Check out the site on port 5173: [http://localhost:5173](http://localhost:5173/)

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
	
	The local site can be viewed on http://localhost:52640/_/dashboard, but it doesn't display the contents of the site yet.

	It will say `Could not find a canister id to forward to.`. 

	Deploy on the local dfx server

	```bash
	dfx deploy
	```

	It will complete the local deployment and return a canister id at the local network.

	|  | MBP-Kunling | MacMini |
	| --- | --- | --- |
	| local canister | [be2us-64aaa-aaaaa-qaabq-cai](http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/) | [rrkah-fqaaa-aaaaa-aaaaq-cai](http://rrkah-fqaaa-aaaaa-aaaaq-cai.localhost:4943/) |

	Deploy to `ic` network

	```bash
	dfx deploy --network=ic --no-wallet
	```
	
	It will return
	
	```bash
	Committing batch.
	Deployed canisters.
	```

	The site has gone live on the ic network and can be viewed at [https://hbc6w-gqaaa-aaaag-aagdq-cai.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.ic0.app/)
	
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

## Manage canisters and wallet

To view the principal

```bash
dfx identity get-principal
```

dfx will return `yxaiy-ge4x3-xwdqi-r5kim-46lbl-52ulu-46sx7-hzhev-mrsqr-mvygl-eae`

The key pairs can be found on the local machine

```bash
ls -l ~/.config/dfx/identity/kun/
```

`identity.pem` is the private key. `wallets.json` is the public key hashed from the private key.

Check wallet balance on ic

```bash
dfx wallet --network=ic balance
```

To reclaim cycles from inactive canisters, stop them first and then delete the canisters

```bash
dfx canister --network=ic stop --all
dfx canister --network=ic delete --all
```

Check the wallet balance again and the balance should be updated to reflect the reclaimed cycles.

### Migrate to a new machine

Suppose the dfx code runs on Machine A under the identity `kun` originally and it will be run from Machine B going forward

On **Machine B**, create a new identity. For convenience, let's also call it `kun`

```bash
dfx identity new kun
```

Get the principal ID for identity `kun`

```bash
dfx identity get-principal
lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe
```

Find out the canister id on network ic

```bash
cat canister_ids.json
{
	"hyxyz": {
	"ic": "hbc6w-gqaaa-aaaag-aagdq-cai"
	}
}
```

Find out which controllers are linked to this canister

```bash
dfx canister --network=ic info hbc6w-gqaaa-aaaag-aagdq-cai
Controllers: iyr2m-aiaaa-aaaag-aaa2q-cai yxaiy-ge4x3-xwdqi-r5kim-46lbl-52ulu-46sx7-hzhev-mrsqr-mvygl-eae
Module hash: 0xdb07e7e24f6f8ddf53c33a610713259a7c1eb71c270b819ebd311e2d223267f0
```

Principal `yxaiy-ge4x3-xwdqi-r5kim-46lbl-52ulu-46sx7-hzhev-mrsqr-mvygl-eae` belongs to identity `kun` on Machine A. Now we need to the principal `lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe` for identity `kun` on Machine B to canister `hbc6w-gqaaa-aaaag-aagdq-cai` on network `ic`.

On **Machine A**, do this

```bash
dfx canister --network=ic update-settings --add-controller lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe hbc6w-gqaaa-aaaag-aagdq-cai
```
	
Then, authorize this new controller to make changes to the contents in canister `hbc6w-gqaaa-aaaag-aagdq-cai` (which can be executed on Machine B as well)

```bash
dfx canister --network=ic call hbc6w-gqaaa-aaaag-aagdq-cai authorize "(principal \"lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-ty2x-zqe\")"
```

Back to **Machine B**, run dfx

```bash
dfx deploy --network=ic --no-wallet
```

### Link to the wallet canister on a new machine

Running `dfx wallet --network=ic balance` on Machine B would not work yet as the principal associated with identity `kun` on Machine B is not linked to the wallet canister for `hbc6w-gqaaa-aaaag-aagdq-cai` yet. 

On **Machine A**, get the wallet id for the used identity

```
dfx identity get-wallet --network=ic
```

`iyr2m-aiaaa-aaaag-aaa2q-cai` is returned as the wallet id for identity `kun` on Machine A (assuming we always use identity `kun`).

Display controllers currently associated with the wallet `iyr2m-aiaaa-aaaag-aaa2q-cai`

```
dfx wallet controllers --network=ic
```

`yxaiy-ge4x3-xwdqi-r5kim-46lbl-52ulu-46sx7-hzhev-mrsqr-mvygl-eae` is returned, which is the principal of the identity `kun` (Machine A).

Now let's add the principal `lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe` for identity `kun` on Machine B to this wallet `iyr2m-aiaaa-aaaag-aaa2q-cai`. 

```
dfx wallet --network=ic add-controller lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe
```

Confirm that both principals are now controllers of the wallet

```
dfx wallet controllers --network=ic
yxaiy-ge4x3-xwdqi-r5kim-46lbl-52ulu-46sx7-hzhev-mrsqr-mvygl-eae
lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe
```

On **Machine B**, connect the principal (which is now a controller to the wallet canister) to the wallet

```
dfx identity set-wallet iyr2m-aiaaa-aaaag-aaa2q-cai --network=ic
Checking availability of the canister on the network...
Setting wallet for identity 'kun' on network 'ic' to id 'iyr2m-aiaaa-aaaag-aaa2q-cai'
Wallet set successfully.
```

Find out the remaining balance of the canister

```
dfx wallet --network=ic balance
2.177 TC (trillion cycles).
```

## References

- https://gotofritz.net/blog/blog-with-sveltekit-and-markdown
- https://fantinel.dev/blog-development-sveltekit/
- https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog
- https://mattjennings.io/blog/rewriting-my-website-in-sveltekit
- https://www.programonaut.com/how-to-create-a-blog-with-svelte-step-by-step/