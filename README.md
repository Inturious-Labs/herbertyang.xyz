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

## Photo Gallery Guide - Automated Workflow

This guide will help you create new photo albums using the fully automated gallery workflow with Smart Sync functionality.

### Gallery Structure Overview

The gallery uses a modern masonry grid layout with lightbox features:
- **Masonry grid layout** optimized for mobile viewing
- Lightbox with zoom, fullscreen, slideshow, and thumbnails
- Caption support with preservation of custom captions
- Mobile-responsive design
- Smart Sync for handling photo additions/removals

### Creating a New Photo Album - Step by Step

#### Step 1: Setup Branch and Directories

1. **Select photos and upload them to MBP**
   - Choose your photos and transfer to local machine

2. **Create a new branch off main branch**
   ```bash
   git checkout main
   git pull
   git checkout -b new-gallery-name
   ```

3. **Create a gallery folder in docusaurus/docs/gallery/YYYY/ folder**
   ```bash
   cd docusaurus/docs/gallery/2025  # Use current year
   mkdir your-album-name
   cd your-album-name
   ```

4. **Create directory structure**
   ```bash
   mkdir img/originals
   mkdir img/thumbs
   mkdir img/web
   ```

#### Step 2: Prepare Your Images

5. **Move the photos into img/originals**
   - Place all your photos in the `img/originals/` directory

6. **Edit photos in img/originals** (CRITICAL STEP):
   - **Rotate and get the right orientation** - Use Preview, Photos app, or image editor
   - **Crop and other UI edits** - Make any compositional adjustments
   - **Serialize photos and name them as 01_xxx.jpg, 02_xxx.jpg, 03_xxx.jpg**
     - Use `xxx` to describe what's in the photo
     - DO NOT include the gallery name in individual filenames
     - Example: `01_rocket_garden.jpg`, `02_atlantis_front.jpg`
   - **Do not resize the photos** - Keep original resolution
   - **Serialize based on presentation order** - Number them in the order you want them displayed
   - **Designate the first photo "01_xxx.jpg" as the cover image** - This becomes the gallery cover for SEO/social media

#### Step 3: Run Automated Processing

7. **Run the gallery processor**
   ```bash
   # From within your gallery directory
   gallery-processor
   ```

The automated script will:
- ✅ Process images from `img/originals/` to `img/web/` (optimized for web display)
- 🖼️ Generate thumbnails in `img/thumbs/` (optimized for grid display)
- 📝 Create `album.ts` with photo data and actual dimensions
- 📄 Generate `index.mdx` with SEO-optimized frontmatter
- 🎯 Use the first photo (`01_xxx.jpg`) as the gallery cover image
- 📊 Show processing statistics

#### Step 4: Generated Files

The script automatically creates:

**`album.ts`** - Photo configuration with actual dimensions:
```typescript
export const galleryNamePhotos = [
  {
    src: require('./img/web/01_rocket_garden.jpg').default,
    width: 1200, // Actual thumbnail dimensions
    height: 900,
    alt: 'gallery-name',
    caption: "rocket garden",
    thumb: require('./img/thumbs/thumb_01_rocket_garden.jpg').default,
  },
  // ... more photos
];
```

**`index.mdx`** - Gallery page with SEO metadata:
```mdx
---
title: "Gallery Name - Photography by Herbert Yang"
description: "Gallery description with photo count and key subjects"
keywords: [relevant, keywords, for, seo]
image: "img/web/01_rocket_garden.jpg"
---

import PhotoGallery from '@site/src/components/PhotoGallery';
import { galleryNamePhotos } from './album';

# Gallery Name

<PhotoGallery images={galleryNamePhotos} />
```

### Adding Photos to Existing Galleries

For existing galleries, the Smart Sync functionality automatically:
- ✅ **Preserves** all existing custom captions
- ➕ **Adds** entries for new photos with auto-generated captions
- ➖ **Removes** entries for deleted photos
- 💾 **Creates backup** of album.ts before updating

**Process:**
1. Add new photos to `img/originals/` following the naming convention
2. Run `gallery-processor` from the gallery directory
3. Script shows statistics of preserved/added/removed entries

### Final Directory Structure

