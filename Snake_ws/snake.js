/**
 * author: B22042127袁非
 * 玩家控制的蛇的设计
 * 主要包含蛇的位置更新、蛇的绘制、蛇的碰撞检测、吃食物的加长、玩家游戏结束的判断、重置蛇的属性、玩家的计分
 */

let SNAKE_SPEED = 5;//蛇的速度
let ACCELERATED_SPEED = 10;//加速的速度
let PlayerScore = 0;

let snakeBody = [
    { x: 11, y: 11 },  // head
    { x: 11, y: 10 },
    { x: 11, y: 9 }
];

const updateSnake = () => {//更新蛇的位置同时更新蛇的长度
    console.log("updateSnake");
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // 往下传递
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    //更新方向
    let updateDirection = getInputDirection();
    snakeBody[0].x += updateDirection.x;
    snakeBody[0].y += updateDirection.y;

    //改动代码:增加了gameOver的判断,updateFood()(将update函数功能分解成两个函数updateSnake和updateAISnake)
    gameOver = isGameOver();//判断游戏是否结束
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
        if (equalPositions(foodPosition, snakeBody[i])) {
            return true;
        }
    }
    return false;
}

const equalPositions = (pos1, pos2) => {//判断两个坐标是否相同
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

//增加蛇的长度
const expandSnake = (rate) => {
    for (let i = 0; i < rate; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });//...snakeBody[snakeBody.length - 1]是浅拷贝蛇尾的坐标
    }
}

const isGameOver = () => {
    if (isSnakeOutOfBounds() || isSnakeTouchingItself() || isSnakeTouchingWalls()||isSnakeTouchingAISnake()) {
        GameStarter = false;
        alert("YOU GameOver!");
        //清除定时器
        clearInterval(bigFoodInterval);

    }

    return isSnakeOutOfBounds() || isSnakeTouchingItself()
        || isSnakeTouchingWalls()||isSnakeTouchingAISnake();
}

const isSnakeOutOfBounds = () => {
    return isOutOfBounds(snakeBody[0]);
}

const isSnakeTouchingItself = () => {
    const snakehead = snakeBody[0];
    for (let i = 1; i < snakeBody.length; i++) {
        if (equalPositions(snakehead, snakeBody[i])) {
            return true;
        }
    }
    return false;
}

const isSnakeTouchingWalls = () => {
    return isTouchingWalls(snakeBody[0]);
}
//增加蛇玩家蛇与ai蛇碰撞检测
const isSnakeTouchingAISnake = () => {
    console.log("isSnakeTouchingAISnake");
    if (!AIenabled) return false;
    const snakehead = snakeBody[0];
    for (let i = 0; i < AIsnakeBody.length; i++) {        //判断蛇头与ai蛇的碰撞
        if (equalPositions(snakehead, AIsnakeBody[i])) {
            return true;
        }
    }
    return false;
}

const ResetSnake = () => {//重置蛇的属性
    snakeBody = [
        { x: 11, y: 11 },  // head
        { x: 11, y: 10 },
        { x: 11, y: 9 }
    ];
    PlayerScore = 0;
    inputDirection = { x: 1, y: 0 }
    document.getElementById("playerScore").innerText = PlayerScore;
    SNAKE_SPEED = document.getElementById("speed").value;//获取用户输入的速度值
}

const updatePlayerScore = () => {//增加了大食物的分数
    if (bigFoodiseaten) {
        PlayerScore += parseInt(5*EXPANSION_RATE * 10 * (SNAKE_SPEED / 10));
        document.getElementById("playerScore").innerText = PlayerScore;

    } else {
        PlayerScore += EXPANSION_RATE * 10 * (SNAKE_SPEED / 10);
        document.getElementById("playerScore").innerText = PlayerScore;
    }
}

