import re
import json


def ansi_256_to_rgb(code):
    # Standard 16 ANSI colors
    standard_colors = [(0, 0, 0), (128, 0, 0), (0, 128, 0), (128, 128, 0), (0, 0, 128), (128, 0, 128), (0, 128, 128), (192, 192, 192), (128, 128, 128), (255, 0, 0), (0, 255, 0), (255, 255, 0), (0, 0, 255), (255, 0, 255), (0, 255, 255), (255, 255, 255)]

    if code < 16:
        return standard_colors[code]
    elif code < 232:
        code -= 16
        r = (code // 36) * 51
        g = ((code % 36) // 6) * 51
        b = (code % 6) * 51
        return (r, g, b)
    else:
        shade = 8 + (code - 232) * 10
        return (shade, shade, shade)


def translate_characters(chars):
    return chars.replace("..", "  ")  # Replace '..' with two spaces


def parse_frame(frame):
    pattern = re.compile(r"\x1b\[38;5;(\d+)m(..)\x1b\[0m")
    char_frame = []
    color_frame = []

    for line in frame.split("\n"):
        char_line = ""
        color_line = []
        last_color = None
        count = 0
        for match in pattern.finditer(line):
            ansi_code, chars = match.groups()
            if ansi_code == "16":
                chars = "  "
            color = ansi_256_to_rgb(int(ansi_code))

            char_line += chars
            if color != last_color:
                if last_color is not None:
                    color_line.append((last_color, count))
                last_color = color
                count = len(chars)
            else:
                count += len(chars)
        if last_color is not None:
            color_line.append((last_color, count))
        if char_line != "":  # Check if the line is not completely empty
            char_frame.append(char_line)
            color_frame.append(color_line)
    return char_frame, color_frame


def convert_shell_script_to_js(shell_script_path, js_output_path):
    with open(shell_script_path, "r") as file:
        content = file.read()

    frames = re.split(r"sleep 0\.033\s*\n", content)
    parsed_frames = []
    for frame_1 in range(0, len(frames), 2):
        frame = frames[frame_1]
        char_frame, color_frame = parse_frame(frame)
        # Check if there is any non-empty line in the frame
        if any(line.strip() for line in char_frame):
            parsed_frames.append((char_frame, color_frame))

    with open(js_output_path, "w") as js_file:
        js_file.write("const frames = [\n")
        for frame in [frame[0] for frame in parsed_frames]:
            js_file.write("  [\n")
            for line in frame:
                js_file.write("    " + json.dumps(line) + ",\n")
            js_file.write("  ],\n")
        js_file.write("];\n\n")

        js_file.write("const colors = [\n")
        for color_frame in [frame[1] for frame in parsed_frames]:
            js_file.write("  [\n")
            for line in color_frame:
                # Write the RLE color data
                js_file.write("    " + json.dumps(line) + ",\n")
            js_file.write("  ],\n")
        js_file.write("];\n")

        # Add export statement can be used when not putting the code in a module
        # js_file.write("\nexport { frames, colors };")

        # Append the `rendering_code.js` content to the output file
        with open("rendering_code.js", "r") as rendering_code_file:
            js_file.write(rendering_code_file.read())


# Example usage
convert_shell_script_to_js("art.sh", "art.js")
