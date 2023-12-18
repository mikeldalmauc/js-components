function init(){
    initCounter();
    initSemaforo();
    initLista();
    initSlider();
}


/* 
    Counter

*/

let modelCounter;
function initCounter(){
    modelCounter = 0
    viewCounter()
}

function viewCounter(){
    let app = document.getElementById("counterApp");

    app.innerHTML = `
        <div>${modelCounter}</div>
        <button type="button" onclick="updateCounter('up')">up</button>
        <button type="button" onclick="updateCounter('down')">down</button>
    `
}

function updateCounter(msg){

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
function initSemaforo(){
    modelSemaforo = {
          luz: "Rojo"
        , tiempo: 2000
    }
    viewSemaforo()
}

function viewSemaforo(){
    let app = document.getElementById("semaforoApp")

    app.innerHTML = `
        <div class="carcasa-semaforo">
            <div class="${ modelSemaforo.luz == "Rojo" ? "rojo":"apagado" }"></div>
            <div class="${ modelSemaforo.luz == "Ambar" ? "ambar":"apagado"}"></div>
            <div class="${ modelSemaforo.luz == "Verde" ? "verde":"apagado"}"></div>
        </div>
    `
    
    setTimeout(() => updateSemaforo(), modelSemaforo.tiempo)
}

function updateSemaforo(){

    switch (modelSemaforo.luz){
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

function initLista(){
    modelLista = ["Gato", "Michi"]

    viewLista()
}

function viewLista(){
    let app = document.getElementById("listaApp")

    let idElemento = 0
    let lista = modelLista.map(elemento => `
            <li class="elemento">
                <button type="button" onclick="updateLista('Delete',${idElemento++})">X</button>
                ${elemento}
            </li>
        `).join("")

    app.innerHTML = `
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

function updateLista(msg, idElemento){

    switch (msg){
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

function initSlider(){
    modelSlider = {
              actual : "grumpy.jpg"
            , images : [
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

function viewSlider(){
    let app = document.getElementById("sliderApp")

    app.innerHTML = `
        <button type="button" onclick="updateSlider('Left')"><</button>    
        <div class="slider-image"> 
            <img src="assets/${modelSlider.actual}">
        </div>
        <button type="button" onclick="updateSlider('Right')">></button>
    `
}

function updateSlider(msg){

    let actualPos = modelSlider.images.findIndex(el => el === modelSlider.actual);
    
    switch (msg){

        case "Left":
            actualPos--

            if(actualPos < 0 )
                actualPos = modelSlider.images.length - 1
            
            modelSlider.actual = modelSlider.images[actualPos]
            break

        case "Right":
            actualPos++

            if(actualPos >= modelSlider.images.length )
                actualPos = 0

            modelSlider.actual = modelSlider.images[actualPos]

            break
        default:
            break
    }

    viewSlider()
}
