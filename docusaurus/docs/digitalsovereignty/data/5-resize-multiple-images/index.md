---
title: Resize multiple images 
description: resize the width of multiple images using ImageMagick
image: './img/resize.jpg'
keywords: [image, ImageMagick, resize, PNG, JPG]
---

import Donation from '../../../donation.md';

# Resize Multiple Images with ImageMagick

![resize](./img/resize.jpg)

## Problem

Sometimes, we need to resize multiple images quickly with the same dimension like the same width or height. This method can quickly do that with an image tool ImageMagick. 

## Install ImageMagick

[ImageMagick](https://www.imagemagick.org/script/index.php) is a powerful image processing tool for command-line. 

On Mac, install ImageMagick with brew.

```bash
brew install imagemagick
```

or if on Mac with M1/M2/M3 chips, following [this guide](https://herbertyang.xyz/docs/digitalsovereignty/mac/use-brew-on-m1-mac/):

```bash
arch -x86_64 brew install imagemagick
```

## Prepare

Create a directory `/xyz`and put all the images there. 

:::tip
Use the same naming convention for the image file names such as:

- `imagefile_001.png`
- `imagefile_002.png`
:::

## Resize

In the newly created directory `/xyz`, run this 

```bash
mogrify -resize 1000 *.png
```

This sub-command `mogrify` from ImageMagick will set the **width** of all the `.png` image files in folder `/xyz` to be `1000px`.

Or you can resize the images with the same height, for all the png and jpg files.

```bash
mogrify -resize x500 *.png *.jpg
```

This will set the **height** of all the `.png` AND `.jpg` image files to be `500px`. 

## Reference

- [How do I batch-resize images in ImageMagick while maintaining aspect ratio and a max width and height?](https://stackoverflow.com/questions/56305138/how-do-i-batch-resize-images-in-imagemagick-while-maintaining-aspect-ratio-and-a)

<Donation />