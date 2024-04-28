# Web ASCII Video
This repository contains a project that converts videos to ASCII art which can then be displayed via a web interface.

## Result:

https://github.com/pinkponk/web-ascii-video/assets/14301446/aa68a065-8591-4c67-bff3-8f366d4102bb

## Input video:
Created using [Spline](https://app.spline.design/community/file/f63c267f-bd6c-4079-a43f-00bcc20d6520).

https://github.com/pinkponk/web-ascii-video/assets/14301446/6affcf59-c373-492e-bcc8-2b26174a946d

## Prerequisites

Before you start, ensure you have Conda installed on your system. This project uses a Conda environment with Python 3.7.

## Setup

### Environment Setup

Create and activate a Conda environment:

```bash
conda create -n web-ascii-video python=3.7
conda activate web-ascii-video
```

### Dependency Installation

Install the `video-to-ascii` and `opencv-python` packages:

```bash
pip install video-to-ascii==1.2.8
pip install opencv-python
```

Credit to [joelibaceta](https://github.com/joelibaceta) for the `video-to-ascii` package, which is essential for converting videos into ASCII art.

## Configuration

### Adjust Video Resolution

To change the resolution output by `video-to-ascii`, modify the resolution settings in the strategy file:

```bash
sed -i 's/^DEFAULT_TERMINAL_SIZE.*/DEFAULT_TERMINAL_SIZE = 380, 90/' ~/miniconda3/envs/web-ascii-video/lib/python3.7/site-packages/video_to_ascii/render_strategy/ascii_strategy.py
```

**Note:** The package currently does not support dynamic resolution settings. Contributions to add this feature are welcome—please consider submitting a pull request to the `video-to-ascii` repository.

## Usage

### Rendering ASCII Art

Convert your MP4 video file to ASCII art by running the following script. Rename your file to `input-video.mp4` before proceeding:

```bash
bash run.sh
```

This script generates a compressed ASCII art file named `art.sh.gz`.

### Local Testing

Serve the `index_local.html` file using a local web server. If using Visual Studio Code, the Live Server extension can be helpful:

```bash
Right-click on index_local.html > Open with Live Server
```

### Deployment

#### Uploading to GitHub

Upload the `art.sh.gz` file to GitHub and ensure it is public. You can create a tag (e.g., `v0.2`) or use a permalink to reference the file directly:

```bash
https://github.com/pinkponk/web-ascii-video/blob/v0.2/art.js.gz
```

#### Creating a CDN Link

For faster loading, create a CDN link to your JavaScript file hosted on GitHub using [jsDelivr](https://www.jsdelivr.com/github):

```bash
https://cdn.jsdelivr.net/gh/pinkponk/web-ascii-video@v0.2/art.js.gz
```

### Serving Web Content

Replace the URL in `index_web.html` with your CDN link and serve this file using a local web server:

```bash
Right-click on index_web.html > Open with Live Server
```

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with any enhancements, including support for dynamic resolution settings or other features.

---

This version of the README is more structured, with clear separation of setup, usage, and contributing guidelines, enhancing readability and user engagement.
