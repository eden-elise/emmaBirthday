/**
 * Emma's Birthday Website - Interactive Features
 * Handles photo gallery, modal viewer, and sparkle animations
 */

// Photo collection with captions - edit the caption field to add your own!
const PHOTOS = [
    { path: 'assets/emma and me/IMG_0396.JPG', caption: 'One of my favorite memories with you!' },
    { path: 'assets/emma and me/IMG_0633.JPG', caption: 'That time we couldn\'t stop laughing' },
    { path: 'assets/emma and me/IMG_0809.jpg', caption: 'Adventures with my bestie' },
    { path: 'assets/emma and me/IMG_0854.jpg', caption: 'Making memories together' },
    { path: 'assets/emma and me/IMG_0989.JPG', caption: 'Best roomie moments' },
    { path: 'assets/emma and me/IMG_1009.jpg', caption: 'Living our best lives' },
    { path: 'assets/emma and me/IMG_1092.jpg', caption: 'You make everything more fun' },
    { path: 'assets/emma and me/IMG_1281.jpg', caption: 'Forever grateful for you' },
    { path: 'assets/emma and me/IMG_1620.JPG', caption: 'Another day, another adventure' },
    { path: 'assets/emma and me/IMG_1691.JPG', caption: 'Can\'t imagine life without you' },
    { path: 'assets/emma and me/IMG_1844.JPG', caption: 'My partner in crime' },
    { path: 'assets/emma and me/IMG_1892.jpg', caption: 'So glad I met you' },
    { path: 'assets/emma and me/IMG_1893.JPG', caption: 'Besties forever' },
    { path: 'assets/emma and me/IMG_1921.jpg', caption: 'You\'re the best!' },
    { path: 'assets/emma and me/IMG_2017.jpg', caption: 'Cherishing every moment' },
    { path: 'assets/emma and me/IMG_2189.JPG', caption: 'Love you to the moon and back' },
    { path: 'assets/emma and me/IMG_2471.jpg', caption: 'The best kind of therapy' },
    { path: 'assets/emma and me/IMG_2477.JPG', caption: 'Creating memories one day at a time' },
    { path: 'assets/emma and me/IMG_2573.jpg', caption: 'You light up every room' },
    { path: 'assets/emma and me/IMG_2587.jpg', caption: 'Laughing until it hurts' },
    { path: 'assets/emma and me/IMG_3050.jpg', caption: 'Through thick and thin' },
    { path: 'assets/emma and me/IMG_3331.jpg', caption: 'My favorite person' },
    { path: 'assets/emma and me/IMG_3725.JPG', caption: 'Good times with great people' },
    { path: 'assets/emma and me/IMG_3727.JPG', caption: 'Wouldn\'t trade this for anything' },
    { path: 'assets/emma and me/IMG_3744.JPG', caption: 'Blessed to have you' },
    { path: 'assets/emma and me/IMG_3756.JPG', caption: 'Every moment counts' },
    { path: 'assets/emma and me/IMG_3773.JPG', caption: 'You make life better' },
    { path: 'assets/emma and me/IMG_3805.JPG', caption: 'Friends who slay together...' },
    { path: 'assets/emma and me/IMG_4107.JPG', caption: 'More adventures to come!' },
    { path: 'assets/emma and me/IMG_6054.JPG', caption: 'The dream team' },
    { path: 'assets/emma and me/IMG_7100.JPG', caption: 'So many great memories' },
    { path: 'assets/emma and me/IMG_7178.JPG', caption: 'Here\'s to many more years' },
    { path: 'assets/emma and me/IMG_7426.jpg', caption: 'You\'re simply the best' },
    { path: 'assets/emma and me/IMG_7455.jpg', caption: 'Thankful for our friendship' },
    { path: 'assets/emma and me/IMG_7502.jpg', caption: 'Living for these moments' },
    { path: 'assets/emma and me/IMG_7965.jpg', caption: 'Never a dull moment with you' },
    { path: 'assets/emma and me/IMG_8292.jpg', caption: 'Pure happiness' },
    { path: 'assets/emma and me/IMG_8622.jpg', caption: 'Making the best memories' },
    { path: 'assets/emma and me/IMG_8678.jpg', caption: 'Friendship goals' },
    { path: 'assets/emma and me/IMG_8682.jpg', caption: 'Always by your side' },
    { path: 'assets/emma and me/IMG_8689.jpg', caption: 'Love these moments' },
    { path: 'assets/emma and me/IMG_8765.jpg', caption: 'You\'re my person' },
    { path: 'assets/emma and me/IMG_8795.jpg', caption: 'Cheers to us!' },
    { path: 'assets/emma and me/IMG_8826.jpg', caption: 'Best friends for life' },
    { path: 'assets/emma and me/IMG_8837.jpg', caption: 'Every day is an adventure' },
    { path: 'assets/emma and me/IMG_9874.jpg', caption: 'Happy birthday to my favorite human!' }
];

