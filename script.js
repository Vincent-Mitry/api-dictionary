const inputWordElement = document.querySelector('#word');
const wordTitle = document.querySelector('#word-data');
const definitionDivElement = document.querySelector('#definition-data');

function fetchData() {
    const wordToSearch = inputWordElement.value;

    if(wordToSearch.length > 0) {
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
}

function displayWordInfo(data) {
    emptyDataElement();

    const word = data[0].word;
    const meaningsList = data[0]['meanings'];

    wordTitle.innerHTML = word;
 
    for (const meaning of meaningsList) {

        const cardDiv = document.createElement('div');
        cardDiv.className = "card bg-secondary p-2 mb-1";
        definitionDivElement.append(cardDiv);
        
        const partOfSpeechPElement = document.createElement('p');
        partOfSpeechPElement.className = "fst-italic text-dark mb-0";
        partOfSpeechPElement.innerHTML = meaning.partOfSpeech;
        cardDiv.append(partOfSpeechPElement);

        const definitionPElement = document.createElement('p');
        definitionPElement.className = "m-0";
        definitionPElement.innerHTML = meaning.definitions[0].definition;
        cardDiv.append(definitionPElement);
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
    let errorTitle;
    let errorMessage;

    if(typeof(data.title) !== 'undefined'){
        errorTitle = data.title;
        errorMessage = data.message;
    } else {
        errorTitle = "An error has occured";
        errorMessage = `Oups! Something went wrong... Please try again later or contact the support.<br>
                        Error message: <span  class="fst-italic">"${data}"</span>`;
    }
    
    emptyDataElement();
    
    wordTitle.innerHTML = errorTitle;

    const errorMessagePElement = document.createElement('p');
    errorMessagePElement.innerHTML = errorMessage;
    errorMessagePElement.className = "m-0";
    definitionDivElement.append(errorMessagePElement);
}

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    fetchData();
})
