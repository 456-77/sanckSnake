// 将食物的位置设为目标，每次移动时重新计算路径，逐步让 AI 蛇按照路径移动。
const moveAISnake = () => {
    initializeGrid(); // 初始化网格，更新蛇和墙的位置
    let head = AIsnakeBody[0];
    // //let path = aStar(head, Food); // 计算路径
    // let path = greedySearch(head, Food); // 计算路径
    let path =null;
    switch (setAIDifficulty()) {
        case 1:
            path = aStar(head, Food); // 计算路径
            break;
        case 2:
            path = greedySearch(head, Food); // 计算路径
            
            break;
        case 3:
            path = dfs(head, Food); // 计算路径
            
            break;
        case 4:
            path = bfs(head, Food); // 计算路径
            break;
        default:
            console.log("没有设置 AI 难度！");
            return;
    }
    if (!path|| path.length <=1)
        console.log("没有路径可行！AI 停止移动");
    else 
        console.log("AI 正在移动...");
        

    if (path && path.length > 1) {
        // AIsnakeBody.unshift(path[1]); // 移动到路径的下一个节点
        // AIsnakeBody.pop(); // 删除尾部，使蛇长度保持不变
        
        // path是一个对象数组，需要取出其中第一个坐标
        return path[1]; // 新位置
    } else {
        console.log("没有路径可行！AI 停止移动");
    }
}