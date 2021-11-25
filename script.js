document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const wordToSearch = document.querySelector('#word').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`)
        .then(Response => Response.json()
        .then(Json => {
            // console.log(Response);
            // console.log(Json);
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
     const definitionDivElement = document.querySelector('#definition-list');
     // On vide la liste des définitions
     emptyElement(definitionDivElement);
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
 * Empties a DOM element
 * @param {*} element 
 */
function emptyElement(element) {
    while(element.firstElementChild) {
       element.firstElementChild.remove();
    }
  }

  /**
   * Display Errors in DOM
   * @param {*} data 
   */
function displayErrors(data) {
    const errorTitle = data.title;
    const errorMessage = data.message;

    const definitionDivElement = document.querySelector('#definition-list');
    emptyElement(definitionDivElement);

    document.querySelector('#word-data').innerHTML = errorTitle;
    const errorMessagePElement = document.createElement('p');
    errorMessagePElement.innerHTML = errorMessage;
    definitionDivElement.append(errorMessagePElement);
}


  