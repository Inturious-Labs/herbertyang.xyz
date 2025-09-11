# herbertyang.xyz

## General Setup

Canister URL:

[https://hbc6w-gqaaa-aaaag-aagdq-cai.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.raw.ic0.app/)

Domain hosted on: Google Domain Service under `clayton@1082.xyz`

## Editing

1. In the root `git` directory for `herbertyang.xyz`, enter into `docusaurus/` folder

2. From the default `main` branch, create a new branch for new edits and check out this new branch `new-edit` from `main`.

	```bash
	git checkout -b new-edit
	```

3. Make edits in `new-edit` branch and commit the changes

	```bash
	git status
	git add .
	git commit -m "Write a nice headline for the edit"
	```

4. In the `docusaurus` folder, start up the npm server at http://localhost:3000/, to check for real-time effect while making code changes

	```bash
	npm run start
	```

	**Mobile Testing**: To test on your mobile device on the same WiFi network:
	
	1. Find your computer's IP address:
		```bash
		ifconfig | grep "inet " | grep -v 127.0.0.1
		```
	
	2. Start the server with host binding:
		```bash
		npm run start -- --host 0.0.0.0
		```
	
	3. Access from your mobile device at:
		```
		http://YOUR_IP_ADDRESS:3000
		```
		Example: `http://172.20.0.191:3000`

5. Sometimes, the changes may not be effective without creating a new build

	```bash
	npm run build
	```

6. Running multiple npm server instances may create port conflict. To kill the existing instance on port `3000`

	```bash
	lsof -i :3000
	```

	Once the process ID is found, kill the npm instance to free up the port

	```bash
	kill -9 process_id
	```

7. When satisfied with the changes, push the changes to the remote git server on Github. For the first-time run, run the below command to create the same branch `new-edit` on the remote server.

	```bash
	git push --set-upstream origin new-edit
	``` 

	For subsequent `git push`, just running `git push` will do. 
	
## Deploy

8. Return to the `dfx` or `git` root directory (one level up from `docusaurus`)

9. Make sure dfx is using the correct identity.
	
	```bash
	dfx identity whoami
	```
	
	Switch to dfx identity `default`
	
	```bash
	dfx identity use kun
	```

10. Start `dfx` server on local machine

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

11. Deploy to `ic` network when all the changes have been committed to branch `new-edit` and testing is successful on local machine.

	```bash
	dfx deploy --network=ic --no-wallet
	```
	
	It will return
	
	```bash
	Committing batch.
	Deployed canisters.
	```

	The site has gone live on the ic network and can be viewed at [https://hbc6w-gqaaa-aaaag-aagdq-cai.ic0.app](https://hbc6w-gqaaa-aaaag-aagdq-cai.ic0.app/)
	
12. Finalize

	At the website version of Github.com, manually merge branch `new-edit` into `main`. The current setting will automatically delete branch `new-edit` on the remote server.

	Pull the changes from `main` branch from remote server to local machine, after checking out to `main` branch from `new-edit` on local machine.

	```bash
	git checkout main
	git pull
	```

	Delete the local branch `new-edit` on local machine when `main` has been brought up to date with remote server.

	```
	git branch -d new-edit
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

## Photo Gallery Guide - Modern Lightbox Format

This guide will help you create new photo albums in the `docs/gallery` folder using the modern Lightbox gallery with `react-photo-album` + `yet-another-react-lightbox`.

### Gallery Structure Overview

The gallery is organized by year, with each album using the modern Lightbox format that provides:
- Masonry grid layout
- Lightbox with zoom, fullscreen, slideshow, and thumbnails
- Caption support
- Mobile-responsive design

### Creating a New Photo Album

#### Step 1: Create the Album Directory Structure

```bash
cd /Users/zire/matrix/github_zire/herbertyang.xyz/docusaurus/docs/gallery/2025
mkdir your-album-name
cd your-album-name
mkdir img
mkdir img/thumbs
```

#### Step 2: Prepare Your Images

1. **Full-size images**: Place your high-quality images in the `img/` directory
2. **Thumbnails**: Create smaller versions (recommended: 300-400px width) and place them in `img/thumbs/`
3. **Naming convention**: Use descriptive names like `your-album-1.jpg`, `your-album-2.jpg`, etc.

#### Step 3: Create the Album Files

**Create `index.mdx`:**

```mdx
---
title: "Your Album Title"
description: "Brief description of your photo album"
keywords: [keyword1, keyword2, keyword3]
image: /img/gallery/2025/your-album-name/img/your-album-1.jpg
---

import PhotoGallery from '@site/src/components/PhotoGallery';
import { yourAlbumPhotos } from './album';

# Your Album Title

Your album description here

<PhotoGallery images={yourAlbumPhotos} />
```

**Create `album.ts`:**

```typescript
export const yourAlbumPhotos = [
    {
      src: require('./img/your-album-1.jpg').default,
      width: 1600,  // Actual image width
      height: 1200, // Actual image height
      alt: 'Your album description',
      caption: "Photo 1 caption",
      thumb: require('./img/thumbs/your-album-1.jpg').default,
    },
    {
      src: require('./img/your-album-2.jpg').default,
      width: 1600,
      height: 1200,
      alt: 'Your album description',
      caption: "Photo 2 caption",
      thumb: require('./img/thumbs/your-album-2.jpg').default,
    },
    // Add more photos...
];
```

#### Step 4: Update Year Category (if needed)

If you're creating the first album for a new year, create a `_category_.json` file:

```json
{
  "label": "2025",
  "position": 1,
  "link": {
    "type": "generated-index",
    "description": "photo albums around the world in 2025"
  }
}
```

### Example Album Structure

```
docs/gallery/2025/your-album-name/
├── index.mdx          # Main album page
├── album.ts           # Photo data
├── img/               # Full-size images
│   ├── your-album-1.jpg
│   ├── your-album-2.jpg
│   └── ...
└── img/thumbs/        # Thumbnail images
    ├── your-album-1.jpg
    ├── your-album-2.jpg
    └── ...
```

### Lightbox Features

- **Masonry Layout**: Photos arrange in a Pinterest-style grid
- **Lightbox**: Click any photo to open full-screen view
- **Zoom**: Pinch or scroll to zoom in/out
- **Slideshow**: Auto-play through photos
- **Thumbnails**: Bottom thumbnail strip for navigation
- **Captions**: Display photo descriptions
- **Fullscreen**: Full-screen viewing mode
- **Mobile Responsive**: Works great on all devices

### Image Optimization Tips

1. **Full-size images**: Use high quality (1600px+ width recommended)
2. **Thumbnails**: Create 300-400px width versions for faster loading
3. **Format**: Use JPG for photos, WebP for better compression
4. **File naming**: Use lowercase with hyphens (e.g., `my-photo-1.jpg`)

### Converting Old Image Slider Albums

When converting existing Image Slider albums to the modern format:

1. Replace `index.md` with `index.mdx`
2. Create `album.ts` with the photo data
3. Remove `ImageSlider.js` and `SliderData.js`
4. Update image paths to use the new structure
5. Add thumbnail versions of images

## References

- https://gotofritz.net/blog/blog-with-sveltekit-and-markdown
- https://fantinel.dev/blog-development-sveltekit/
- https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog
- https://mattjennings.io/blog/rewriting-my-website-in-sveltekit
- https://www.programonaut.com/how-to-create-a-blog-with-svelte-step-by-step/