
const startGame =  () => {
    // 将开始游戏按钮设为程序入口
    updateParameters();
    window.requestAnimationFrame(main);
}

const selectLevel = () => {
    const level = document.getElementById("levelSelect").value;
    walls = levels[level];
}

const setAIDifficulty = () => {
    const difficulty = document.getElementById("aiDifficulty").value;
    AIDifficulty = difficulties[difficulty];
}

const updateScoreDisplay = () => {
    updatePlayerScore();
    updateAIScore();
}

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


