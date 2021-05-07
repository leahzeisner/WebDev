const canvas = document.querySelector('#stickman')
const context = canvas.getContext('2d')
context.strokeStyle = '#fff';
context.lineWidth = 3;


const animate = (remainingGuesses) => {
    if (remainingGuesses === 9) {
        frame1()
    } else if (remainingGuesses === 8) {
        frame2()
    } else if (remainingGuesses === 7) {
        frame3()
    } else if (remainingGuesses === 6) {
        frame4()
    } else if (remainingGuesses === 5) {
        head()
    } else if (remainingGuesses === 4) {
        torso()
    } else if (remainingGuesses === 3) {
        leftArm()
    } else if (remainingGuesses === 2) {
        rightArm()
    } else if (remainingGuesses === 1) {
        leftLeg()
    } else if (remainingGuesses === 0) {
        rightLeg()
    } else {
        throw Error('Game is over')
    }
}


// draws a line with the given points
const draw = (fromX, fromY, toX, toY) => {
    context.beginPath()
    context.moveTo(fromX, fromY)
    context.lineTo(toX, toY)
    context.stroke()
    context.closePath()
}

// draws the first line (base)
const frame1 = () => {
    draw(50, 175, 275, 175)
}

// draws the second line (vertical)
const frame2 = () => {
    draw(75, 175, 75, 5)
}

// draws the third line(top horizontal)
const frame3 = () => {
    draw(75, 5, 175, 5)
}

// draws the fourth line (short vertical)
const frame4 = () => {
    draw(175, 5, 175, 30)
}

// draws the head
const head = () => {
    context.beginPath()
    context.arc(175, 40, 10, 0, Math.PI*2, true)
    context.stroke()
    context.closePath()
}

// draws the torso
const torso = () => {
    draw(175, 50, 175, 90)
}

// draws the left arm
const leftArm = () => {
    draw(175, 60, 150, 70)
}

// draws the right arm
const rightArm = () => {
    draw(175, 60, 200, 70)
}

// draws the left leg
const leftLeg = () => {
    draw(175, 90, 150, 115)
}

// draws the right leg
const rightLeg = () => {
    draw(175, 90, 200, 115)
}



export {animate}