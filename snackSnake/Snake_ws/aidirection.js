let aiDirection = {x: 1, y: 0};

const SimpleAIDirection = () => {
    const aiHead = AIsnakeBody[0];

    // 基本AI策略: 朝着食物方向移动
    if (Food.x > aiHead.x && aiDirection.x !== -1) {
        aiDirection = { x: 1, y: 0 };
    } else if (Food.x < aiHead.x && aiDirection.x !== 1) {
        aiDirection = { x: -1, y: 0 };
    } else if (Food.y > aiHead.y && aiDirection.y!== -1) {
        aiDirection = { x: 0, y: 1 };
    } else if (Food.y < aiHead.y && aiDirection.y!== 1) {
        aiDirection = { x: 0, y: -1 };
    }

    return aiDirection;
}


/*
由 B22042127袁非 完成根据A* 算法的ai逻辑控制

A* 算法:
G 值：起点到当前点的实际代价
H 值：当前点到目标的估计代价
F 值： F = G + H，用于决定优先搜索的节点

-- 初始化：
起点添加到‘开放列表’，表示待处理的节点

-- 遍历开放列表：
从开放列表中取出 F 值最小的节点，将其设为 当前节点
若当前节点是目标点，路径找到，退出循环
否则进入第三步处理其相邻节点 

-- 处理当前节点的相邻节点：
获取当前节点的相邻节点（上下左右四个方向）
若相邻节点不可通行（例如蛇身体或墙壁），则跳过
对每个相邻节点计算 G、H 和 F 值，决定该节点的最优路径

-- 更新路径：
若相邻节点在开放列表中，比较新路径的 G 值是否更小，若是则更新路径
若相邻节点不在开放列表，将其加入并标记路径来源（即 cameFrom 记录前驱节点）

-- 重复：
重复以上步骤，直到找到目标或开放列表为空
*/

// 使用曼哈顿距离作为启发函数，保证 AI 尽可能找到最短路径
// 也可以使用欧几里得距离，曼哈顿距离比较快捷
const heuristic = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// 为当前节点获取可访问的相邻节点（上下左右方向），并确保在网格边界内。
const getNeighbors = (node) => {
    const directions = [
        { x: -1, y: 0 }, // 上
        { x: 1, y: 0 },  // 下
        { x: 0, y: -1 }, // 左
        { x: 0, y: 1 }   // 右
    ];
    let neighbors = [];
    for (let dir of directions) {
        let x = node.x + dir.x;
        let y = node.y + dir.y;
        // 不可通行点直接不算成邻居
        if (x > 1 && x < GRID_SIZE-1 && y > 1 && y < GRID_SIZE-1) {
            neighbors.push({ x, y });
        }
    }
    return neighbors;
}

const aStar = (start, goal) =>{
    // 对象数组，存放节点，格式为  [{x:1, y:1},{x:2, y:2}, ...]
    let openSet = [start];

    /*
      对象，用于记录路径的来源节点，也就是每个节点的前驱节点。
      键设置为 ${neighbor.x},${neighbor.y}：这是节点的坐标，将其格式化为字符串，
      例如 "5,10",作为 cameFrom 对象的键,这种字符串化的坐标用于唯一标识网格中的每个节点
    */
    let cameFrom = {};

    // 二维数组：记录G值: 起点到当前点的实际代价
    let gScore = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(Infinity));
    gScore[start.x][start.y] = 0;

    // 二维数组：F 值： F = G + H，用于决定优先搜索的节点
    let fScore = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(Infinity));
    fScore[start.x][start.y] = heuristic(start, goal);

    // A*算法主循环
    while (openSet.length > 0) {
        // 每次从 openSet 中取出 F 值最小的节点作为当前节点
        openSet.sort((a, b) => fScore[a.x][a.y] - fScore[b.x][b.y]);
        let current = openSet.shift();

        // 抵达终点，回溯路径
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            // 回溯路径，每个节点的前驱都记录在cameFrom中
            while (current) {
                path.push(current);
                current = cameFrom[`${current.x},${current.y}`];
            }
            // 因为在上面的循环中，path是从终点回溯到起点，需要反转一下
            return path.reverse(); // 返回路径
        }

        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            // 跳过不可通行节点
            if (grid[neighbor.x][neighbor.y] === 1) continue; 

            let tentative_gScore = gScore[current.x][current.y] + 1;

            // 若新路径的 G 值较小，则更新该节点路径
            // 对于开始阶段的话，gScore中都是无限大，第一次都是直接赋值，后面复杂了才会进行同一节点的更新
            if (tentative_gScore < gScore[neighbor.x][neighbor.y]) {
                // ！！回溯路径纪录
                // path A->B ---> cameFrom[B] == A
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;

                // 计算 G、H、F 值
                // 这里是进行G值和F值的更新，因为不管在不在开放列表里都要更新
                gScore[neighbor.x][neighbor.y] = tentative_gScore;
                fScore[neighbor.x][neighbor.y] = tentative_gScore + heuristic(neighbor, goal);

                // 若邻居不在开放列表中，且新路径的 G 值较小，则添加该节点路径
                // 如果已经在了，只更新G值和F值就够了，避免重复访问
                if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return null; // 无路径可用
}

