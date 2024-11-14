//constants
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
// const musicSound = new Audio('music/music.mp3')
let lastPaintTime = 0;
let score = 0;
let speed = 5;
let RunSpeed = speed;
//did this so i donthave to change runspeed everywehere below. just change speed above
let snakeArray = [
    { row: 5, column: 15 }
]
let food = { row: 4, column: 4 }
let moveDirection = { x: 0, y: 0 }


let main = (currentTime) => {
    window.requestAnimationFrame(main)
    if ((currentTime - lastPaintTime) / 1000 < 1 / RunSpeed) {
        return;
    }
    //code below will not execute until if condition become false
    lastPaintTime = currentTime
    gameEngine()
}

let isCollide = (snake) => {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[0].row === snake[i].row && snake[0].column === snake[i].column) {
            return true
        }
    }
    if (snake[0].row >= 18 || snake[0].row <= 0 || snake[0].column >= 18 || snake[0].column <= 0) {
        return true
    }
    // return false;
}

let gameEngine = () => {
    //Part1: update Snake Array and Food
    if (isCollide(snakeArray)) {
        gameOverSound.play()
        // musicSound.pause()
        moveDirection = { x: 0, y: 0 }
        alert('Game ove. Press any key to Start Again!')
        snakeArray = [{ row: 5, column: 15 }]
        // musicSound.load()
        // musicSound.play();
        score = 0
        RunSpeed = speed
    }

    //When Snake Eaten Food, increment Score and regenerate Food
    if (snakeArray[0].row === food.row && snakeArray[0].column === food.column) {
        foodSound.play()
        // adding new element in Snake
        let newSnakeElement = { row: snakeArray[0].row + moveDirection.y, column: snakeArray[0].column + moveDirection.x }
        snakeArray.unshift(newSnakeElement)
        score++
        RunSpeed = RunSpeed + 0.5
        // console.log(speed)
        // console.log(RunSpeed)
        if (score>highScoreValue) {
            highScoreValue = score
            localStorage.setItem('High Score', JSON.stringify(highScoreValue))
            document.getElementById('highScoreDiv').innerHTML = 'High Score: ' + highScoreValue
        }
        // generating new food on diff location
        let a = 2;
        let b = 16;
        food = { row: Math.round(a + (b - a) * Math.random()), column: Math.round(a + (b - a) * Math.random()) }
        
    }
    currentScore.innerHTML = "Score: " + score

    //Moving the Snake

    //Using reverse loop, so we can put last elem to 2nd last, 2nd last to 3rd last and so on.
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }
        //snake[i] is 2nd last elem. to [i+1] means last = second last
        // using destructuring cause its a object. assing one object value to another
    }

    //head to new location
    snakeArray[0].row += moveDirection.y
    snakeArray[0].column += moveDirection.x

    //snake stays at it own position until key press. because moveDirection{x:0, y:0}

    //Part2: display Snake and Food
    //Snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.row;
        snakeElement.style.gridColumnStart = e.column;
        if (index === 0) {
            snakeElement.classList.add("snakeHead")
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })

    //Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.row;
    foodElement.style.gridColumnStart = food.column;
    foodElement.classList.add("food")
    board.appendChild(foodElement)
}

//main logic
let highScore = localStorage.getItem('High Score')
if (highScore === null) {
    let highScoreValue = 0
    localStorage.setItem('High Score', JSON.stringify(highScoreValue))
}
else{
    highScoreValue = JSON.parse(highScore)
    document.getElementById('highScoreDiv').innerHTML = 'High Score: ' + highScoreValue
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', (e) => {
    moveDirection = { x: 0, y: 0 } //Start the game
    // musicSound.play();
    switch (e.key) {
        case 'ArrowUp':
            moveDirection = { x: 0, y: -1 }
            moveSound.play()
            break;
        case 'ArrowDown':
            moveDirection = { x: 0, y: 1 }
            moveSound.play()
            break;
        case 'ArrowLeft':
            moveDirection = { x: -1, y: 0 }
            moveSound.play()
            break;
        case 'ArrowRight':
            moveDirection = { x: 1, y: 0 }
            moveSound.play()
            break;

        default:
            break;
    }
})
