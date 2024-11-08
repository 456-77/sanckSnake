/**
 * author: B22042127袁非
 * ai蛇的视线
 * 区别于玩家蛇的地方，是在更新时使用路径算法的接口获取下一位置
 */

let AI_SNAKE_SPEED = 5;
let AIScore = 0;

let AIsnakeBody = [
    {x:11, y:20},  // head
    {x:11, y:19},
    {x:11, y:18}
];

const updateAISnake = () => {
    console.log("updateAISnake");
    for (let i = AIsnakeBody.length - 2; i >= 0; i--) {
        // 往下传递
        AIsnakeBody[i+1] = {...AIsnakeBody[i]};
    }

    // 有个问题是：其实并不需要每次更新都计算一次ai的路径？待解决
    // 驳回，需要每次更新，因为蛇身体是每次都在移动的
     const updateDirection = moveAISnake();

    console.log("正在更头部新位置");
    console.log(updateDirection);

    AIsnakeBody[0].x = updateDirection.x;
    AIsnakeBody[0].y = updateDirection.y;

    console.log(AIsnakeBody);

    //const updateDirection = SimpleAIDirection();
    //AIsnakeBody[0].x += updateDirection.x;
    //AIsnakeBody[0].y += updateDirection.y;
    gameOver = isAIGameOver();
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
    if (isAISnakeOutOfBounds() || isAISnakeTouchingItself() || isAISnakeTouchingWalls()||isAITouchingPlayer()){
        GameStarter = false;
        alert("AIGameOver!");
        clearInterval(bigFoodInterval);
    }
    return isAISnakeOutOfBounds() || isAISnakeTouchingItself() 
            || isAISnakeTouchingWalls()||isAITouchingPlayer();
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

//判断ai蛇是否和玩家蛇相撞
const isAITouchingPlayer = () => {
    const playerHead = AIsnakeBody[0];
    for(let i = 1; i < snakeBody.length; i++)
        if(equalPositions(playerHead, snakeBody[i]))
            return true;
    return false;
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
    //ai蛇的速度
    AI_SNAKE_SPEED = document.getElementById("aisnakespeed").value;//获取用户输入的速度值
}