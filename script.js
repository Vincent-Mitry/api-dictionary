document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const wordToSearch = document.querySelector('#word').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`)
        .then(Response => Response.json()
        .then(Json => {
            console.log(Response);
            console.log(Json);
            if(!Response.ok){
                console.log(Json.title + Json.message);
                const errorTitle = Json.title;
                const errorMessage = Json.message;

                document.querySelector('#word-data').innerHTML = errorTitle;
                const errorMessagePElement = document.createElement('p').innerHTML = errorMessage;
                document.querySelector('#definition-list').append(errorMessagePElement);

            }
            /*****************************************************************
            * Data from Json Object
            *****************************************************************/
            const word = Json[0].word;
            const meanings = Json[0]['meanings'];

            console.log(meanings[0]);
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
            // On insère chaque définition dans la liste de puces (#definition-list) en créant un 'li' pour chaque élément
            for (const meaning of meanings) {
                console.log(meaning.partOfSpeech);
                let definitionPElement = document.createElement('p');
                let partOfSpeechSpanElement = document.createElement('span');
                partOfSpeechSpanElement.className = "fst-italic";

                partOfSpeechSpanElement.innerHTML = meaning.partOfSpeech + "<br>";
                definitionPElement.innerHTML = meaning.definitions[0].definition;

                definitionPElement.prepend(partOfSpeechSpanElement);
                definitionDivElement.append(definitionPElement);
            }
        }))
        .catch(error => {
            console.log(error);
        })
})

/**
 * Empties a DOM element
 * @param {*} element 
 */
function emptyElement(element) {
    while(element.firstElementChild) {
       element.firstElementChild.remove();
    }
  }


  