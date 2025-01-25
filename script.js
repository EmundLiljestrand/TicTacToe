"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

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
    //oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    //oGameData.gameField = ['X', '', '', 'X', '', '', 'X', '', ''];
    //oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    //oGameData.gameField = ['', '', 'O', '', 'O', '', 'O', '', ''];
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
    oGameData.timerId = "#timerInput";

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#timeError");
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
    if (checkWinner(oGameData.playerOne)) {
        return 1;
    } else if (checkWinner(oGameData.playerTwo)) {
        return 2;
    } else if (checkForDraw()) {
        return 3;
    }

    return 0;
}

// Säg till om ni vill få pseudokod för denna funktion
// Viktigt att funktionen returnerar true eller false baserat på om den inskickade spelaren är winner eller ej
function checkWinner(playerIn) {
    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombo) {
        const [a, b, c] = combination;
        if (
            oGameData.gameField[a] === playerIn &&
            oGameData.gameField[b] === playerIn &&
            oGameData.gameField[c] === playerIn
        ) {
            return true;
        }
    }

    return false;
}

function checkForDraw() {
    return !oGameData.gameField.includes("");
}

// Nedanstående funktioner väntar vi med!

function prepGame() {
    document.querySelector("#gameArea").classList.add("d-none");
    document.querySelector("#newGame").addEventListener("click", initiateGame);
    
}

function validateForm() {}

function initiateGame() {
    initGlobalObject();
    timer();

    document.querySelector("#theForm").classList.add("d-none");
    document.querySelector("#gameArea").classList.remove("d-none");

    document.querySelector("#errorMsg").textContent = "";

    oGameData.nickNamePlayerOne = document.querySelector("#nick1").value;
    oGameData.nickNamePlayerTwo = document.querySelector("#nick2").value;
    oGameData.colorPlayerOne = document.querySelector("#color1").value;
    oGameData.colorPlayerTwo = document.querySelector("#color2").value;

    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.backgroundColor = "#ffffff";
    });

    let playerName = "";
    const randomNmr = Math.random();

    if (randomNmr < 0.5) {
        oGameData.currentPlayer = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
    } else {
        oGameData.currentPlayer = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
    }

    document.querySelector(".jumbotron>h1").textContent = `Aktuell spelare är ${playerName}`;

    document.querySelector("#gameArea").addEventListener("click", executeMove);
}

function executeMove(event) {
    const clickedCell = event.target;

    // OM klickhändelsen INTE skett på en tabellcell (td)
    if (clickedCell.tagName !== "TD") return;

    // Kontrollera att den klickade cellen är ledig
    if (clickedCell.textContent !== "") return;

    // Hämta ut attributet "data-id" från den klickade cellen
    const dataid = clickedCell.getAttribute("data-id");

    // Sätt "oGameData.gameField" på den hämtade positionen till nuvarande spelare
    oGameData.gameField[dataid] = oGameData.currentPlayer;

    // Kontrollera vem som är den nuvarande spelaren
    let playerColor;

    if (oGameData.currentPlayer === "X") {
        playerColor = oGameData.colorPlayerOne;
    } else {
        playerColor = oGameData.colorPlayerTwo;
    }

    // Sätt bakgrundsfärgen på den klickade tabellcellen till aktuell spelares färg
    clickedCell.style.backgroundColor = playerColor;

    // Sätt cellens textinnehåll till spelarens symbol
    clickedCell.textContent = oGameData.currentPlayer;

    // Ändra "oGameData.currentPlayer" till den andra spelaren
    if (oGameData.currentPlayer === "X") {
        oGameData.currentPlayer = "O";
    } else {
        oGameData.currentPlayer = "X";
    }

    // Uppdatera texten i jumbotronen till den nya spelarens namn
    let nextPlayerName;

    if (oGameData.currentPlayer === "X") {
        nextPlayerName = oGameData.nickNamePlayerOne;
    } else {
        nextPlayerName = oGameData.nickNamePlayerTwo;
    }

    document.querySelector(
        ".jumbotron>h1"
    ).textContent = `Aktuell spelare är ${nextPlayerName}`;

    // Anropa er rättningsfunktion för att kontrollera om spelet är slut
    const result = checkForGameOver();
    if (result !== 0) {
        gameOver(result);
    }
}

function changePlayer() {}


//kallas i initiateGame funct, hanteras av eventlistner inom prepgame func
function timer() {
 
  

    const timerInput = document.getElementById("timerInput"); // Get the timer input
    const display = oGameData.timeRef; 

    if (!timerInput.value) {
        display.textContent = "Please set a valid time!";
        timerInput.style.backgroundColor = "#FF0000";
        return;
    }

    timerInput.style.backgroundColor = ""; // Reset background color
    

    // Extract hours and minutes from the input
    const [targetHours, targetMinutes] = timerInput.value.split(":").map(Number);

    // Calculate the total target time in seconds
    let remainingTimeInSeconds = targetHours * 3600 + targetMinutes * 60;

    // Enable the timer
    oGameData.timerEnabled = true;

    // Start the countdown
    oGameData.timerId = setInterval(() => {
        //if no time remain
        if (remainingTimeInSeconds <= 0) {
            clearInterval(oGameData.timerId); // Stop the countdown when time is up
            display.textContent = "Time's up!";
            alert("Timer finished!");
            oGameData.timerEnabled = false; // Timer disabled after the alert
            return;
        }

    },);
}




function gameOver(result) {
    let message = "";
    // Kontrollera vilken spelare som vunnit
    if (result === 1) {
        message = `${oGameData.nickNamePlayerOne} vann!`;
    } else if (result === 2) {
        message = `${oGameData.nickNamePlayerTwo} vann!`;
    } else {
        message = "Det blev oavgjort!";
    }

    // Skriv ut ett vinnarmeddelande i jumbotronen, följt av "Spela igen?"
   
    document.querySelector( ".jumbotron>h1").textContent = `${message} Spela igen?` ;


    // Ta bort klicklyssnaren på tabellen
    document
        .querySelector("#gameArea")
        .removeEventListener("click", executeMove);

    // Ta bort klassen "d-none" på formuläret och lägg till klassen "d-none" på spelplanen
    document.querySelector("#theForm").classList.remove("d-none");
    document.querySelector("#gameArea").classList.add("d-none");
    
    document.querySelector("#newGame").addEventListener("click", initiateGame);
    // Anropa "initGlobalObject()" för att nollställa det globala objektet
    
    prepGame();
}
