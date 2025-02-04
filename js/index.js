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
emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
    /*document.querySelectorAll('.radio').forEach(radio => {
        radio.classList.remove('highlight');
    });*/
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}
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
emotionRadios.addEventListener('change',function(e){
    console.log(e.target.id);
})

renderEmotionsRadio(catsData);