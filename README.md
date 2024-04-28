# Web ASCII Video

## Setup
Create a conda environment with python 3.7
```bash
conda create -n web-ascii-video python=3.7
conda activate web-ascii-video
```

### install https://github.com/joelibaceta/video-to-ascii
Thanks to joelibaceta for the video-to-ascii package. This will convert the video to a ascii art shell script.
```bash
pip install video-to-ascii==1.2.8
pip install opencv-python
```

## Change the resolution
Unfortunately the video-to-ascii package does not support custom resolution so we have to edit the strategy file. If someone wants improve this repo please make a PR to the video-to-ascii package to support custom resolution.
Edit the strategy file to the correct resolution, for example 280x60. 
```bash
sed -i 's/^DEFAULT_TERMINAL_SIZE.*/DEFAULT_TERMINAL_SIZE = 280, 60/' ~/miniconda3/envs/web-ascii-video/lib/python3.7/site-packages/video_to_ascii/render_strategy/ascii_strategy.py
```

## Render the ascii art
name your mp4 file to input-video.mp4 and run the following command.
```bash
bash run.sh
```
This will create a file called art.sh.gz. This file contains the compressed ascii art of the video.

## Test by serving the index_local.html
Serve the index.html with a web server. For example in vscode you can use the live server extension [ritwickdey.liveserver]. Just right click on the index_local.html and select "Open with Live Server".

## Upload to for example github
Upload the compressed javascript file to github. Be sure to have it public. Create a tag, for example "v0.1".

## Create a CDN link
Create a CDN link to the javascript file in github. Do this by copying the URL of art.sh.gz on github and enter it in for example jsdelivr: https://www.jsdelivr.com/github 

## Test by serving the index_web.html
First replace the URL in the index_web.html with the CDN link. Then serve the index_web.html with a web server. For example in vscode you can use the live server extension [ritwickdey.liveserver]. Just right click on the index_web.html and select "Open with Live Server".