/**
 * author: B22042127袁非
 * 食物的实现
 * 包括食物的位置、更新食物位置、绘制食物、随机生成食物位置
 * 含有对蛇吃到食物的判断与处理
 */

let Food = { x: 15, y: 15 };
const EXPANSION_RATE = 1;//每吃一个食物增加的长度值

const updateFood = () => {
    if (onSnake(Food)) {
        // 改变食物位置
        // 增加蛇的长度
        // 分数增加
        expandSnake(EXPANSION_RATE);
        Food = getRandomFoodPosition();
        updatePlayerScore();
    } else if (onAISnake(Food)) {
        expandAISnake(EXPANSION_RATE);
        Food = getRandomFoodPosition();
        updateAIScore();
    }
}


//绘制普通食物
const drawFood = (gameBoard) => {

    const foodElement = document.createElement('div');

    foodElement.style.gridRowStart = Food.x;
    foodElement.style.gridColumnStart = Food.y;
    foodElement.classList.add("food");

    gameBoard.appendChild(foodElement);
}


//随机生成食物位置
const getRandomFoodPosition = () => {
    let newFoodPosition = getRandomPosition();
    while (onSnake(newFoodPosition) || isTouchingWalls(newFoodPosition) || onAISnake(newFoodPosition)) {
        newFoodPosition = getRandomPosition();
    }
    return newFoodPosition;
}

