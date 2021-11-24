document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const wordToSearch = document.querySelector('#word').value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`)
        .then(Response => Response.json()
        .then(Json => {
            console.log(Json);
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
            const definitionUlElement = document.querySelector('#definition-list');
            // On vide la liste des définitions
            emptyElement(definitionUlElement);
            // On insère chaque définition dans la liste de puces (#definition-list) en créant un 'li' pour chaque élément
            for (const meaning of meanings) {
                let definitionLiElement = document.createElement('li');
                definitionLiElement.innerHTML = meaning.definitions[0].definition;
                definitionUlElement.append(definitionLiElement);
            }
        }))
    
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
  