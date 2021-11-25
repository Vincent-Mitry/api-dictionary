document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const wordToSearch = document.querySelector('#word').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`)
        .then(Response => Response.json()
        .then(Json => {
            // console.log(Response);
            console.log(Json);
            if(!Response.ok){
                throw Json;
            }
            
            displayWordInfo(Json);
        }))
        .catch(error => {
            displayErrors(error);
        })
})

function displayWordInfo(data){
    /*****************************************************************
    * Data from Json Object
    *****************************************************************/
    const word = data[0].word;
    const meanings = data[0]['meanings'];
    /*****************************************************************
    * Display the word title in DOM
    *****************************************************************/
    document.querySelector('#word-data').innerHTML = word;
    /*****************************************************************
    * Display the definitions list in DOM
    *****************************************************************/
    // On vide la liste des définitions
    emptyDataList();
    // On insère chaque définition dans la div '#data-list' (on créé un élément 'p' pour chaque définition)
    for (const meaning of meanings) {
        const definitionData = meaning.definitions[0].definition;
        const partOfSpeechData = meaning.partOfSpeech;
        const synonymData = meaning.definitions[0].synonyms;
        console.log(synonymData);

        const dataListDivElement = document.querySelector('#data-list');
        const definitionGroupElement = document.createElement('div');
        dataListDivElement.append(definitionGroupElement);

        displayDefinitionData(definitionData, definitionGroupElement);
        displayPartOfSpeechData(partOfSpeechData, definitionGroupElement);
    }
    /*****************************************************************
    * Display the synonyms in DOM
    *****************************************************************/     
}

function displayDefinitionData(data, parentElement){
    const definitionPElement = document.createElement('p');
        definitionPElement.innerHTML = data;
        parentElement.append(definitionPElement);
}

function displayPartOfSpeechData(data, parentElement) {
    const partOfSpeechSpanElement = document.createElement('span');
    partOfSpeechSpanElement.className = "fst-italic";
    partOfSpeechSpanElement.innerHTML = data;
    parentElement.prepend(partOfSpeechSpanElement);
}

/**
 * Empties data from #data-list in DOM
 */
function emptyDataList() {
    const dataListDivElement = document.querySelector('#data-list');
    while(dataListDivElement.firstElementChild) {
        dataListDivElement.firstElementChild.remove();
    }
}

  /**
   * Display Errors in DOM
   * @param {*} data 
   */
function displayErrors(data) {
    emptyDataList();

    const dataListDivElement = document.querySelector('#data-list');
    
    if(data.title !== undefined){
        const errorTitle = data.title;
        const errorMessage = data.message;
    
        document.querySelector('#word-data').innerHTML = errorTitle;
        const errorMessagePElement = document.createElement('p');
        errorMessagePElement.innerHTML = errorMessage;
        dataListDivElement.append(errorMessagePElement);
    } else {
        const otherErrorMessage = document.createElement('p');
        otherErrorMessage.innerHTML = "Oooops, something went wrong. Please try again later";
        dataListDivElement.append(otherErrorMessage);
    }
}


  