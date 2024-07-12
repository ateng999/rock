const selectionBtns = document.querySelectorAll('[data-selection]');
const computerSelectionImg = document.getElementById('computer').querySelector('img');
const userSelectionImg = document.getElementById('user').querySelector('img');
const computerScoreElement = document.getElementById('computerScore');
const userScoreElement = document.getElementById('userScore');
const resultDiv = document.getElementById('result');
let computerScore = 0;
let userScore = 0;


const SELECTIONS = [
    {
        name: 'rock',
        img: 'img/user_rock.png',
        computerImg: 'img/comp_rock.png'
    },
    {
        name: 'paper',
        img: 'img/user_paper.png',
        computerImg: 'img/comp_paper.png'
    },
    {
        name: 'scissor',
        img: 'img/user_scissor.png',
        computerImg: 'img/comp_scissor.png'
    }
];

selectionBtns.forEach(selectionBtn => {
    selectionBtn.addEventListener('click', () => {
        const selectionName = selectionBtn.dataset.selection;
        makeSelection(selectionName);
    });
});

function makeSelection(playerSelection) {
    const computerSelection = getComputerSelection();
    const winner = determineWinner(playerSelection, computerSelection);
    displayResult(playerSelection, computerSelection, winner);
    displayImages(playerSelection, computerSelection);
    updateScore(winner);
}

function getComputerSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex].name;
}

function determineWinner(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return 'tie';
    }
    if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        return 'player';
    }
    return 'computer';
}

function displayResult(playerSelection, computerSelection, winner) {
    let resultText = `You picked ${playerSelection}. Computer picked ${computerSelection}. `;
    if (winner === 'tie') {
        resultText += "It's a tie!";
    } else if (winner === 'player') {
        resultText += 'You win!';
    } else {
        resultText += 'You lose!';
    }
	resultDiv.innerText = resultText;
}

function displayImages(playerSelection, computerSelection) {
    const playerSelectionObj = SELECTIONS.find(selection => selection.name === playerSelection);
    const computerSelectionObj = SELECTIONS.find(selection => selection.name === computerSelection);
    userSelectionImg.src = playerSelectionObj.img;
    computerSelectionImg.src = computerSelectionObj.computerImg;
    userSelectionImg.alt = `Your selection: ${playerSelection}`;
    computerSelectionImg.alt = `Computer's selection: ${computerSelection}`;
}

function updateScore(winner) {
        document.getElementById('computer').classList.remove('winner');
        document.getElementById('user').classList.remove('winner');

    if (winner === 'player') {
        userScore++;
        userScoreElement.textContent = userScore;
        document.getElementById('user').classList.add('winner');
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        document.getElementById('computer').classList.add('winner');
    } else if (winner === 'tie') {
        document.getElementById('computer').classList.add('winner');
        document.getElementById('user').classList.add('winner');
	}
}
