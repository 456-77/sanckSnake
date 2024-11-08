/**
 * author: B22042129童吉吉
 * 大食物的实现
 * 区别于普通食物，是定时刷新的
 */

let bigFood = { x: 10, y: 15 };
let bigFoodiseaten =false;//大食物是否被吃
const BIG_FOOD_APPEAR_INTERVAL = 5000;//大食物出现时间间隔(毫秒)
let bigFoodInterval;



//更新大食物位置和状态
// const updateBigFood = () => {
//     if ( onSnake(bigFood)){ // 如果大食物被吃掉
//         bigFood = getRandomFoodPosition(); // 生成新位置
//         expandSnake(EXPANSION_RATE); // 蛇加长
//         updatePlayerScore(); // 分数增加
//     }else if (onAISnake(bigFood)){
//         bigFood = getRandomFoodPosition();
//         expandAISnake(EXPANSION_RATE);
//         updateAIScore();
//     }
// }
//被吃掉时更新
const updateBigFood = () => {
    if (onSnake(bigFood)&&!bigFoodiseaten) { // 如果大食物被吃
        //分数增加
        bigFoodiseaten=true;
        console.log("大食物已被吃,正在更新蛇的长度和得分...");
        expandSnake(EXPANSION_RATE* 5);
        updatePlayerScore();

    } else if (onAISnake(bigFood)&&!bigFoodiseaten) {
        bigFoodiseaten=true;
        expandAISnake(EXPANSION_RATE * 5);
        updateAIScore();
    }
}
//定时更新
const updateBigFoodInterval = () => {
    // if (bigFoodiseaten) {//仅在大食物不可见时才更新
    //     console.log("正在定时更新大食物...");
    //     bigFoodVisible = true;
    //     bigFoodiseaten= false;
    //     bigFood = getRandomFoodPosition();
    // }
    console.log("正在定时更新大食物...");
    
    bigFoodiseaten= false;
    bigFood = getRandomFoodPosition();
    
}

// //每隔指定时间间隔生成大食物
// setInterval(() => {

//     updateBigFood(); // 生成新大食物
// }, BIG_FOOD_APPEAR_INTERVAL);


//绘制大食物
const drawBigFood = (gameBoard) => {
    //大食物不可见时不执行
    if (bigFoodiseaten) return;
    // console.log("bigFoodVisible:",bigFoodVisible," 开始绘制大食物...");

    const bigFoodElement = document.createElement('div');

    // 设置大食物的行和列位置
    bigFoodElement.style.gridRowStart = bigFood.x;
    bigFoodElement.style.gridColumnStart = bigFood.y;

    // 为大食物添加单独的样式类
    bigFoodElement.classList.add("big-food");
    //清除之前的大食物
    const existingBigFoodElements = document.querySelectorAll('.big-food');
    existingBigFoodElements.forEach(element => element.remove());
    // 绘制大食物
    gameBoard.appendChild(bigFoodElement);
};