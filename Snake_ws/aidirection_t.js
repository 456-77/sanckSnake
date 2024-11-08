/**
 * author: B22042129童吉吉
 * 贪婪算法、BFS、DFS算法的实现
 */

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
    let hScore = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(Infinity));// 初始化长度为 GRID_SIZE 的二维数组，元素都为 Infinity
    hScore[start.x][start.y] = heuristic(start, goal);

    // 贪心算法主循环
    while (openSet.length > 0) {
        // 每次从 openSet 中取出 H 值最小的节点作为当前节点
        openSet.sort((a, b) => hScore[a.x][a.y] - hScore[b.x][b.y]);//sort()方法对数组排序,依据是hScore
        let current = openSet.shift();//取出节点并删除开放列表中

        // 如果已经抵达终点，回溯路径
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            // 回溯路径
            while (current) {
                path.push(current);
                current = cameFrom[`${current.x},${current.y}`];
            }
            return path.reverse(); // 将路径反转,最终的路径是从起点到终点,并返回整个路径
        }

        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            // 跳过不可通行节点
            if (grid[neighbor.x][neighbor.y] === 1) continue;

            // 记录前驱节点路径
            if (!cameFrom[`${neighbor.x},${neighbor.y}`]) {
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                hScore[neighbor.x][neighbor.y] = heuristic(neighbor, goal);// 更新 H 值

                // 若邻居不在开放列表中，添加到开放列表中
                if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return null; // 无路径可用
};
//深度优先搜索（DFS）和广度优先搜索（BFS）算法
/*由B22042129童吉吉完成DFS和BFS算法
1.DFS算法：

    先将起始节点放入栈 stack，然后开始循环，当栈不为空时，取出栈顶节点，并将其邻居节点加入栈中，
    直到栈顶节点是终点，则结束循环。
    栈的特点是先进后出，因此先访问的节点在栈底，后访问的节点在栈顶。
    时间复杂度：O(b^d)，b为节点数，d为路径长。
2.BFS算法：

    先将起始节点放入队列 queue，然后开始循环，当队列不为空时，取出队列头节点，并将其邻居节点加入队列中，
    直到队列头节点是终点，则结束循环。
    队列的特点是先进先出，因此先访问的节点在队列头，后访问的节点在队列尾。
    时间复杂度：O(b^d)，b为节点数，d为路径长。
3.设计思想总结
    DFS和BFS算法都采用了栈或队列的先进后出或先进先出策略，从而实现对节点的访问。
    但两者的区别在于，DFS采用栈，BFS采用队列。
    DFS算法的优点是简单，容易实现，但效率低，BFS算法的优点是效率高，但实现起来稍微复杂一些。
    一般情况下，DFS算法用于对有向图进行遍历，BFS算法用于对无向图进行遍历。
 */
const dfs = (start, goal) => {
    // 用于存放待探索节点的栈,后进先出
    let stack = [start];
    
    // 记录路径的来源节点,即每个节点的前驱节点,键格式为 `${neighbor.x},${neighbor.y}`
    let cameFrom = {};
    while (stack.length > 0) {
        // 取出栈顶节点作为当前节点
        let current = stack.pop();
        // 如果已经抵达终点，回溯路径
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            while (current) {
                path.push(current);
                current = cameFrom[`${current.x},${current.y}`];
            }
            return path.reverse();
        }
        // 遍历当前节点的邻居节点
        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            // 跳过不可通行节点
            if (grid[neighbor.x][neighbor.y] === 1) continue;
            // 记录前驱节点路径
            if (!cameFrom[`${neighbor.x},${neighbor.y}`]) {
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                // 将邻居节点加入栈中
                stack.push(neighbor);
            }
        }
    }
    return null;
};

const bfs = (start, goal) => {
    // 用于存放待探索节点的队列,先进先出
    let queue = [start];
    // 记录路径的来源节点,即每个节点的前驱节点,键格式为 `${neighbor.x},${neighbor.y}`
    let cameFrom = {};
    while (queue.length > 0) {
        // 取出队列头节点作为当前节点
        let current = queue.shift();
        if (current.x === goal.x && current.y === goal.y) {
            let path = [];
            while (current) {
                path.push(current);
                current = cameFrom[`${current.x},${current.y}`];
            }
            return path.reverse();
        }
        let neighbors = getNeighbors(current);
        for (let neighbor of neighbors) {
            if (grid[neighbor.x][neighbor.y] === 1) continue;
            if (!cameFrom[`${neighbor.x},${neighbor.y}`]) {
                cameFrom[`${neighbor.x},${neighbor.y}`] = current;
                queue.push(neighbor);
            }
        }
    }
    return null;
};
