---
title: Combine images into one PDF
description: Use ImageMagick command-line tool to combine multiple images into one single PDF file for ease of use and sharing
image: './img/ImageMagick.jpg'
keywords: [image, ImageMagick, PDF, PNG, JPG]
---

import Donation from '../../../donation.md';

# Convert Multiple Images Into One Single PDF

A lot of manga series found online are in image format, like JPG or PNG and it's one image for one page. Mac's Preview app can read them if needed, but that's not very convenient. It would be nice to convert them into one single PDF file so that it can be read in any device and easily shared with others. This can be accomplished with a command-line tool ImageMagick on Mac.

## Take screenshot

On Mac, there are a few ways to take a screenshot:

`Command + Shift + 3` will take a snapshot in PNG for the entire window displayed on the mac, saving the image to ~/Desktop.

`Command + Shift + 4` will turn the cursor into an "aim" sign. Pressing `Space Bar` will highlight the entire area under the current browser window and the `aim` sign will turn into a `camera` sign. Pressing the camera sign will take the snapshot of the highlighted area within the browser window, saving the image to `~/Desktop`.

## Install ImageMagick

[ImageMagick](https://www.imagemagick.org/script/index.php) is a powerful image processing tool for command-line. 

On Mac, install ImageMagick with brew.

```bash
brew install imagemagick
```

## Combine images into PDF

First rename the screenshot images into something with an easily identifiable standard name.

```bash
-rw-r--r--@  1 zire  staff    3090 Jun  2 11:30 demo_1.png
-rw-r--r--@  1 zire  staff  426672 Jun  2 11:30 demo_2.png
-rw-r--r--@  1 zire  staff  798611 Jun  2 11:30 demo_3.png
```

Then move them into a separate folder. cd into this folder. Then convert them into a single PDF file.

```bash
convert demo*.png demo.pdf
```

Here you go. Hello, demo.pdf!

```bash
-rw-r--r--   1 zire  staff  986119 Jun  2 11:33 demo.pdf
-rw-r--r--@  1 zire  staff    3090 Jun  2 11:30 demo_1.png
-rw-r--r--@  1 zire  staff  426672 Jun  2 11:30 demo_2.png
-rw-r--r--@  1 zire  staff  798611 Jun  2 11:30 demo_3.png
```

## References

- Stack Overflow: [How can I convert a series of images to a PDF from the command line on Linux?](https://stackoverflow.com/questions/8955425/how-can-i-convert-a-series-of-images-to-a-pdf-from-the-command-line-on-linux)

<Donation />