
function init() {
    initCounter();
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