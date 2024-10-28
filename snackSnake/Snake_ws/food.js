let Food = {x:15, y:15};
const EXPANSION_RATE = 1;

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

const drawFood = (gameBoard) => {
    const foodElement = document.createElement('div');

    foodElement.style.gridRowStart = Food.x;
    foodElement.style.gridColumnStart = Food.y;
    foodElement.classList.add("food");
    
    gameBoard.appendChild(foodElement);
}

const getRandomFoodPosition = () => {
    let newFoodPosition = getRandomPosition();
    while(onSnake(newFoodPosition) || isTouchingWalls(newFoodPosition) || onAISnake(newFoodPosition)){
        newFoodPosition = getRandomPosition();
    }
    return newFoodPosition;
}
