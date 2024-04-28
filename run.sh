set -e
echo "Running"
video-to-ascii -f input-video.mp4  -o art.sh
python convert_shell_to_javascript.py
gzip art.js -c > art.js.gz
echo "Done"