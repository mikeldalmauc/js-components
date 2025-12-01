function init() {
    initCounter();
    initSemaforo();
    initLista();
    initSlider();
    initCards();
    initErrors();

    initGradients();
}

/**
 * For the background
 */
function initGradients(){
    let rot = 0;
    let rot2 = 0;
    let g1 = document.getElementById("gradient-1");
    let g2 = document.getElementById("gradient-2");
    let intervalId = setInterval(() => {
        rot = rot + 1
        rot2 = rot2 + 4
        g1.style.filter = `hue-rotate(${rot}deg)`;
        g2.style.filter = `hue-rotate(${rot2}deg)`;

        g1.style.background = `background: linear-gradient(${10 + rot}deg, #e962e2, transparent)`;
        g2.style.background = `linear-gradient(${121 + rot2}deg, #8ae88e, transparent)`;

    }, 1000/10)
}

/* 
    Counter

*/

let modelCounter;
function initCounter() {
    modelCounter = 0
    viewCounter()
}

function viewCounter() {
    let app = document.getElementById("counterApp");

    app.innerHTML = `
        <h3>Contador</h3>
        <div>${modelCounter}</div>
        <button type="button" onclick="updateCounter('up')">up</button>
        <button type="button" onclick="updateCounter('down')">down</button>
    `
}

function updateCounter(msg) {

    switch (msg) {

        case "up":
            modelCounter++
            break

        case "down":
            modelCounter--
            break
        default:
            break
    }

    viewCounter()
}

/* 
    Semaforo

*/

let modelSemaforo
function initSemaforo() {
    modelSemaforo = {
        luz: "Rojo"
        , tiempo: 2000
    }
    viewSemaforo()
}

function viewSemaforo() {
    let app = document.getElementById("semaforoApp")

    app.innerHTML = `
        <h3>Semaforo</h3>
        <div class="carcasa-semaforo">
            <div class="${modelSemaforo.luz == "Rojo" ? "rojo" : "apagado"}"></div>
            <div class="${modelSemaforo.luz == "Ambar" ? "ambar" : "apagado"}"></div>
            <div class="${modelSemaforo.luz == "Verde" ? "verde" : "apagado"}"></div>
        </div>
    `

    setTimeout(() => updateSemaforo(), modelSemaforo.tiempo)
}

function updateSemaforo() {

    switch (modelSemaforo.luz) {
        case "Rojo":
            modelSemaforo.luz = "Verde"
            modelSemaforo.tiempo = 4000
            break
        case "Ambar":
            modelSemaforo.luz = "Rojo"
            modelSemaforo.tiempo = 2000
            break
        case "Verde":
            modelSemaforo.luz = "Ambar"
            modelSemaforo.tiempo = 1000
            break
        default:
            break
    }

    viewSemaforo()
}


/*
    Lista
*/
let modelLista

function initLista() {
    modelLista = ["Gato", "Michi"]

    viewLista()
}

function viewLista() {
    let app = document.getElementById("listaApp")

    let idElemento = 0
    let lista = modelLista.map(elemento => 
        `   <li class="elemento">
                <button type="button" onclick="updateLista('Delete',${idElemento++})">X</button>
                ${elemento}
            </li>
        `).join("")

    app.innerHTML = `
        <h3>Lista</h3>
        <input 
            type="text"
            id="nuevoElemento"
            name="nuevoElemento"
            placeholder="Gehitu nazazu zerrendara!"
            size="24"
            >
        </input>
        <button type="button" onclick="updateLista('Add')">Gehitu</button>
        <ul class="lista">
            ${lista}
        </ul>
    `

}

function updateLista(msg, idElemento) {

    switch (msg) {
        case "Add":
            modelLista.push(document.getElementById("nuevoElemento").value)
            break
        case "Delete":
            modelLista.splice(idElemento, 1);
            break
        default:
            break
    }

    viewLista()
}

/* 
    Slider

*/

let modelSlider

function initSlider() {
    modelSlider = {
          actual: "grumpy.jpg"
        , images: [
            "grumpy.jpg"
            , "chewy.jpg"
            , "thinkie.jpg"
            , "meany.jpg"
            , "brokie.jpg"
            , "boredie.jpg"
            , "pawsofjoy.jpg"
        ]
    }

    viewSlider()
}

function viewSlider() {
    let app = document.getElementById("sliderApp")

    app.innerHTML = `
        <h3>Slider</h3>
        <div class="slider-container">
            <button type="button" onclick="updateSlider('Left')"><</button>    
            <div class="slider-image"> 
                <img src="assets/${modelSlider.actual}">
            </div>
            <button type="button" onclick="updateSlider('Right')">></button>
        </div>
    `
}

function updateSlider(msg) {

    let actualPos = modelSlider.images.findIndex(el => el === modelSlider.actual);

    switch (msg) {

        case "Left":
            actualPos--

            if (actualPos < 0)
                actualPos = modelSlider.images.length - 1

            modelSlider.actual = modelSlider.images[actualPos]
            break

        case "Right":
            actualPos++

            if (actualPos >= modelSlider.images.length)
                actualPos = 0

            modelSlider.actual = modelSlider.images[actualPos]

            break
        default:
            break
    }

    viewSlider()
}




