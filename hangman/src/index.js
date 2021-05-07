import { animate } from './animate.js'
import Hangman from './hangman.js'
import getPuzzle from './requests.js'

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
const guessedEl =  document.querySelector('#guessed')

let game

window.addEventListener('keydown', (e) => {
    const guess = e.key
    if (/^[a-z]$/i.test(e.key)) {
        game.makeGuess(guess)
        render()
    }
})

const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game.getStatus()

    game.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        if (letter === ' ') {
            letterEl.textContent = '*'
            letterEl.style.color = "transparent"
        } else {
            letterEl.textContent = letter
        }
        
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game = new Hangman(puzzle, 10)
    
    guessedEl.textContent = `Guessed letters:\r\n\r\n${game.guessedLetters.join(', ').toUpperCase()}`;
    guessedEl.innerHTML = guessedEl.innerHTML.replace(/\n\r?/g, '<br />');

    render()
}

document.querySelector('#reset-button').addEventListener('click', () => {
    // clear the stickman animation
    const canvas = document.querySelector('#stickman')
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, 350, 300);

    // restart game
    startGame()
})

startGame() 