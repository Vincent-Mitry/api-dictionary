const displayDataList = document.getElementById('data-list');
const wordTitle = document.getElementById('word-title');
let wordData = [];

async function fetchData(wordToSearch) {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`)
    .then(Response => Response.json())
    .then(Json => wordData = Json[0]);
}

function displayWordInfo(){
    if(wordData !== undefined){
        wordTitle.innerHTML = wordData.word;
    
        emptyDataList();
        
        for (const meaning of wordData.meanings) {
            const definition = meaning.definitions[0].definition;
            const partOfSpeech = meaning.partOfSpeech;
            
            const definitionPElement = document.createElement('p');
            const partOfSpeechSpanElement = document.createElement('span');
    
            definitionPElement.innerHTML = definition;
            partOfSpeechSpanElement.innerHTML = partOfSpeech + '<br>';
    
            partOfSpeechSpanElement.className = "fst-italic";
    
            definitionPElement.prepend(partOfSpeechSpanElement);
            displayDataList.append(definitionPElement);
        }
    } else {
        emptyDataList();

        wordTitle.innerHTML = "No definitions found";
        displayDataList.innerHTML = "<p>Sorry pal, we couldn't find definitions for the word you were looking for.</p>"
    }
};

/**
 * Empties data from #data-list in DOM
 */
function emptyDataList() {
    while(displayDataList.firstElementChild) {
        displayDataList.firstElementChild.remove();
    }
}

document.querySelector('#word').addEventListener('input', (e) => {
    fetchData(e.target.value);
})

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    displayWordInfo();
})