/*
    Cards 
*/
let modelCards
function initCards() {
    modelCards = {
          selectedEmojis : ["unamused", "grimace", "expresionless", "angry", "tongue", "relieved"]
        , cards: [
            {
              image: "grumpy.jpg"
            , title: "grrrrr"
            , emoji: "unamused"
            }
            , {
              image: "chewy.jpg"
            , title: "Munching...."
            , emoji: "grimace"
            }
            , {
              image: "thinkie.jpg"
            , title: "thinkie thinking"
            , emoji: "expresionless"
            }
            , {
              image: "meany.jpg"
            , title: "meany is angry!"
            , emoji: "angry"
            }
            , {
              image: "brokie.jpg"
            , title: "whuuuu"
            , emoji: "tongue"
            }
            , {
              image: "pawsofjoy.jpg"
            , title: "..."
            , emoji: "relieved"
            }
        ]
        ,
    }

    viewCards()
}

function viewCards() {
    let app = document.getElementById("cardsApp")
    
    let viewCards = cards => 
        cards
        .map(card => `
            <li class="card">
                <div class="card-image"> 
                    <div class="card-emoji" >${emojiCode(card.emoji)}</div>
                    <img src="assets/${card.image}">
                </div>
                <text class="card-text">${card.title}</text>
            </li>
        `)
        .join("")
    
    // Emoji menua, 
    // carta guztien artean daduen emoji desberdinak erakutziko ditu

    let viewEmojiMenu = cards =>        // Karta zerrenda jasotzen dugu sarrera bezela
        cards
        .map(card => card.emoji)        // Zerrenda karata bakoitzaren emojien zerrendan bihurtzen du 
                                        // [carta1, carta2, ...] => ["emoji1", "emoji2", ..]

        .reduce((prev, curr) => {       // errepikatutako emojiak filtratu. ulertu reduce funtzioa
            if(!prev.includes(curr))
                prev.push(curr)

            return prev
        } , [])
        .map(emoji => viewEmojiButton(emoji)) // Akenink, htmla sortzen dugu
        .join("")                              // zerrandako valiu guztiak gehitu banatzailerik gabe
        

    let viewEmojiButton = emoji => {
            let selected = modelCards.selectedEmojis.includes(emoji) ? "selected":""
            return `
                <li>
                    <button 
                        type="button" 
                        onclick="updateCards('Filter','${emoji}')">
                            <div class="emoji-icon ${selected}">${emojiCode(emoji)}</div> 
                            <div class="shadow ${selected}"></div>
                    </button>
                </li>`
        }


    app.innerHTML = `
        <h3>Cards</h3>
        <ul class="emoji-menu">
            ${viewEmojiMenu(modelCards.cards)}
        </ul>
        </br>
        <ul class="cards">
            ${viewCards(modelCards.cards.filter(card => modelCards.selectedEmojis.includes(card.emoji)))}
        </ul>

    `
}




function updateCards(msg, emoji) {
    switch (msg) {
        case "Filter":
            if(modelCards.selectedEmojis.includes(emoji))
                modelCards.selectedEmojis = modelCards.selectedEmojis.filter(e => e !== emoji)
            else
                modelCards.selectedEmojis.push(emoji)
            
            break
        default:
            break
    }

    viewCards()
}

function emojiCode(name) {

    let emoji
    switch (name) {
        case "angry":
            emoji = "128544"
            break
        case "unamused":
            emoji = "128530"
            break
        case "expresionless":
            emoji = "128529"
            break
        case "grimace":
            emoji = "128556"
            break
        case "tongue":
            emoji = "128539"
            break
        case "relieved":
            emoji = "128524"
            break
        default:
            emoji = "128534"
            break
    }

    return "&#"+emoji+";";
}




/*
    Errors 
*/

let modelErrors

function initErrors() {
    modelErrors = {
        errorCodes:[
            100, 101, 102, 103,
            200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
            300, 301, 302, 303, 304, 305, 307, 308,
            400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 426, 428, 429, 431, 451,
            500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511.
        ]  
        , selected:100
    }
    viewErrors()
}

function viewErrors() {
    
    let app = document.getElementById("errorsApp")

    app.innerHTML = `
        <h3>HTTP protocoloaren erroreak</h3>
        <div class="err" style="background-image: url(https://http.cat/${modelErrors.selected})">
        </div>
        <select id="errors" name="errors" onchange="updateErrors('Error')">
            ${modelErrors.errorCodes.map(error => `<option ${error==modelErrors.selected ? "selected":""} value="${error}">${error}</option>`).join("")}
        </select>
    `
}

function updateErrors(msg) {

    switch (msg) {

        case "Error":
            modelErrors.selected = document.getElementById("errors").value;
            break
        default:
            break
    }

    viewErrors()
}



/*
    Errors 
*/
