How to Convert PPT Slides into Quicktime Movie
==============================================

date
:   2013-06-28 12:34

author
:   admin

category
:   Apple\_苹果

tags
:   Apple, audio, keynote, movie, ppt, presentation, quicktime, slide,
    slideshow

slug
:   how-to-convert-ppt-slides-into-quicktime-movie

As someone who produces [high-quality
slides/videos](http://guizishanren.com/a-day-in-a-sloans-life/) on
regular basis, I often find it necessary to convert powerpoint slides
into portable movies for ease of sharing, especially via online
streaming. Through much trial and error and trying to stay away from
abusing commercial third-party softwares, I've finally figured out the
following method to convert a multimedia (with text, pictures and
audios) power point slide show into an online video. Surprisingly it's
much more difficult than I thought.

​1. Use Apple's Keynote, not Microsoft's lowly Powerpoint, to do the
slides.

Microsoft's Powerpoint (as part of Office) cannot export slide
presentation into movie file while retaining high-definition image
quality. Only Keynote has the potential to do that.

​2. Buy DRM ("digital-rights-management")-free audio files from Amazon,
in mp3 format.

Apple's iTunes only provides AAC format for music, which carries
complicated digital rights protection measures. Mp3 format is much
easier to work with.

3.  Complete the slideshow in Keynote with audio files.

This is self-explanatory.

​4. Now, ladies and gentlemen, the mysterious settings you have to use
when exporting the slide show into a quicktime movie. This is the holy
grail.

(it's been well-documented on various Internet forums and communities
that Keynote will lose the audio when exporting slide show into
quicktime format. Given Apple's reputation in this domain, it's very
surprising that this seemingly easy process is such a pain. Many power
users have proposed various workarounds, such as using Apple's Garage
Band to combine video and audio files in a separate step. My method is
new, unique, effective, and only use Keynote itself.)

(must-have options are in bold)

**=\> File =\> Export =\> Quicktime**

**=\> Playback Uses =\> Fixed Timing**\
 Slide Duration: 1.0 seconds\
 Build Duration: 1.0 seconds\
 Repeat: None\
 Enter Full Screen Mode When Opened: Check

**=\> Formats =\> Custom ...**\
 \**Audio: include audio =\> Check*\*\
 \**Audio: include the slideshow soundtrack =\> Check*\*

Once "Custom ..." is chosen, a new window will pop up. This is the key
step.

**=\> Video, Full Size**\
 1024 x 768 pixels\
 Settings:\
 \**Compression Type: H.264*\*\
 Frame Rate: 24 fps\
 \**Key Frames: All*\*\
 Compressor Quality: Best\
 Encoding: Best Quality (multi-pass)\
 \**Date Rate: Automatic*\*

**=\> Audio, Mix Audio**

Settings:\
 \**Format: Apple Lossless*\*\
 \**Channels: Stereo (L R)*\*\
 Rate: 44,100 kHz\
 Render Setting: Quality, Best

The screenshot at this step is like this:

[![Keynote](http://guizishanren.com/wp-content/uploads/2013/06/Keynote.png)](http://guizishanren.com/wp-content/uploads/2013/06/Keynote.png)

Any deviation from the above step may render the final exported
quicktime movie with no audio sound or compromised image quality. Here's
an [example](http://youtu.be/z9NjT3rmnsQ).
