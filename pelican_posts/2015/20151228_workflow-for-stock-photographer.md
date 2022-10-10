Title: Workflow For an Aspiring Stock Photographer Using Lightroom and Symbiostock on Self-hosted Wordpress Site
Date: 2015-12-28 08:00
Tags: 
Category: Photography
Slug: workflow-for-stock-photographer-with-lightroom-and-symbiostock
Summary: Workflow to make photos available for sale as a stock photographer using Lightroom, Symbiostock and Wordpress

# 1. Shoot Photos 

Image resolution to photography is like location to real estate business. It's the single most important factor that separates a professional photograph from an amateurish one. The rest - composition, noise, color, and all the technical aspects can all be learned and manipulated. For image resolution, you either have it, or you don't.

Interestingly, one of the reasons [I think that Instagram has become a wild success](http://guizishanren.com/instagram-photography-and-sharing/) while all its predecessors have failed (Flickr, Picasa) is that it shamelessly and smartly lowers the resolution requirement for a high-quality image. It must be unthinkable for an old-school photographer from pre-Instagram era, but well, here we are.

Advised by [Paul](http://thev.net), I'm now shooting with [Olympus OM-D E-M1](http://www.getolympus.com/us/en/e-m1.html), arguably the best mirrorless camera out there in 2015. Leica has a very good mirrorless camera, but it's 8X more expensive so it's in a league of its own (as always for Leica) and not a fair comparison to Olympus E-M1. [E-M1](http://www.amazon.com/Olympus-Mirrorless-Digital-Camera-3-Inch/dp/B00EQ07PG2) has 16.3 mega pixels resolution so it's good enough for entry-level stock photography. 

I use two Olympus lens, [M.Zuiko 17mm f/1.8 silver](http://www.bhphotovideo.com/c/product/900013-REG/Olympus_v311050su000_17mm_f_1_8_M_ZUIKO_Wide_Angle.html) for landscape, and [M.Zuiko 45mm f/1.8 silver](http://www.bhphotovideo.com/c/product/805165-REG/Olympus_V311030SU000_M_Zuiko_Digital_ED.html) for people portrait. 

Why not DSLR? Because it's too heavy and bulky to carry around. I started shooting with `Nikon D70` when it first came out in 2004. It's served me well over the years but it's run its course when my iPhone 5/6 has a higher resolution than D-70. More importantly, the mere act of carrying the camera around and being seen as someone who carries around a DSLR is enough to paralyze my desire to shoot. [Ming Thein's fascinating blog](http://blog.mingthein.com) demonstrates that E-M1 can produce high-quality professional-grade images. That's the last proof I need before making the switch from DSLR to mirrorless.

I only shoot with JPEG format, not RAW. I just don't have time to process RAW images. Dealing with JPEG is already quite a laborious task - that's why this workflow guide is necessary because achieving manageable efficiency is the No.1 challenge when it comes to photography, I think.

# 2. Import Photos into Library

Here comes a major decision - which software to use to organize and edit photos?

I use [Lightroom 4](http://www.adobe.com/products/photoshop-lightroom.html) and regret for all the years I wasted on iPhoto or Picasa. It's a shame to admit that I used to use them extensively - I didn't know any better, and certainly didn't give due respect to [my own photos](http://inturious.com). 

The software has to be vector-based and handles images at file-level. So amateur-level applications such as iPhoto and Picasa are out. It would be nice to manage both photo organization and photo editing, so many pure editing softwares are out, such as [GIMP](https://www.gimp.org) or [Sketch 3](https://www.sketchapp.com). It'd better not be as ridiculously expensive as Adobe Photoshop, so there are only several choices left. Lightroom is a popular choice among photographers. 

[Setting up Lightroom](http://guizishanren.com/how-to-manage-photos-part-2/) warrants an article on its own. The set-up also touches another critical question - how to set up a centralized file accessing and backup network at home, which is an even BIGGER question that can become very complicated very quickly. I'll discuss them later in separate posts.

I organize my Lightroom catalogs by year. So all my 2015 photos will be in Catalog 2015. Then I create a sub-folder for each month such as 01, 02, 03, ... 12. In each monthly folder I organize photos by events and create sub-folders for them.

As I import photos from E-M1 into Lightroom, Lightroom is able to split photos by each different date. I'll just put them into the right event folder under the right monthly folder. Note: if I need to move photos around among different folders, that action should take place ONLY in Lightroom. If such transactions (renaming and moving photos) take place outside of Lightroom (in Finder, for example), Lightroom will not be able to locate the images and it's a hassle to relocate the missing ones. 

After putting the photos into the right folders, I do two things at this stage:

1. **Delete photos**. I try to cap the "photo survival rate"" at 1/10, ie. only one out of every ten photos I take is worth keeping. It's probably an aggressive number. In general most photos are not worth keeping and no one would ever bother to look at them again, including myself. I still need to do a better job at maintaining a lean and valuable asset base.
2. **Rename photos**. After deletion clean-up, it makes sense now to rename the photos in a folder so that they can be properly indexed. I use **YYYYMM_EventName_SerialNumber** as the file-naming format. A photo would be 201210_BostonTrip_042.jpg for example. There are three image meta data that could be confusing and should be clarified:
	- Filename: This is only meaningful to yourself. So pick something that makes it easy for you to index it, find it, and organize it. Other people or systems don't really care about it because most likely they (other systems) will serialize your photos with their own naming system anyway.
	- Title: This is THE `Title` that will be displayed on top of the image if this image is shared on any online platform such as Flickr or Wordpress. This is an important meta that will impact the search engine effectiveness of the image. 
	- Caption: Some description/summary of the image. It's nice to have but not as critical as Title. If a platform has to choose to display only one of the two between Title and Caption, they will always display Title and omit Caption (or display Caption only on a more detailed page).

# 3. Edit Photos in LightRoom

1. Set up 4 smart collections. The rules are: 1) Rating is 5 star; 2) Label Color is XXX. Replace `XXX` with the below colors to mark different stages of photo processing. During the mass-edit process, selected photos will flow through Stage 1 to 4 with a simple toggle of different keys from Num-pad on keyboard. This is a one-time set-up effort that's only needed when I need to configure a new catalog. 
	- Stage 1 - `Num Key 6` - `Red`: pending Edit
	- Stage 2 - `Num Key 7` - `Yellow`: pending Meta
	- Stage 3 - `Num Key 8` - `Green`: pending Upload
	- Stage 4 - `Num Key 9` - `Blue`: Upload Complete
2. Select which photos for publishing. I give 5 star for a photo that is worth selling as stock images. The shortcut key for flagging an image as 5 star is `Num Key 5`. As I work through various folders, selected photos for sale end up in the smart collection `RED`. 
3. Edit photos
	- Crop into the right size. Crop every photo into `4:3`, which is the original aspect ratio that all other sizes are derived from. Every other size is just a different cropping of the original 4:3 image. Many cameras can change to other fancier aspect ratios such as 16:9. That may not be a good idea as a different aspect ratio will affect your composition. Shoot everything in 4:3 and crop them into whatever other sizes you need later. 
	- Crop away unnecessary objects. Ideally this decision (composition) should be made at time of shooting in ViewFinder of the camera. 
	- Adjust angle. Make sure every photo is flat with no tilting. 
	- Sharpening
		- `Amount: 50`
		- `Radius: 1`
		- `Detail: 25 ~ 50`
		- `Masking: 0`		
	- Noise Reduction
		- `Luminance: 50`
		- `Detail: 50`
		- `Contrast: 0`
		- `Color: 0`	
	- Adjust colors. Only do the minimum that is necessary to enhance the image quality. I usually only adjust (if at all):
		- `Highlights`
		- `Shadows`
		- `Whites`
		- `Blacks`
		- `Clarity`
		- `Vibrance`
	- Other ratios such as Exposure, Contrast and Saturation have too much impact on the image.
4. Edit meta information
	- Title. Pick something that is meaningful and interesting to potential viewers.
	- Caption. Ideally write something that tells a story like what National Geographic does for its photos on Instagram. In reality it just takes too much time to do it well.
	- Keywords. Add 5 ~ 10 keywords to each image. Ideally the more keywords the merrier, but then the entire process becomes quickly unsustainable when you try to add 20-50 keywords to each image. There are some tools available but it's still quite a mind-boggling exercise. Only add relevant keywords and don't try to shoot for large quantities. 
5. Export photos. For stock photography, I'd suggest the following export settings:
	- Export Location
		- Put in Subfolder XXX
		- Add to this Catalog: `unchecked`
		- Existing Files: `Ask what to do`
	- File Naming: `unchecked` (already performed in above steps)
	- Video: `unchecked`
	- File Settings: `JPEG` + `100%` + `sRGB`
	- Image Sizing: `unchecked` (Symbiostock plug-in will take care of this)
	- Output Sharpening: `Sharpening Off`
	- Metadata: `All` + `Normal`
	- Watermarking: `No watermark` (Symbiostock plug-in will take care of that)
	- Post-Processing: `Do Nothing` 

# 4. Upload Photos to Symbiostock Site

1. Upload photos using [FileZilla](https://filezilla-project.org) to [Wordpress site](https://wordpress.org) with [Symbiostock plug-in](https://wordpress.org/plugins/symbiostock/) installed
	- Only use version before 3.10 as there is a show-stopper level major bug for versions 3.10 and later. I use `version 3.9.0.5`.
	- Download the exported photos into wordpress folder: `~/ss_media/new/`
2. Run cron script from Symbiostock to index the new uploads and generate thumbnails. The script is located in `Symbiostock/Settings/Symbiostock Processor` on Wordpress menu.
3. Quick edit for final touch-up on Wordpress site
	- Category. Unfortunately this is a manual process. You have to label each image imported through Symbiostock with the appropriate category. Note: an image can be labeled in MULTIPLE categories in Symbiostock/Wordpress. 
	- Featured? Flag for images that you need to be displayed prominently as "Featured Images" on the landing page.
	- Title length. Another manual process unfortunately. For my chosen layout from [Symbiostock Express Wordpress theme](http://www.symbiostock.org/product/symbiostock-express/), I need to make sure the title has the right length for `2` lines. If a title is too short in only one line, or too long in three lines, it will disrupt the layout of the index page for the thumbnails spoils the UI harmony. 
	- Applicable image license. I have set up [five licenses](http://inturious.com/licensing/) based on 5 different aspect ratios. For my recent photos taken with E-M1, the raw image's aspect ratio can reach 16MP, in which case all five licenses would apply. For my earlier photos taken with Nikon D70 or Leica D-Lux 3, the image resolution may not be high enough to max out all five licenses. In that case I need to delete the redundant license for that image, which is again a manual operation unfortunately.
	
That's the entire workflow to make photos available for sale on a Symbiostock-enabled Wordpress-based self-hosted site. Excluding the initial one-time setup, the time required for each step is roughly:

- Shooting: infinite time ???
- Importing & Preliminary Editing (deletion and renaming): 1 ~ 2 hours
- Editing: 5 ~ 10 minutes per image
- Uploading: 1 hour

It ain't easy to create something valuable.