//开始或重置游戏
const startGame =  () => {
    // 将开始游戏按钮设为程序入口
    updateParameters();
    
    window.requestAnimationFrame(main);
    
}
//暂停游戏或继续游戏
const pauseorContinueGame = () => {
    
    isPaused= !isPaused;
}




const selectLevel = () => {
    const level = document.getElementById("levelSelect").value;
    walls = levels[level];
}
//设置ai的难度
const setAIDifficulty = () => {
    let difficulty = document.getElementById("aiDifficulty").value;
    // let AIDifficulty = difficulties[difficulty];
    return parseInt(difficulty);
}

const updateScoreDisplay = () => {
    updatePlayerScore();
    updateAIScore();
}
//刷新游戏参数
const updateParameters = () => {
    // 刷新两个游戏启动暂停参数
    GameStarter = true;
    gameOver = false;
    selectLevel();
    ResetSnake();
    ResetAISnake();
    Food = getRandomFoodPosition();
}

const toggleAI = () => {
    document.getElementById("aiToggle").checked? enableAI() : disableAI();
}

const enableAI = () => {
    AIenabled = true;
}

const disableAI = () => {
    AIenabled = false;
}


