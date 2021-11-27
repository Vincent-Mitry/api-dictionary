const inputWordElement = document.querySelector('#word');
const definitionDivElement = document.querySelector('#definition-data');

function fetchData() {

    const wordToSearch = inputWordElement.value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`)
    .then(Response => Response.json()
    .then(Json => {
        if(!Response.ok){
            throw Json;
        }
        
        displayWordInfo(Json);
    }))
    .catch(error => {
        displayErrors(error);
    })
}


function displayWordInfo(data){
    const word = data[0].word;
    const meanings = data[0]['meanings'];
    /*****************************************************************
     * Display the word title in DOM
     *****************************************************************/
    document.querySelector('#word-data').innerHTML = word;
    /*****************************************************************
     * Display the definitions list in DOM
     *****************************************************************/
    emptyDataElement();
    // On insère chaque définition dans la div '#definition-list' (on créé un élément 'p' pour chaque définition) 
    for (const meaning of meanings) {
        const definitionPElement = document.createElement('p');
        definitionPElement.innerHTML = meaning.definitions[0].definition;
        definitionDivElement.append(definitionPElement);
        
        const partOfSpeechSpanElement = document.createElement('span');
        partOfSpeechSpanElement.className = "fst-italic";
        partOfSpeechSpanElement.innerHTML = meaning.partOfSpeech + "<br>";
        definitionPElement.prepend(partOfSpeechSpanElement);
    }
}

/**
 * Empties data from definitionDivElement
 */
function emptyDataElement() {
    while(definitionDivElement.firstElementChild) {
        definitionDivElement.firstElementChild.remove();
    }
}

/**
 * Display Errors in DOM
 * @param {*} data 
 */
function displayErrors(data) {
    const errorTitle = data.title;
    const errorMessage = data.message;
    
    emptyDataElement();
    
    document.querySelector('#word-data').innerHTML = errorTitle;
    const errorMessagePElement = document.createElement('p');
    errorMessagePElement.innerHTML = errorMessage;
    definitionDivElement.append(errorMessagePElement);
}

document.querySelector('#form').addEventListener('submit', (e) => {
    if(inputWordElement.value !== ""){
        e.preventDefault();
        fetchData();
    } else {
        e.preventDefault();
    }
})

