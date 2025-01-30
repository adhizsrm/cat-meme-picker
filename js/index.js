import { catsData } from "./data.js";
function getEmotionsArray(cats) {
    const emotionsArray = []
    for(let cat of cats) {
        for(let catEmotion of cat.emotionTags) {
            emotionsArray.push(catEmotion);
        }
    }
    return emotionsArray;
}

const emotionRadios = document.getElementById('emotion-radios');
function renderEmotionsRadio(cats) {
    const emotionsArray = getEmotionsArray(cats);
    let str = "";
    for(let i of emotionsArray) {
        str += `<p>${i}</p>`;
    }
    emotionRadios.innerHTML = str;
}

renderEmotionsRadio(catsData);