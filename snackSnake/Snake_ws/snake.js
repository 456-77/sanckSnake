let SNAKE_SPEED = 5;//蛇的速度
let PlayerScore = 0;

let snakeBody = [
    {x:11, y:11},  // head
    {x:11, y:10},
    {x:11, y:9}
];

const updateSnake = () => {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // 往下传递
        snakeBody[i+1] = {...snakeBody[i]};
    }

    const updateDirection = getInputDirection();
    snakeBody[0].x += updateDirection.x;
    snakeBody[0].y += updateDirection.y;

}

const drawSnake = (gameBoard) => {
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        const snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.classList.add("snake");
        
        gameBoard.appendChild(snakeElement);
    }
}

const onSnake = (foodPosition) => {
    for (let i = 0; i < snakeBody.length; i++) {
        if(equalPositions(foodPosition, snakeBody[i])) {
            return true;
        }
    }
    return false;
}

const equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

const expandSnake = (rate) => {
    for (let i = 0; i < rate; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
}

const isGameOver = () => {
    if (isSnakeOutOfBounds() || isSnakeTouchingItself() || isSnakeTouchingWalls()) {
        GameStarter = false;
        alert("YOU GameOver!");
    }
    return isSnakeOutOfBounds() || isSnakeTouchingItself() 
            || isSnakeTouchingWalls();
}

const isSnakeOutOfBounds = () => {
    return isOutOfBounds(snakeBody[0]);
}

const isSnakeTouchingItself = () => {
    const snakehead = snakeBody[0];
    for (let i = 1; i < snakeBody.length; i++) {
        if(equalPositions(snakehead, snakeBody[i])) {
            return true;
        }
    }
    return false;
}

const isSnakeTouchingWalls = () => {
    return isTouchingWalls(snakeBody[0]);
}


const ResetSnake = () => {//重置蛇的属性
    snakeBody = [
        {x:11, y:11},  // head
        {x:11, y:10},
        {x:11, y:9}
    ];
    PlayerScore = 0;
    inputDirection = {x: 1, y: 0}
    document.getElementById("playerScore").innerText = PlayerScore;
    SNAKE_SPEED = document.getElementById("speed").value;//获取用户输入的速度值
}

const updatePlayerScore = () => {
    PlayerScore += EXPANSION_RATE * 10 * (SNAKE_SPEED/10);
    document.getElementById("playerScore").innerText = PlayerScore;
}