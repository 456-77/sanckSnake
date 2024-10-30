let lastRenderTime = 0;
let gameOver = false;
let GameStarter = false;//游戏是否开始
let isPaused = false;
let AIenabled = false;
const gameBoard = document.getElementById("game-board");

//将window.requestAnimationFrame设置在main函数中，为了实现游戏循环
const main = (currenttTime) => {
  if (gameOver || !GameStarter) {
    return;
  }
  // callback: 当需要更新动画以进行下一次重新绘制时，将调用此函数。此回调函数传递一个参数timespan
  // 表示前一帧渲染的结束时间
  // 调用requestAnimationFrame函数，将main函数作为参数传入，以便在下一帧重新渲染动画。
  // 这里的requestAnimationFrame函数会在下一帧调用main函数，并将当前时间戳作为参数传入。
  window.requestAnimationFrame(main);
  //如果点击暂停按钮,直接返回不执行更新和绘制
  if(isPaused)return;

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
