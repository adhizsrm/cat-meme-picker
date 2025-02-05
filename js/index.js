import { catsData } from "./data.js";

// Get references to HTML elements
const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

// Event listeners for user interactions
emotionRadios.addEventListener('change', highlightCheckedOption);
getImageBtn.addEventListener('click', renderCat);
memeModalCloseBtn.addEventListener('click', function() {
    memeModal.style.display = 'none'; // Hide modal when close button is clicked
});

/**
 * Highlights the selected radio button's parent element.
 * Steps:
 * 1. Remove 'highlight' class from all radio button containers.
 * 2. Add 'highlight' class to the selected radio button's parent element.
 *
 * @param {Event} e - The change event from the radio buttons.
 */
function highlightCheckedOption(e) {
    // Remove highlight from all radio buttons
    const radios = document.getElementsByClassName('radio');
    for (let radio of radios) {
        radio.classList.remove('highlight');
    }
    // Add highlight to the selected radio button's parent
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

/**
 * Renders a random cat image in the modal based on the selected emotion.
 * Retrieves a cat object, updates the modal content, and displays the modal.
 */
function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `
        <img class="cat-img" src="./${catObject.image}" alt="${catObject.alt}">
    `;
    memeModal.style.display = 'flex'; // Show the modal
}

/**
 * Retrieves a single cat object from the filtered list.
 * If only one match exists, return it; otherwise, return a random one.
 *
 * @returns {Object} - A cat object from the filtered list.
 */
function getSingleCatObject() {
    const catArray = getMatchingCatsArray();
    if (catArray.length === 1) {
        return catArray[0];
    }
    // Select a random cat from the filtered list
    const randomIndex = Math.floor(Math.random() * catArray.length);
    return catArray[randomIndex];
}

/**
 * Filters the catsData array to find cats matching the selected emotion and GIF preference.
 *
 * @returns {Array} - Array of cat objects matching the selected filters.
 */
function getMatchingCatsArray() {
    // Ensure an emotion is selected before filtering
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        const isGif = gifsOnlyOption.checked; // Check if the GIFs-only option is enabled
        
        // Filter the cat data based on emotion and GIF status
        return catsData.filter(cat => cat.emotionTags.includes(selectedEmotion) && cat.isGif === isGif);
    }
    return []; // Return an empty array if no emotion is selected
}

/**
 * Extracts unique emotion tags from the catsData array.
 *
 * @param {Array} cats - The array of cat objects.
 * @returns {Array} - An array of unique emotions.
 */
function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion); // Avoid duplicates
            }
        }
    }
    return emotionsArray;
}

/**
 * Renders the radio buttons dynamically based on available emotions.
 *
 * @param {Array} cats - The array of cat objects.
 */
function renderEmotionsRadio(cats) {
    const emotionsArray = getEmotionsArray(cats);
    let htmlString = "";
    for (let emotion of emotionsArray) {
        htmlString += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" value="${emotion}" name="emotions" />
            </div>
        `;
    }
    // Inject the generated HTML into the emotionRadios container
    emotionRadios.innerHTML = htmlString;
}

// Initial rendering of emotion radio buttons
renderEmotionsRadio(catsData);