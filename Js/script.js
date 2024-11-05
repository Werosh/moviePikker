const sliderImages = document.querySelector('.slider_images');
const images = document.querySelectorAll('.slider_images img');
const leftArrow = document.querySelector('.left_arrow');
const rightArrow = document.querySelector('.right_arrow');

let currentIndex = 0;
const imageWidth = 400; // Width of each image
const totalImages = images.length;

// Clone images for seamless looping
sliderImages.append(...Array.from(images).map(img => img.cloneNode(true)));

// Move to the next image with a loop effect
function moveToNextImage() {
    currentIndex++;
    updateSliderPosition();
    if (currentIndex >= totalImages) {
        setTimeout(() => {
            sliderImages.style.transition = "none";
            currentIndex = 0;
            updateSliderPosition();
        }, 500); // Transition delay to hide snapping
    }
}

// Update the slider position
function updateSliderPosition() {
    sliderImages.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
    sliderImages.style.transition = "transform 0.5s ease"; // Smooth transition
}

// Event listeners for navigation arrows
rightArrow.addEventListener('click', moveToNextImage);
leftArrow.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1;
    updateSliderPosition();
});

// Auto-slide every 3 seconds
let autoSlide = setInterval(moveToNextImage, 3000);

// Pause auto-slide on hover and resume on mouse leave
sliderImages.addEventListener('mouseenter', () => clearInterval(autoSlide));
sliderImages.addEventListener('mouseleave', () => autoSlide = setInterval(moveToNextImage, 2000));
