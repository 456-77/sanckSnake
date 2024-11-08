/**
 * author: B22042127袁非、B22042129童吉吉
 * 对于游戏主循环的控制实现
 * 
 */

let lastRenderTime = 0;
let gameOver = false;
let GameStarter = false;//游戏是否开始
let isPaused = false;
let AIenabled = false;
let lastRenderTimeSnake = 0;
let lastRenderTimeAISnake = 0;
const gameBoard = document.getElementById("game-board");

/** 
 * 最初的GameLoop设计
const GameLoop = (currenttTime) => {
  if (gameOver || !GameStarter) {
    return;
  }
  // callback: 当需要更新动画以进行下一次重新绘制时，将调用此函数。此回调函数传递一个参数timespan
  // 表示前一帧渲染的结束时间
  window.requestAnimationFrame(GameLoop);

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
*/



const GameLoop = (currentTime) => {
  if (gameOver || !GameStarter || isPaused){
    if(isPaused){
      console.log("游戏暂停");
      console.log("ganmeOver:",gameOver,"GameStarter:", GameStarter,"isPaused:", isPaused,"AIenabled:", AIenabled)
    }else{
      console.log("游戏继续");
      console.log("ganmeOver:",gameOver,"GameStarter:", GameStarter,"isPaused:", isPaused,"AIenabled:", AIenabled)
    }
    
    return;
  }

  const secondsSinceLastRenderSnake = (currentTime - lastRenderTimeSnake) / 1000;
  const secondsSinceLastRenderAISnake = (currentTime - lastRenderTimeAISnake) / 1000;
  // console.log("secondsSinceLastRenderSnake:",secondsSinceLastRenderSnake,"secondsSinceLastRenderAISnake:", secondsSinceLastRenderAISnake);
  // console.log("SNAKE_SPEED:",SNAKE_SPEED,"AI_SNAKE_SPEED:", AI_SNAKE_SPEED);
  // 控制玩家蛇的更新频率
  if (secondsSinceLastRenderSnake >= 1 / SNAKE_SPEED) {
    updateSnake();
    lastRenderTimeSnake = currentTime;
  }

  // 控制AI蛇的更新频率
  if(AIenabled && secondsSinceLastRenderAISnake >= 1 / AI_SNAKE_SPEED){
    console.log("AI蛇开始更新");
    updateAISnake();
    lastRenderTimeAISnake = currentTime;
  }

  //更新食物
  updateFood();
  updateBigFood();

  draw();//每次游戏循环都要执行,除非暂停,游戏结束,游戏还未开始
  window.requestAnimationFrame(GameLoop);
};



// const update = () => {
//   gameOver = isGameOver();//判断游戏是否结束
//   gameOver = isAIGameOver();
//   updateSnake();
//   if (AIenabled) {
//     updateAISnake();
//   }
//   updateFood();
// };

const draw = () => {
  // console.log("开始绘制整个页面");
  // 清空画布
  gameBoard.innerHTML = "";

  drawSnake(gameBoard);
  if (AIenabled) {
    drawAISnake(gameBoard);
  }
  drawFood(gameBoard);
  drawBigFood(gameBoard);
  drawWall(gameBoard);
};
