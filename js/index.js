import { catsData } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnlyOption = document.getElementById('gifs-only-option');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');
emotionRadios.addEventListener('change', highlightCheckedOption);
getImageBtn.addEventListener('click',renderCat);
memeModalCloseBtn.addEventListener('click',function(){
    memeModal.style.display = 'none';
})

function renderEmotionsRadio(cats) {
    const emotionsArray = getEmotionsArray(cats);
    let str = "";
    for(let i of emotionsArray) {
        str += 
        `
            <div class="radio">
                <label for="${i}">${i}</label>
                <input type="radio" id="${i}" value="${i}" name="emotions" />
            </div>
        `;
    }
    emotionRadios.innerHTML = str;
}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for(let cat of cats) {
        for(let catEmotion of cat.emotionTags) {
            if(!emotionsArray.includes(catEmotion)){
                emotionsArray.push(catEmotion);
            } 
        }
    }
    return emotionsArray;
}

/*
This function highlights the selected radio button's parent element.
1. It first removes the 'highlight' class from all elements with the 'radio' class.
2. Then, it adds the 'highlight' class to the parent element of the clicked radio button.
*/
function highlightCheckedOption(e){
    /*document.querySelectorAll('.radio').forEach(radio => {
        radio.classList.remove('highlight');
    });*/

    const radios = document.getElementsByClassName('radio');
    for(let radio of radios) {
        radio.classList.remove('highlight');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function getMatchingCatsArray(){
    // Check if any radio button (emotion selection) is checked
    if(document.querySelector('input[type="radio"]:checked')){
        // Get the value of the selected emotion from the checked radio button
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        // Check if the "GIFs only" option is selected
        const isGif = gifsOnlyOption.checked;
        // Filter the catsData array to find cats that match the selected emotion
        const matchingCatsArray = catsData.filter(function(cat){
            return cat.emotionTags.includes(selectedEmotion) && cat.isGif === isGif;
        });
        // Log the filtered array of matching cats to the console
        return matchingCatsArray;
    }
}

function getSingleCatObject(){
    const catArray = getMatchingCatsArray();
    if(catArray.length === 1) {
        return catArray[0];
    }
    else {
        const random = Math.floor(Math.random() * catArray.length);
        return catArray[random];
    }
}

function renderCat(){
    const catsObject = getSingleCatObject();
    memeModalInner.innerHTML = 
    `
        <img class="cat-img" src="./${catsObject.image}" alt="${catsObject.alt}">
    `
    memeModal.style.display = 'flex'
}

renderEmotionsRadio(catsData);