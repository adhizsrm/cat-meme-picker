import { catsData } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
emotionRadios.addEventListener('change', highlightCheckedOption);
getImageBtn.addEventListener('click',getMatchingCatsArray)
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
    const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
    console.log(selectedEmotion);
}


renderEmotionsRadio(catsData);