// 将食物的位置设为目标，每次移动时重新计算路径，逐步让 AI 蛇按照路径移动。
const moveAISnake = () => {
    initializeGrid(); // 初始化网格，更新蛇和墙的位置
    let head = AIsnakeBody[0];
    //let path = aStar(head, Food); // 计算路径
    let path = greedySearch(head, Food); // 计算路径
    if (path && path.length > 1) {
        // AIsnakeBody.unshift(path[1]); // 移动到路径的下一个节点
        // AIsnakeBody.pop(); // 删除尾部，使蛇长度保持不变
        
        // path是一个对象数组，需要取出其中第一个坐标
        return path[1]; // 新位置
    } else {
        console.log("没有路径可行！AI 停止移动");
    }
}
/*由B22042129童吉吉完成根据贪婪算法的ai逻辑控制
1.初始化：

    设置开放列表 openSet，存储待探索的节点，初始时包含起始节点 start。
    使用 cameFrom 对象记录每个节点的前驱节点，以便在抵达终点后回溯出路径。
    定义 hScore 二维数组，用于记录从当前节点到目标节点的启发值，即估计的剩余距离。
2.主循环：

    在 openSet 不为空的情况下循环执行。
    每次从 openSet 中选择启发值（hScore）最小的节点 current，将其作为当前节点进行探索。
    检查是否到达终点，如果到达，则通过 cameFrom 回溯生成路径并返回。
3.邻居节点的处理：

    对当前节点 current 的所有邻居节点 neighbor 进行遍历。
    如果某个邻居节点是不可通行的（如障碍物），则跳过。
    若邻居节点未被探索过，则更新其 cameFrom 和 hScore 值（由启发函数计算），
并将其添加到 openSet 中。
4.路径回溯：

    如果找到终点，回溯 cameFrom 中的节点，生成从起点到终点的路径。
    若遍历完所有节点后仍未找到路径，则返回 null 表示不可达。
5.设计思想总结
    贪心算法在每一步仅选择启发值最小的节点进行探索，以达到终点为目标。
这种算法设计思路简单，但不保证找到最短路径，适合对效率要求较高、路径最优性要求不严格的情况。
*/

//   贪婪算法
const greedySearch = (start, goal) => {
    // 用于存放待探索节点的开放列表
    let openSet = [start];
    
    /*
      对象，用于记录路径的来源节点，也就是每个节点的前驱节点。
      键格式为 `${neighbor.x},${neighbor.y}`
    */
    let cameFrom = {};

    // 二维数组：记录 H 值（启发值），即当前节点到目标节点的预估距离
    let hScore = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(Infinity));
    hScore[start.x][start.y] = heuristic(start, goal);

    // 贪心算法主循环
    while (openSet.length > 0) {
        // 每次从 openSet 中取出 H 值最小的节点作为当前节点
        openSet.sort((a, b) => hScore[a.x][a.y] - hScore[b.x][b.y]);//sort()方法对数组排序,依据是hScore
        let current = openSet.shift();

        // 如果已经抵达终点，回溯路径
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            while (current) {
                path.push(current);
                current = cameFrom[`${current.x},${current.y}`];
            }
            return path.reverse(); // 将路径反转,并返回
        }

        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            // 跳过不可通行节点
            if (grid[neighbor.x][neighbor.y] === 1) continue;

            // 记录前驱节点路径
            if (!cameFrom[`${neighbor.x},${neighbor.y}`]) {
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                hScore[neighbor.x][neighbor.y] = heuristic(neighbor, goal);

                // 若邻居不在开放列表中，添加到开放列表中
                if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return null; // 无路径可用
};