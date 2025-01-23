"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {}; //main objectet används under hela game loopen, allt som är relevant med spelet 

//#newGame- id, ifrån html rad 50



//window.addEventListener("load", () => {
//     initGlobalObject(); //ger globala objectet ett "värde" i functionen
//     if (checkForGameOver() === 1) { //kollar om vilken spelare vinner
//         console.log("Spelare 1 vann");
//     } else if (checkForGameOver() === 2) {
//         console.log("Spelare 2 vann");
//     } else if (checkForGameOver() === 3) {
//         console.log("Oavgjort");
//     } else {
//         console.log("Spelet fortsätter");
//     }
//});

prepGame();


/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {
    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner


    oGameData.gameField = ["", "", "", "", "", "", "", "", ""]; //Empty board, innan spelarna har börjat


    /* Testdata för att testa rättningslösning */
    // kollar om spelare 1 vinner
    console.log(checkForGameOver()); //kollar om allt stämmer,





    /* oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', '']; */
    //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    //oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
    //oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    /* oGameData.nickNamePlayerOne = document.getElementById("#nick1"); */
    oGameData.nickNamePlayerOne = "";



    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg")


}


/**
 * Kontrollerar för tre i rad genom att anropa funktionen checkWinner() och checkForDraw().
 * Returnerar 0 om spelet skall fortsätta,
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
function checkForGameOver() {
    // check winner()
    if (checkWinner(oGameData.playerOne)) { //kallar på checkwinner functionen, med playerOne i parametern
        return 1; // player one wins

    } else if (checkWinner(oGameData.playerTwo)) { //kallar på checkwinner functionen, med playertwo i parametern
        return 2; // player two wins

    } else if (checkForDraw()) { //om gameboard är helt ifyllda
        return 3;//draw
    }
    //functioner har alltid () = parameter
    return 0; // den är utan för if satsen, så spelet körs fortfarande
}


// om playerone vinner returnar x = 1
// om playertwo vinner return o = 2
// checkDraw 
// if draw return 3

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) { //playerIn = om en av de två spelare vinner

    const winningCombo = [
        //horizontal
        [0, 1, 2],    // översta    /// A
        [3, 4, 5],    // mitten
        [6, 7, 8],    // nedersta
        //Vertical
        [0, 3, 6],    // vänster    // B
        [1, 4, 7],    // mitten
        [2, 5, 8],    // botten
        //Diagonal
        [0, 4, 8],    // upp till ner    //C
        [2, 4, 6]     // ner till upp
    ];

    for (let combination of winningCombo) {
        const [a, b, c] = combination; // [] = array
        //om en av spelarna får en av de combinationer
        if (oGameData.gameField[a] === playerIn &&
            oGameData.gameField[b] === playerIn &&
            oGameData.gameField[c] === playerIn
        ) {
            return true; //  

        }
    }

    return false; //behandlas som en break, då den är utan för loopen.

}


//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.

// kallas i GameOver function,  
function checkForDraw() {
    // om alla ("") celler är ifyllda, alla drag är använda

    return !oGameData.gameField.includes("");  //returnas endast om gamefielden är full, alla cells ifylld

}




// Nedanstående funktioner väntar vi med!

function prepGame() {
    document.querySelector("#gameArea").classList.add('d-none');
    document.querySelector("#newGame").addEventListener("click", initiateGame);
}

function validateForm() {
    //hanterare/ kollar om spelarna har valt nick/färger


}

function initiateGame() {
    document.querySelector("#theForm").classList.add("d-none");
    document.querySelector("#gameArea").classList.remove('d-none');
    document.querySelector("#errorMsg").textContent = "";

    oGameData.nickNamePlayerOne = document.querySelector('#nick1').value;
    oGameData.nickNamePlayerTwo = document.querySelector('#nick2').value;
    oGameData.colorPlayerOne = document.querySelector('#color1').value;
    oGameData.colorPlayerTwo = document.querySelector('#color2').value;

    const cells = document.querySelectorAll("td");
    cells.forEach((cells) => {
        cells.textContent = "";
        cells.style.backgroundcolor = "#ffffff";
    });

    let playerChar = "";
    let playerName = "";

    const randomNmr = Math.random();

    if (randomNmr < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;

        //if random number > 0.5
    } else {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }
    //if random number > 0.5


    //Ändra texten i h1-elementet som ligger i div-elementet med klassen "jumbotron" till "Aktuell spelare är XXX",
    // där ni ersätter XXX med namnet på den aktuella spelaren.

    //"hämtar" h1 classen jumbotron ifrån htmlen
    document.querySelector(".jumbotron").textContent = `Aktuell spelare är ${playerName}`;

    document.querySelector("#gameArea").addEventListener("click", executeMove);
    //tog bort execute(), man skall inte kalla på functionen; 

    //Lägg till en klicklyssnare på tabellen som innehåller spelplanen.
    // Vid klick skall funktionen "executeMove()" anropas.



}



function executeMove(event) {
    const clickedCell = event.target;

    // Kontrollera att klicket skedde på en cell
    if (clickedCell.tagName !== "TD") return;

    // Kontrollera att cellen är ledig
    if (clickedCell.textContent !== "") return;

    // Sätt spelets datafält till nuvarande spelare
    clickedCell.getAttribute("data-id");
    oGameData.gameField = oGameData.currentPlayer;

    // Sätt cellens bakgrundsfärg och text till nuvarande spelare
    const playerColor = oGameData.currentPlayer === "X" ? oGameData.playerOneColor : oGameData.playerTwoColor;
    clickedCell.style.backgroundColor = playerColor;
    clickedCell.textContent = oGameData.currentPlayer;

    // Byt spelare
    oGameData.currentPlayer = oGameData.currentPlayer === "X" ? "O" : "X";
    const nextPlayerName = oGameData.currentPlayer === "X" ? oGameData.nickNamePlayerOne : oGameData.nickNamePlayerTwo;
    document.querySelector(".jumbotron h1").textContent = `Aktuell spelare är ${playerName}`;

    // Kontrollera om spelet är slut
    const result = checkGameStatus();
    if (result !== 0) {
        gameOver(result);
    }
}

// function executeMove(event) {
//     // Kontrollera att klicket är på en tom cell
//     if (event.target.tagName !== "TD" || event.target.textContent !== "") {
//         return;
//     }

//     // Hämta data-id från cellen
//     const dataid = event.target.getAttribute(dataid);
//     if (!dataid) {
//         console.error("Kunde inte hitta data-id på den klickade cellen.");
//         return;
//     }

//     // Uppdatera gameField
//     oGameData.gameField[dataid] = oGameData.currentPlayer;
//     console.log("gameField efter uppdatering:", oGameData.gameField);

//     // Uppdatera cellens innehåll och stil
//     event.target.textContent = oGameData.currentPlayer;
//     console.log(`Satte text till: ${oGameData.currentPlayer} för cell med data-id: ${dataid}`);

//     if (oGameData.currentPlayer === oGameData.playerOne) {
//         event.target.style.backgroundColor = oGameData.colorPlayerOne;
//     } else {
//         event.target.style.backgroundColor = oGameData.colorPlayerTwo;
//     }

//     // Kontrollera om spelet är över
//     const gameStatus = checkForGameOver();
//     if (gameStatus === 0) {
//         changePlayer();
//     } else {
//         gameOver(gameStatus);
//     }
// }




/* function executeMove(event) {
    if (event.target.tagName !== "TD") {
        return;
    }

    if (event.target.textContent !== "") {
        return;
    }

    const dataid = event.target.getAttribute("dataid");
    if (dataid === null) {
        console.error("dataid is null");
        return;
    }

    oGameData.gameField[dataid] = oGameData.currentPlayer;
    event.target.textContent = oGameData.currentPlayer;

    if (oGameData.currentPlayer === oGameData.playerOne) {
        event.target.style.backgroundColor = oGameData.colorPlayerOne;
    } else {
        event.target.style.backgroundColor = oGameData.colorPlayerTwo;
    }

    if (checkForGameOver() === 0) {
        changePlayer();
    } else {
        gameOver(checkForGameOver());
    }
}
 */


function changePlayer() { }

function timer() { }

function gameOver(result) { }