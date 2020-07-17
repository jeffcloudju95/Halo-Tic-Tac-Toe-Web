// VARIABLES
const X_CLASS = "x"
const CIRCLE_CLASS = 'circle'
// hover board variables 
const xHover_CLASS = 'xHover'
const circleHover_CLASS = 'circleHover'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// HTML DOCUMENTS / variables
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartBtn');
restartButton.addEventListener('click', restartGame)
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
var UNSCscoreHTML = document.getElementById('UNSC.score')
var CovenantscoreHTML = document.getElementById('covenant.score')
var UNSCscore = 0;
var Covenantscore = 0;
var circleTurn = true;

// START GAME
startGame();
winningMessageTextElement.addEventListener('click', continueGame);

function startGame() {
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        // cell click function
        cell.removeEventListener('click', cellClick)
        cell.addEventListener('click', cellClick, {once: true});
        // hover function
        cell.addEventListener('mouseover', hoverOver)
        cell.addEventListener('mouseout', hoverOut)
    });
    winningMessageElement.classList.remove('show')

}

// CELL CLICK FUNCTION
function cellClick(e){
    hoverOut(e)
    removeHover(e)
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw())  {
        endGame(true)
    } else {
        swapTurns()
    }
};

// END GAME
function endGame(draw){
    if(draw){
        winningMessageElement.innerText = 'Draw!'
    } else {
        scoreCounter(circleTurn, UNSCscore, Covenantscore)
        winningMessageElement.innerText = `${circleTurn ? "UNSC" : "Covenant"} Wins!`
        if(circleTurn){
            UNSCscore ++
            scoreCounter(circleTurn) 
        } else {
            Covenantscore ++
            scoreCounter(circleTurn)
        }
    }
    winningMessageElement.classList.add('show')
    winningMessageElement.addEventListener('click', continueGame)
}

// SCORE FUNCTION
function scoreCounter(circleTurn) {
    if(circleTurn) { // if winner is true, it is circles/UNSC win
        UNSCscoreHTML.innerText = formatScore(UNSCscore);
    } else {
        CovenantscoreHTML.innerText = formatScore(Covenantscore);
    }
}

// format number function for score 00
function formatScore(num) {
    return (num < 10) ? '0' + num.toString() : num.toString();
}

// CONTINUE BUTTON FUNCTION - it just removes the fore grouned message. 
function continueGame(){
    winningMessageElement.classList.remove('show');
    circleTurn = true;
    startGame();
}

// RESTART BUTTON FUNCTION 
function restartGame() {
    UNSCscore = 0;
    Covenantscore = 0;
    UNSCscoreHTML.innerText = '00'
    CovenantscoreHTML.innerText = '00'
    continueGame();
}

// IS DRAW
function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

// PLACE MARK
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

// SWAP TURNS
function swapTurns(){
   if(circleTurn === false){
       circleTurn = true;
   } else {
       circleTurn = false;
   }
}

// HOVER BOARD FUNCTION
function hoverOver(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleHover_CLASS : xHover_CLASS;
    cell.classList.add(currentClass);
}

function hoverOut(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleHover_CLASS : xHover_CLASS;
    cell.classList.remove(currentClass);
}

function removeHover(e) {
    const cell = e.target
    cell.removeEventListener('mouseover', hoverOver)
}


// CHECK WIN
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}










