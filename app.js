//selectors

const gameBoard = document.querySelector("#board");
const info = document.querySelector("#info");
let turn;
const winningCombos = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6],
    
]

// create Game Board

function createGameboard(){
    const emptyTiles = " ".repeat(9).split("");
    const tileGrid = emptyTiles.map((t) => `<button class="tile"></button>`).join('');
    gameBoard.innerHTML = tileGrid;
    turn = "X";
    info.textContent=`${turn}'s turn`
    gameBoard.addEventListener('click', handleGameboardClick)
    gameBoard.removeAttribute("inert");
}

createGameboard()

function updateTurn() {
    turn = turn=== "X" ? "0": "X";
    info.textContent=`${turn}'s turn`;
}

function restartGame () {
    let seconds = 3;
    const timer = setInterval(()=>{
        info.textContent=`Restarting in ${seconds}...`;
        seconds--;
        if (seconds<0){
            clearInterval(timer)
            createGameboard()
        }
    }, 1000)
}

function showCongrats() {
    info.textContent = `${turn} wins!`;
    gameBoard.removeEventListener('click', handleGameboardClick)
    gameBoard.setAttribute("inert", true);
    setTimeout(restartGame, 1000);

    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti()
}

function checkScore() {
    const allTiles = [...document.querySelectorAll('.tile')];
    const tileValues = allTiles.map((t) => t.dataset.value);
    const isWinner = winningCombos.some((combo) => {
        const [a, b, c] = combo;
        return (
            tileValues[a] &&
            tileValues[a] === tileValues[b] &&
            tileValues[a] === tileValues[c]
        )  
    })

    if(isWinner){
      return  showCongrats()
    }

    updateTurn()
    
}

function handleGameboardClick(e){
    const valueExist = e.target.dataset.value;
    if(!valueExist){
        e.target.dataset.value = turn;
        checkScore()   
    }
}