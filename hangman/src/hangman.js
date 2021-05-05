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


    // Make a guess
    makeGuess(guess) {
        if (this.status !== 'playing') {
            throw Error('The game is finished. Cannot make a new guess.')
        }

        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (isUnique) {
            this.guessedLetters.push(guess)
        }
        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }
        this.setStatus()
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
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'finished') {
            return 'Great work! You guessed the word.'
        } else {
            return `Nice try! The word was "${this.word.join('')}"`
        }
    }
}

export {Hangman as default}