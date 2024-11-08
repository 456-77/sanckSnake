/**
 * author: B22042127袁非 、B22042129童吉吉
 * 实现网页侧边栏功能
 * 包括开始游戏、暂停游戏、选择难度、AI开关
 * 
 * 童吉吉：添加暂停游戏按钮,定时器的添加
 */


//开始或重置游戏
const startGame = () => {
    // 将开始游戏按钮设为程序入口
    updateParameters();//已将定时器集成到updateParameters中

    //定时生成大食物,并保存定时器id
    bigFoodInterval = setInterval(() => {
        if (!isPaused && !gameOver) {//游戏暂停或结束停止定时更新
            console.log()
            updateBigFoodInterval();
            drawBigFood(gameBoard);
        }
    }, BIG_FOOD_APPEAR_INTERVAL);
    window.requestAnimationFrame(GameLoop);

}

//暂停游戏或继续游戏
const pauseorContinueGame = () => {

    isPaused = !isPaused;
    if (isPaused) {
        console.log("游戏暂停");
    } else {
        console.log("游戏继续");
        window.requestAnimationFrame(GameLoop);
    }
}

//选择难度
const selectLevel = () => {
    const level = document.getElementById("levelSelect").value;
    walls = levels[level];
}

//AI开关
const toggleAI = () => {
    document.getElementById("aiToggle").checked ? enableAI() : disableAI();
}

//设置ai的难度
const setAIDifficulty = () => {
    let difficulty = document.getElementById("aiDifficulty").value;
    // let AIDifficulty = difficulties[difficulty];
    return parseInt(difficulty);
}

//刷新分数显示
const updateScoreDisplay = () => {
    updatePlayerScore();
    updateAIScore();
}

//刷新游戏参数
const updateParameters = () => {
    //清除之前的定时器(如果存在)
    if (bigFoodInterval) {
        clearInterval(bigFoodInterval);
    }
    // 刷新两个游戏启动暂停参数
    GameStarter = true;
    gameOver = false;
    isPaused = false;//增加游戏暂停参数
    selectLevel();
    ResetSnake();
    ResetAISnake();
    Food = getRandomFoodPosition();
}



const enableAI = () => {
    AIenabled = true;
}

const disableAI = () => {
    AIenabled = false;
}


