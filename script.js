const container = document.querySelector('.container');
const boxes = document.querySelectorAll('.box');
let startY = 0;
let currentIndex = 0;

// Add event listeners for mouse and touch events
container.addEventListener('mousedown', startDrag);
container.addEventListener('touchstart', startDrag);
container.addEventListener('mouseup', endDrag);
container.addEventListener('touchend', endDrag);

function startDrag(event) {
    startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
}

function endDrag(event) {
    const endY = event.type === 'mouseup' ? event.clientY : event.changedTouches[0].clientY;
    const diffY = endY - startY;

    if (Math.abs(diffY) > 50) {
        if (diffY < 0 && currentIndex < boxes.length - 1) {
            // Swipe up: Move to the next box
            currentIndex++;
        } else if (diffY > 0 && currentIndex > 0) {
            // Swipe down: Move to the previous box
            currentIndex--;
        }

        updateActiveBox();
    }
}

function updateActiveBox() {
    // Reset all boxes
    boxes.forEach((box, index) => {
        box.classList.toggle('active', index === currentIndex);
    });

    // Center the active box smoothly
    const boxHeight = 300; // Box height
    const gap = 20; // Space between boxes
    const scaledBoxHeight = boxHeight * 1.2; // Height of the scaled box
    const offset = -(currentIndex * (scaledBoxHeight + gap)) + (scaledBoxHeight - boxHeight) / 2; // Adjusting for scale

    container.style.transform = `translateY(${offset}px)`; 
    container.style.transition = 'transform 0.3s ease'; // Ensure smooth swipe animation
}

// Initialize the first box as active
updateActiveBox();
