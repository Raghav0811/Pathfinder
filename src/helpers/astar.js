const manhattanDistance = (currenNode, endNode) {
    differenceInCol = Math.abs(currentNode.col - endNode.col);
    differenceInRow = Math.abs(currenNode.row - endNode.row);

    return differenceInCol + differenceInRow;
}

export const astar = (grid, start, end) => {
    let unVisitedNodes = [];
    let visitedNodes = [];

    unvisitedNodes.push(start);

    while(unvisitedNodes.length) {
        const currentNode = unvisitedNodes[0];
        const currentIdx = 0;

        unvisitedNodes.forEach((node, idx) =>{
            if(node.cost < currentNode.cost) {
                currentNode = node;
                currentIdx = idx
            }
        })

        unVisitedNodes = unVisitedNodes.splice(idx, 1);
        visitedNodes.push(currentNode);
    }
}