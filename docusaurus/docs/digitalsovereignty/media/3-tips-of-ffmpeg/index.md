---
title: Use FFmpeg to handle audio files
description: Tips of using FFmpeg to merge audio files, trim audio files and create fade-in/out effects
image: './img/audio.jpg'
keywords: [m4a, mp4, ffmpeg, audio]
---

import Donation from '../../../donation.md';

# Use FFmpeg to handle audio files

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

## References

- https://superuser.com/questions/1215824/ffmpeg-command-for-concatenate-two-mp3-files
- https://stackoverflow.com/questions/71114148/ffmpeg-to-cut-beginning-and-fade-in-audio

<Donation />