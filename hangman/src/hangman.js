import {animate} from './animate'

class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }


    // Get the current puzzle game
    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        return puzzle
    }

    getRemainingGuesses() {
        return this.remainingGuesses
    }


    // Make a guess
    makeGuess(guess) {
        if (this.status !== 'playing') {
            throw Error('The game is finished. Cannot make a new guess.')
        }

        const guessedEl = document.querySelector('#guessed')

        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)  // not already guessed
        const isBadGuess = !this.word.includes(guess)  // 

        if (isUnique) {
            this.guessedLetters.push(guess)
            if (isBadGuess) {
                this.remainingGuesses--
                animate(this.remainingGuesses)
            }
        }
        guessedEl.textContent = `Guessed letters:\n\r${this.formatGuessedLetters()}`
        guessedEl.innerHTML = guessedEl.innerHTML.replace(/\n\r?/g, '<br />');
    
        this.setStatus()
    }

    // Makes sure there is a max of 6 guessed letters per line
    formatGuessedLetters() {
        if (this.guessedLetters.length < 7) {
            return this.guessedLetters.join(', ').toUpperCase()
        }

        let letters = ''
        let tempArray = []
        let rowStart = 0
        let rowEnd = 5
        let lettersLeft = this.guessedLetters.length

        while (lettersLeft > 0) {
            while (rowStart <= rowEnd) {
                // if there's another letter for this row
                if (this.guessedLetters[rowStart]) {
                    tempArray.push(this.guessedLetters[rowStart])
                    rowStart++
                } 
                // not a complete row (6 letters)
                else {
                    letters += tempArray.join(', ').toUpperCase()
                    letters += '\r\n'
                    return letters
                }
            }
            // end of row
            letters += tempArray.join(', ').toUpperCase()
            letters += '\r\n'
            tempArray = []
            rowStart = rowEnd + 1
            rowEnd += 6
            lettersLeft--
        }
        return letters 
    }


    // Set the new value for 'status'
    setStatus() {
        const finished = this.word.every((letter) => 
            this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }


    // Get the status message
    getStatus() {
        if (this.status === 'playing') {
            return `Guesses left:\u00A0\u00A0${this.remainingGuesses}`
        } else if (this.status === 'finished') {
            document.querySelector('#guessed').textContent = ''
            return 'Great work! You guessed the word.'
        } else {
            document.querySelector('#guessed').textContent = ''
            return `Nice try! The word was "${this.word.join('')}"`
        }
    }
}

export {Hangman as default}