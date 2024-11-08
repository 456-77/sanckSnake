/**
 * author: B22042127袁非
 * 游戏关卡的设置
 * 包括墙的设置
 */

let walls = [];

const level1Walls = [];
for (let i = 1; i < GRID_SIZE; i++) {
    level1Walls.push({ x: i, y: 1 });       // 顶部
    level1Walls.push({ x: i, y: GRID_SIZE-1 });      // 底部
    level1Walls.push({ x: 1, y: i });       // 左侧
    level1Walls.push({ x: GRID_SIZE-1, y: i });      // 右侧
}

const level2Walls = [
    // 水平横条
    { x: 10, y: 18 }, { x: 11, y: 18 }, { x: 12, y: 18 }, { x: 13, y: 18 }, { x: 14, y: 18 },
    { x: 15, y: 18 }, { x: 16, y: 18 }, { x: 17, y: 18 }, { x: 18, y: 18 }, { x: 19, y: 18 },
    { x: 20, y: 18 }, { x: 21, y: 18 }, { x: 22, y: 18 }, { x: 23, y: 18 }, { x: 24, y: 18 },
    { x: 25, y: 18 }, { x: 26, y: 18 }, { x: 27, y: 18 }, { x: 28, y: 18 }, { x: 29, y: 18 },
    { x: 30, y: 18 }, { x: 31, y: 18 }, { x: 32, y: 18 }, { x: 33, y: 18 }, { x: 34, y: 18 },
    // 垂直竖条
    { x: 20, y: 10 }, { x: 20, y: 11 }, { x: 20, y: 12 }, { x: 20, y: 13 }, { x: 20, y: 14 },
    { x: 20, y: 15 }, { x: 20, y: 16 }, { x: 20, y: 17 }, { x: 20, y: 18 }, { x: 20, y: 19 },
    { x: 20, y: 20 }, { x: 20, y: 21 }, { x: 20, y: 22 }, { x: 20, y: 23 }, { x: 20, y: 24 },
    { x: 20, y: 25 }, { x: 20, y: 26 }, { x: 20, y: 27 }, { x: 20, y: 28 }, { x: 20, y: 29 },
    { x: 20, y: 30 }, { x: 20, y: 31 }, { x: 20, y: 32 }, { x: 20, y: 33 }, { x: 20, y: 34 },
];
for (let i = 1; i <= 40; i++) {
    level2Walls.push({ x: i, y: 1 });       // 顶部
    level2Walls.push({ x: i, y: 40 });      // 底部
    level2Walls.push({ x: 1, y: i });       // 左侧
    level2Walls.push({ x: 40, y: i });      // 右侧
}

const level3Walls = [
    // 外圈
    { x: 5, y: 5 }, { x: 6, y: 5 },  { x: 9, y: 5 },
    { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 },
    { x: 8, y: 9 }, { x: 7, y: 9 }, { x: 6, y: 9 }, { x: 5, y: 9 }, { x: 5, y: 8 },
    { x: 5, y: 7 }, { x: 5, y: 6 },

    // 中间横线
    { x: 10, y: 18 }, { x: 11, y: 18 }, { x: 12, y: 18 }, { x: 13, y: 18 }, { x: 14, y: 18 },
    { x: 15, y: 18 }, { x: 16, y: 18 }, { x: 17, y: 18 }, { x: 18, y: 18 }, { x: 19, y: 18 },
    { x: 20, y: 18 }, { x: 21, y: 18 }, { x: 22, y: 18 }, { x: 23, y: 18 }, { x: 24, y: 18 },
    { x: 25, y: 18 }, { x: 26, y: 18 }, { x: 27, y: 18 }, { x: 28, y: 18 }, { x: 29, y: 18 },
    { x: 30, y: 18 }, { x: 31, y: 18 }, { x: 32, y: 18 }, { x: 33, y: 18 }, { x: 34, y: 18 },

    // 中间竖线
    { x: 20, y: 10 }, { x: 20, y: 11 }, { x: 20, y: 12 }, { x: 20, y: 13 }, { x: 20, y: 14 },
    { x: 20, y: 15 }, { x: 20, y: 16 }, { x: 20, y: 17 }, { x: 20, y: 18 }, { x: 20, y: 19 },
    { x: 20, y: 20 }, { x: 20, y: 21 }, { x: 20, y: 22 }, { x: 20, y: 23 }, { x: 20, y: 24 },
    { x: 20, y: 25 }, { x: 20, y: 26 }, { x: 20, y: 27 }, { x: 20, y: 28 }, { x: 20, y: 29 },
    { x: 20, y: 30 }, { x: 20, y: 31 }, { x: 20, y: 32 }, { x: 20, y: 33 }, { x: 20, y: 34 },

    // 右上角
    { x: 30, y: 5 }, { x: 30, y: 6 }, { x: 30, y: 7 }, { x: 30, y: 8 },
    { x: 31, y: 8 }, { x: 32, y: 8 }, { x: 33, y: 8 },
];

for (let i = 1; i < GRID_SIZE; i++) {
    level3Walls.push({ x: i, y: 1 });       // 顶部
    level3Walls.push({ x: i, y: GRID_SIZE-1 });      // 底部
    level3Walls.push({ x: 1, y: i });       // 左侧
    level3Walls.push({ x: GRID_SIZE-1, y: i });      // 右侧
}

const levels = {
    1: level1Walls,
    2: level2Walls,
    3: level3Walls
};

const drawWall = (gameBoard) => {
    for (let i = 0; i < walls.length; i++) {
        const segment = walls[i];
        const wallsElement = document.createElement('div');

        wallsElement.style.gridRowStart = segment.x;
        wallsElement.style.gridColumnStart = segment.y;
        wallsElement.classList.add("wall");
        
        gameBoard.appendChild(wallsElement);
    }
}

const ResetLevel = () => {

}
