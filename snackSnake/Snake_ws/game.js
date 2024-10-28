let lastRenderTime = 0;
let gameOver = false;
let GameStarter = false;
let AIenabled = false;
const gameBoard = document.getElementById("game-board");

const main = (currenttTime) => {
  if (gameOver || !GameStarter) {
    return;
  }
  // callback: 当需要更新动画以进行下一次重新绘制时，将调用此函数。此回调函数传递一个参数timespan
  // 表示前一帧渲染的结束时间
  window.requestAnimationFrame(main);

  // 计算前后两帧的相隔时间
  const secondsSinceLastRender = (currenttTime - lastRenderTime)/1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED){
    return;
  }
  // 更新最新的刷新时刻
  lastRenderTime = currenttTime;

  update();
  draw();
};

// Main
// window.requestAnimationFrame(main);

const update = () => {
    gameOver = isGameOver();
    gameOver = isAIGameOver();
    updateSnake();
    if(AIenabled){
      updateAISnake();
    }
    updateFood();
};

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    if(AIenabled){
      drawAISnake(gameBoard);
    }
    drawFood(gameBoard);
    drawWall(gameBoard);
};
