let AI_SNAKE_SPEED = 5;
let AIScore = 0;

let AIsnakeBody = [
    {x:11, y:20},  // head
    {x:11, y:19},
    {x:11, y:18}
];

const updateAISnake = () => {
    for (let i = AIsnakeBody.length - 2; i >= 0; i--) {
        // 往下传递
        AIsnakeBody[i+1] = {...AIsnakeBody[i]};
    }

    // 有个问题是：其实并不需要每次更新都计算一次ai的路径？待解决
    // 驳回，需要每次更新，因为蛇身体是每次都在移动的
    const updateDirection = moveAISnake();
    AIsnakeBody[0] = updateDirection;

    //const updateDirection = SimpleAIDirection();
    //AIsnakeBody[0].x += updateDirection.x;
    //AIsnakeBody[0].y += updateDirection.y;

}

const drawAISnake = (gameBoard) => {
    for (let i = 0; i < AIsnakeBody.length; i++) {
        const segment = AIsnakeBody[i];
        const snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.classList.add("aisnake");
        
        gameBoard.appendChild(snakeElement);
    }
}

const onAISnake = (foodPosition) => {
    for (let i = 0; i < AIsnakeBody.length; i++) {
        if(equalPositions(foodPosition, AIsnakeBody[i])) {
            return true;
        }
    }
    return false;
}

const expandAISnake = (rate) => {
    for (let i = 0; i < rate; i++) {
        AIsnakeBody.push({...AIsnakeBody[AIsnakeBody.length - 1]});
    }
}

const updateAIScore = () => {
    AIScore += EXPANSION_RATE * 10 * (SNAKE_SPEED/10);
    document.getElementById("aiScore").innerText = AIScore;
}

const isAIGameOver = () => {
    if (isAISnakeOutOfBounds() || isAISnakeTouchingItself() || isAISnakeTouchingWalls()) {
        GameStarter = false;
        alert("AIGameOver!");
    }
    return isAISnakeOutOfBounds() || isAISnakeTouchingItself() 
            || isAISnakeTouchingWalls();
}

const isAISnakeOutOfBounds = () => {
    return isOutOfBounds(AIsnakeBody[0]);
}

const isAISnakeTouchingItself = () => {
    const AIsnakehead = AIsnakeBody[0];
    for (let i = 1; i < AIsnakeBody.length; i++) {
        if(equalPositions(AIsnakehead, AIsnakeBody[i])) {
            return true;
        }
    }
    return false;
}

const isAISnakeTouchingWalls = () => {
    return isTouchingWalls(AIsnakeBody[0]);
}


const ResetAISnake = () => {
    AIsnakeBody = [
        {x:11, y:20},  // head
    {x:11, y:19},
    {x:11, y:18}
    ];
    AIScore = 0;
    aiDirection = {x: 1, y: 0}
    document.getElementById("aiScore").innerText = AIScore;
    SNAKE_SPEED = document.getElementById("speed").value;
}