const inputWordElement = document.querySelector('#word');
const wordTitle = document.querySelector('#word-data');
const definitionDivElement = document.querySelector('#definition-data');

function fetchData() {
    const wordToSearch = inputWordElement.value;

    if(wordToSearch.length > 0){
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

function displayWordInfo(data){
    const word = data[0].word;
    const meanings = data[0]['meanings'];
    /*****************************************************************
     * Display the word title in DOM
     *****************************************************************/
    wordTitle.innerHTML = word;
    /*****************************************************************
     * Display the definitions list in DOM
     *****************************************************************/
    emptyDataElement();
    // On insère chaque définition dans la div '#definition-list' (on créé un élément 'p' pour chaque définition) 
    for (const meaning of meanings) {
        const cardDiv = document.createElement('div');
        cardDiv.className = "card bg-secondary p-2 mb-1";
        definitionDivElement.append(cardDiv);

        const definitionPElement = document.createElement('p');
        definitionPElement.innerHTML = meaning.definitions[0].definition;
        definitionPElement.className = "m-0";
        cardDiv.append(definitionPElement);
        
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