// Configuration constants
const SPARKLE_COUNT = 30;
const SPARKLE_COLORS = ['#ffd700', '#ff69b4', '#ff1493', '#ffffff'];

// DOM element references
const gallery = document.getElementById('photoGallery');
const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const sparklesContainer = document.querySelector('.sparkles');

// Current photo index for modal navigation
let currentPhotoIndex = 0;

/**
 * Initialize the website when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initSparkles();
    initModal();
});

/**
 * Create and populate the photo gallery
 */
function initGallery() {
    // Shuffle photos for a dynamic feel each visit
    const shuffledPhotos = shuffleArray([...PHOTOS]);

    shuffledPhotos.forEach((photo, index) => {
        const card = createPhotoCard(photo, index);
        gallery.appendChild(card);
    });
}

/**
 * Create a single photo card element
 * @param {Object} photo - Photo object with path and caption
 * @param {number} index - Index in the gallery
 * @returns {HTMLElement} The photo card element
 */
function createPhotoCard(photo, index) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View memory photo ${index + 1}`);

    const img = document.createElement('img');
    img.src = photo.path;
    img.alt = photo.caption || `Memory with Emma - Photo ${index + 1}`;
    img.loading = 'lazy';

    card.appendChild(img);

    // Click handler to open modal
    card.addEventListener('click', () => openModal(photo));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(photo);
        }
    });

    return card;
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Initialize sparkle animation effects
 */
function initSparkles() {
    for (let i = 0; i < SPARKLE_COUNT; i++) {
        createSparkle();
    }
}

/**
 * Create a single sparkle element with random properties
 */
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // Random positioning and styling
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    sparkle.style.animationDuration = `${3 + Math.random() * 3}s`;
    sparkle.style.background = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];

    const size = 4 + Math.random() * 8;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    sparklesContainer.appendChild(sparkle);
}

/**
 * Initialize modal functionality
 */
function initModal() {
    const closeBtn = modal.querySelector('.modal-close');
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => navigateModal(-1));
    nextBtn.addEventListener('click', () => navigateModal(1));

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

/**
 * Open modal with specified photo
 * @param {Object} photo - Photo object with path and caption
 */
function openModal(photo) {
    currentPhotoIndex = PHOTOS.findIndex(p => p.path === photo.path);
    if (currentPhotoIndex === -1) {
        currentPhotoIndex = 0;
    }

    updateModalContent(PHOTOS[currentPhotoIndex]);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Update modal image and caption
 * @param {Object} photo - Photo object with path and caption
 */
function updateModalContent(photo) {
    modalImage.src = photo.path;

    if (photo.caption) {
        modalCaption.textContent = photo.caption;
        modalCaption.style.display = 'block';
    } else {
        modalCaption.style.display = 'none';
    }
}

/**
 * Close the modal
 */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Navigate through photos in modal
 * @param {number} direction - 1 for next, -1 for previous
 */
function navigateModal(direction) {
    currentPhotoIndex += direction;

    // Wrap around
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = PHOTOS.length - 1;
    } else if (currentPhotoIndex >= PHOTOS.length) {
        currentPhotoIndex = 0;
    }

    updateModalContent(PHOTOS[currentPhotoIndex]);
}

/**
 * Handle keyboard events for modal navigation
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleKeyboard(e) {
    if (!modal.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            navigateModal(-1);
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
    }
}
