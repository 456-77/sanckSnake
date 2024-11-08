/**
 * author: B22042127袁非、B22042129童吉吉
 * 处理键盘输入
 * 包括方向键控制蛇的移动，以及长按shift键加速，还有暂停/继续游戏的快捷键
 * 
 * 童吉吉： 添加shift键加速功能
 */


let inputDirection = {x: 1, y: 0};

window.addEventListener('keydown', (event) => {
    if ((event.key === 'ArrowUp' || event.key === 'w') && inputDirection.x!== 1) {
        inputDirection = {x: -1, y: 0};
    } else if ((event.key === 'ArrowDown' || event.key ==='s')  && inputDirection.x!== -1) {
        inputDirection = {x: 1, y: 0};
    } else if ((event.key === 'ArrowLeft' || event.key === 'a') && inputDirection.y!== 1) {
        inputDirection = {x: 0, y: -1};
    } else if ((event.key === 'ArrowRight' || event.key === 'd') && inputDirection.y!== -1) {
        inputDirection = {x: 0, y: 1};
    } 
});

const getInputDirection = () => {
    return inputDirection;
}

//长按shift键加速
// 检测按键按下
window.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
        isShiftPressed = true; // Shift 键按下
        SNAKE_SPEED = ACCELERATED_SPEED; // 加速
    }
});

// 检测按键松开
window.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
        isShiftPressed = false; // Shift 键松开
        SNAKE_SPEED = SNAKE_SPEED; // 恢复默认速度
    }
});
//暂停或继续键
window.addEventListener("keydown", (event) => {
    if (event.key === "q") {
        pauseorContinueGame();
    }
});
//开始或重置键
window.addEventListener("keydown", (event) => {
    if (event.key === "1") {
        startGame();
        }
});
//禁用空格键
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();//禁用空格键
        
    }
}); 
