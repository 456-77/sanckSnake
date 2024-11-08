/**
 * Ai路径规划算法选择
 * 提供ai蛇路径搜索的接口 
 */

// 将食物的位置设为目标，每次移动时重新计算路径，逐步让 AI 蛇按照路径移动。
const moveAISnake = () => {
    initializeGrid(); // 初始化网格，更新蛇和墙的位置
    let head = AIsnakeBody[0];
    // //let path = aStar(head, Food); // 计算路径
    // let path = greedySearch(head, Food); // 计算路径
    let path =null;
    switch (setAIDifficulty()) {
        case 1:
            console.log("AI:aStar")
            path = aStar(head, Food); // 计算路径
            break;
        case 2:
            console.log("AI:greedySearch")
            path = greedySearch(head, Food); // 计算路径
            
            break;
        case 3:
            console.log("AI:dfs")
            path = dfs(head, Food); // 计算路径
            
            break;
        case 4:
            console.log("AI:bfs")
            path = bfs(head, Food); // 计算路径
            break;
        default:
            console.log("没有设置 AI 难度！");
            return;
    }
    if (path && path.length > 1) {
        // path是一个对象数组(从起点到终点)，需要取出其中第二个坐标,即新位置
        return path[1]; // 新位置
    } else {
        console.log("没有路径可行！AI 停止移动");
    }
}