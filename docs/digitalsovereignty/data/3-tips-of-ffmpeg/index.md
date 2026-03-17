---
title: Tips of using FFmpeg
description: Tips of using FFmpeg to merge audio files, trim audio files, create fade-in/out effects and split up files
image: './img/swissknife.jpg'
keywords: [m4a, mp4, ffmpeg, audio, video]
---

import Donation from '../../../donation.md';

# Use FFmpeg to handle media files

## Install FFMmpeg

Install Swiss-Army knife of multimedia operation, [FFmpeg](https://www.ffmpeg.org/download.html)

## Merge multiple files

```bash
ffmpeg -i first.mp3 -i second.mp3 -filter_complex [0:a][1:a]concat=n=2:v=0:a=1 out.mp3
```

:::note
This method will do a re-encoding of the input files. 
:::

To skip re-encoding, use the concat demuxer

Create a text file `list.txt`

```bash
file '/path/to/first.mp3'
file '/path/to/second.mp3'
```

Then

```bash
ffmpeg -f concat -i list.txt -c copy out.mp3
```

## Create fade-in/fade-out

This will start the input at `00:00:00` mark. At the `48` seconds mark, it will start imposing a `fade-out` effect for the next `11` seconds, from `00:00:48` to `00:00:59`.

```bash
ffmpeg -ss 0 -i input.mp3 -af "afade=type=out:start_time=48:duration=11" -c:a libmp3lame output.mp3
```

This will start the input at `00:00:25` mark. At the `0` second mark, it will start imposing a `fade-in` effect for the next `5` seconds, from `00:00:00` to `00:00:05`.

```bash
ffmpeg -ss 25 -i input.mp3 -af "afade=type=in:start_time=0:duration=5" -c:a libmp3lame output.mp3
```

## Split a video into multiple parts

This command takes an input video file `input_big.mp4` and splits it into equal parts of `3600` seconds (1 hour). 

```bash
ffmpeg -i input_big.mp4 -acodec copy -f segment -segment_time 3600 -vcodec copy -reset_timestamps 1 -map 0 output_time_%d.mp4
```

- `-i` specifies the input file, in our case, `input_big.mp4`
- `-acodec copy` sets the audio codec for the output to copy, which means the audio stream will be copied **without** re-encoding
- `-f` segment sets the format to segment
- `-segment_time 10` specifies the duration of each segment to `3600` seconds
- `-vcodec copy` sets the video codec for the output to copy, which means the video stream will be copied **without** re-encoding
- `-reset_timestamps 1` resets timestamps for each segment and creates segments with continuous timestamps
- `-map 0` maps all the streams from input to the output
- `output_time_%d.mp4` defines the naming pattern for the output files, where `%d` in the naming pattern is a placeholder for a numeric index

## Add overlay background picture

To add a background image to create an overlay effect (ie. the video is on top of the bigger image that is beneath the video) like this, 

![overlay](./img/overlay.png)

Use overlay filter from FFmpeg

```bash
ffmpeg -loop 1 -i image.jpg -i input_video.mp4 -filter_complex "overlay=(W-w)/2:(H-h)/2:shortest=1,format=yuv420p" -c:a copy output_video.mp4
```

This command will take a moment to run as it needs to render a new video file with the new `image.jpg` added to every frame. 

:::info
The width of the background image must be an **EVEN** integar that can be divided by 2. For example, 720 would work but 721 would cause an error message.
:::

## References

- https://superuser.com/questions/1215824/ffmpeg-command-for-concatenate-two-mp3-files
- https://stackoverflow.com/questions/71114148/ffmpeg-to-cut-beginning-and-fade-in-audio
- https://www.baeldung.com/linux/ffmpeg-split-video-parts

<Donation />