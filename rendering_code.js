
let width = frames[0][0].length / 2;
let height = frames[0].length;

var asciiArtCanvas = document.getElementById('asciiArtCanvas');
var ctx;  // Canvas rendering context

// var fontSize = window.innerWidth / width / 2.0;
var fontSize = parseInt(getComputedStyle(asciiArtCanvas).fontSize);
var sizeModifier = fontSize * 1.0;


// Function to initialize the canvas
function initializeCanvas(width, height) {
    // get the pixel width of the window and calculate the font size

    asciiArtCanvas.width = width * sizeModifier;  // Adjust the multiplier based on your font size and desired spacing
    asciiArtCanvas.height = height * sizeModifier;  // Same as above, adjust as needed
    ctx = asciiArtCanvas.getContext('2d');
    ctx.font = fontSize + "px monospace";

}

function animateAsciiArt(frameInterval) {
    let frameIndex = 0;
    let interval = setInterval(() => {
        if (frameIndex >= frames.length) {
            clearInterval(interval);
            return;
        }

        updateAsciiArt(frames[frameIndex], colors[frameIndex]);
        frameIndex++;
    }, frameInterval);
}

// Function to update the canvas
function updateAsciiArt(asciiFrame, colorFrame) {
    ctx.clearRect(0, 0, asciiArtCanvas.width, asciiArtCanvas.height); // Clear the canvas

    for (let rowIndex = 0; rowIndex < asciiFrame.length; rowIndex++) {
        let colorIndex = 0;
        let row = asciiFrame[rowIndex];
        let colorRow = colorFrame[rowIndex];
        let currentColor = colorRow[0][0];
        let colorCount = colorRow[0][1];

        for (let charIndex = 0; charIndex < row.length; charIndex += 2) {
            let char = row.substring(charIndex, charIndex + 2);


            // Read the RLE encoded color value
            if (colorCount === 0) {
                colorIndex++;
                currentColor = colorRow[colorIndex][0];
                colorCount = colorRow[colorIndex][1];
            }
            colorCount -= 2;

            if (char === '  ') {
                continue;
            }
            if (char == 'ee') {
                // Random 2 chars instead
                char = String.fromCharCode(Math.floor(Math.random() * 94) + 33) + String.fromCharCode(Math.floor(Math.random() * 94) + 33);
            }

            // // Set fill style for the background with lower opacity
            // ctx.fillStyle = `rgba(${currentColor.join(', ')}, 0.2)`;
            // // Draw background rectangle
            // ctx.fillRect((charIndex / 2) * sizeModifier, rowIndex * sizeModifier - fontSize, sizeModifier, sizeModifier);  // Adjust the size and position as needed


            ctx.fillStyle = `rgb(${currentColor.join(', ')})`;

            // Draw the character at the correct position
            ctx.fillText(char, (charIndex / 2) * sizeModifier, rowIndex * sizeModifier);  // Adjust x and y position based on font size and spacing
            ctx.fillText('::', (charIndex / 2) * sizeModifier, rowIndex * sizeModifier);  // Adjust x and y position based on font size and spacing


        }
    }
}



// Initialize the canvas and start the animation
initializeCanvas(width, height);  // Adjust canvas size as needed
animateAsciiArt(70);  // Adjust frame interval as needed (in milliseconds)