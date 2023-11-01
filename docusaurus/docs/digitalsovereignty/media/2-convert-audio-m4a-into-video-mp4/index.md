---
title: Convert audio files into video files
description: Use Swiss-Army knife FFmpeg command-line tool to transform any audio files such as m4a into video files such as mp4 
image: './img/ffmpeg-logo.png'
keywords: [m4a, mp4, ffmpeg, audio, video]
---

# Convert Audio m4a Into Video mp4

## Install

Install [FFmpeg](https://www.ffmpeg.org/), a very powerful and versatile multimedia processing tool, with `brew` on macOS.

```bash
brew update
brew upgrade
brew install ffmpeg
```

Wait for the installation to finish (could take a long time) and verify the installation by launching FFmpeg

```bash
ffmpeg
```

## From m4a to mp3

```bash
ffmpeg -i file_name.m4a file_name.mp3
```

## From mp3 to mp4

```bash
ffmpeg -f lavfi -i color=c=black:s=1280x720 -i input.mp3 -shortest -fflags +shortest output.mp4
```

## From m4a to mp4 directly

```bash
ffmpeg -f lavfi -i color=c=black:s=1280x720 -i input.m4a -shortest -fflags +shortest output.mp4
```

## Reference

- [how to convert output.mp3 to mp4 with ffmpeg?](https://unix.stackexchange.com/questions/657519/how-to-convert-output-mp3-to-mp4-with-ffmpeg)

