  // Check top

  // Check bottom

  // Check left

  // Check right

  // Return neighbors

function getNeighbors(row, col, graph) {

  const neighbors = [];

  if (row > 0) {
    if (graph[row - 1][col] === 1) {neighbors.push([row - 1, col])}
  }

  if (row < graph.length - 1) {
    if (graph[row + 1][col] === 1) {neighbors.push([row + 1, col])}
  }

  if (col > 0) {
    if (graph[row][col - 1] === 1) {neighbors.push([row, col - 1])}
  }

  if (col < graph[row].length - 1) {
    if (graph[row][col + 1] === 1) {neighbors.push([row, col + 1])}
  }



  return neighbors;
}


  // Create a visited set to store visited nodes

  // Create a stack, put the starting node in the stack

  // Put the stringified starting node in visited

  // Initialize size to 0

  // While the stack is not empty,

    // Pop the first node

    // DO THE THING (increment size by 1)

    // Then push all the UNVISITED neighbors on top of the stack
    // and mark them as visited
    // HINT: This is what your helper function `getNeighbors` is for
    // HINT: Remember, you're storing your visited nodes as strings!

  // return size

function islandSize(row, col, graph) {
  const visited = new Set(); const stack = [[row, col]];
  let size = 0; visited.add(row.toString() + col.toString());

  while (stack.length > 0) {
    let [row, col] = stack.pop();
    size++;

    let neighbors = getNeighbors(row, col, graph);
    if (neighbors.length > 0) {
      neighbors.forEach( coor => {
        let [row, col] = coor;
        let strCoor = row.toString() + col.toString();
        if (!visited.has(strCoor)) {
          stack.push(coor);
          visited.add(strCoor);
        }
      });
    }
  }

  return size;
}

module.exports = [getNeighbors, islandSize];
