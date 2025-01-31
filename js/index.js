import { catsData } from "./data.js";
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

const emotionRadios = document.getElementById('emotion-radios');
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

renderEmotionsRadio(catsData);