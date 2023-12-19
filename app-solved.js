function init() {
    initCounter();
    initSemaforo();
    initLista();
    initSlider();
    initCards();
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
    let lista = modelLista.map(elemento => `
            <li class="elemento">
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
            placeholder="Añademe a la lista!"
            size="17"
            >
        </input>
        <button type="button" onclick="updateLista('Add')">Añadir</button>
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
          selectedEmojis : ["None"]
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
    
    let cardsToShow = modelCards.cards
        .filter(card => modelCards.selectedEmojis.includes('None') || modelCards.selectedEmojis.includes(card.emoji))
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

    let viewEmojiButton = emoji => 
        `<li>
            <button 
                type="button" 
                onclick="updateCards('Filter','${emoji}')">
                    <div class="emoji-icon ${emoji == modelCards.selectedEmoji ? "selected":""} selected">${emojiCode(emoji)}</div> 
                    <div class="shadow"></div>
                </button>
           
        </li>`

    app.innerHTML = `
        <h3>Cards</h3>
        <ul class="emoji-menu">
            ${modelCards.cards.map(card => viewEmojiButton(card.emoji)).join("")}
        </ul>
        </br>
        <ul class="cards">
            ${cardsToShow}
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