```
docs/gallery/2025/your-album-name/
├── index.mdx                    # Gallery page (auto-generated)
├── album.ts                     # Photo data (auto-generated)
├── img/
│   ├── originals/               # Your edited originals (01_xxx.jpg format)
│   │   ├── 01_rocket_garden.jpg
│   │   ├── 02_atlantis_front.jpg
│   │   └── ...
│   ├── web/                     # Web-optimized images (auto-generated)
│   │   ├── 01_rocket_garden.jpg
│   │   ├── 02_atlantis_front.jpg
│   │   └── ...
│   └── thumbs/                  # Thumbnails (auto-generated)
│       ├── thumb_01_rocket_garden.jpg
│       ├── thumb_02_atlantis_front.jpg
│       └── ...
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

### Advanced Features

#### Smart Sync Technology
- **Caption Preservation**: Maintains all your custom captions when adding new photos
- **Backup Creation**: Automatically creates backups before modifying album.ts
- **Statistics Reporting**: Shows exactly what was preserved/added/removed
- **Edge Case Handling**: Gracefully handles missing directories and empty galleries

#### Image Optimization
The automated script handles all optimization:
- **Web images**: Resized with aspect ratio preservation, EXIF orientation correction
- **Thumbnails**: Optimized for fast grid loading with `fit: 'inside'` to prevent distortion
- **Format**: High-quality JPEG with metadata stripping for privacy
- **Performance**: Lazy loading with native browser support

### Converting Old Image Slider Albums

When converting existing Image Slider albums to the modern format:

1. Replace `index.md` with `index.mdx`
2. Create `album.ts` with the photo data
3. Remove `ImageSlider.js` and `SliderData.js`
4. Update image paths to use the new structure
5. Add thumbnail versions of images

## Three-Tier Photo Management System with Lazy Loading

### Overview

This system implements a professional photo management workflow with lazy loading for optimal performance and organization.

### Three-Tier Structure

#### 🗂️ Set A: `originals/`
**Master Archive (Full Resolution, No Processing)**
- Original camera files with no modifications
- Highest quality for future processing
- Stored in private repositories as backup
- Never used directly in web display

#### 🌐 Set B: `web/`
**Web-Optimized Display Images**
- Resized to ≤1200px for optimal web viewing
- Watermarked with Herbert Yang Photography branding
- High quality (85% JPEG) for crisp display
- Used in lightbox full-screen view

#### 🖼️ Set C: `thumbs/`
**Grid Thumbnails (Lazy Loading)**
- Small thumbnails (300px) for fast grid display
- Optimized for quick browsing (80% JPEG quality)
- Used in gallery grid with native lazy loading
- Enable instant gallery navigation

### Gallery Structure Example

```
docs/gallery/2025/vintage-car-show/
├── index.mdx                    # Gallery page
├── album.ts                     # Photo configuration
├── originals/                   # Set A: Master archive
│   ├── vintage-car-1.jpg        # Original camera file
│   └── vintage-car-2.jpg
├── web/                         # Set B: Web display (watermarked, ≤1200px)
│   ├── vintage-car-1.jpg        # Processed for web
│   └── vintage-car-2.jpg
└── thumbs/                      # Set C: Grid thumbnails (300px)
    ├── thumb_vintage-car-1.jpg  # Fast loading thumbnail
    └── thumb_vintage-car-2.jpg
```

### Lazy Loading Implementation

**PhotoGallery Component Strategy:**
1. **Instant Grid Display**: Shows Set C thumbnails immediately
2. **On-Demand Full Images**: Loads Set B images only when lightbox opens
3. **Native Browser Lazy Loading**: Images outside viewport load as needed
4. **Optimal User Experience**: Fast browsing + high quality viewing

**Performance Benefits:**
- **Grid loads in ~500ms**: Small thumbnails display instantly
- **Reduced bandwidth**: Only load full images when needed
- **Better UX**: Users can browse quickly without waiting
- **Scalable**: Works with hundreds of photos

### Image Processing Pipeline

**Automated Processing Script:**
Use the global `gallery-processor` command for all gallery operations:

```bash
# Process current gallery (run from gallery directory)
gallery-processor

# Dry run to preview changes without making them
gallery-processor --dry-run

# Force reprocessing of all images (bypasses existing file checks)
gallery-processor --force
```

**The script automatically:**
- Detects image source in `img/originals/`
- Reads actual image dimensions for proper aspect ratios
- Handles EXIF orientation correction
- Creates optimized web and thumbnail versions
- Generates TypeScript album configuration with real dimensions
- Creates SEO-optimized MDX gallery pages
- Uses Smart Sync to preserve custom captions on updates



### Photo Organization Strategy

#### Directory Structure
```
gallery/2025/album-name/


## References

- https://gotofritz.net/blog/blog-with-sveltekit-and-markdown
- https://fantinel.dev/blog-development-sveltekit/
- https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog
- https://mattjennings.io/blog/rewriting-my-website-in-sveltekit
- https://www.programonaut.com/how-to-create-a-blog-with-svelte-step-by-step/