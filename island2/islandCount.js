  // Check top
  // Check top right
  // Check right
  // Check bottom right
  // Check bottom
  // Check bottom left
  // Check left
  // Check top left
  // Return neighbors

function getNeighbors(row, col, matrix) {
  const neighbors = [];

  if (row > 0) {
    if (matrix[row - 1][col] === 1) {neighbors.push([row - 1, col])}

    if (col > 0 && matrix[row - 1][col - 1] === 1) {
      neighbors.push([row - 1, col - 1]);
    }
    if (col < matrix[0].length - 1 && matrix[row - 1][col + 1] === 1) {
      neighbors.push([row - 1, col + 1]);
    }
  }
  if (row < matrix.length - 1) {
    if (matrix[row + 1][col] === 1) {neighbors.push([row + 1, col])}

    if (col > 0 && matrix[row + 1][col - 1] === 1) {
      neighbors.push([row + 1, col - 1]);
    }
    if (col < matrix[0].length - 1 && matrix[row + 1][col + 1] === 1) {
      neighbors.push([row + 1, col + 1]);
    }
  }
  if (col > 0) {
    if (matrix[row][col - 1] === 1) {neighbors.push([row, col - 1])}
  }
  if (col < matrix[0].length - 1) {
    if (matrix[row][col + 1] === 1) {neighbors.push([row, col + 1])}
  }

  return neighbors;
}

function countIslands(matrix) {
  const visited = new Set(); let islandCount = 0;

  matrix.forEach( (row, rIdx) => {
    row.forEach ( (col, cIdx) => {
      if (col === 1 && !visited.has([rIdx, cIdx].toString())) {
        islandCount++; visited.add([rIdx, cIdx].toString());
        let stack = [[rIdx, cIdx]];

        while (stack.length > 0) {
          let currentNode = stack.pop();
          let [row, col] = currentNode;

          let neighbors = getNeighbors(row, col, matrix);

          if (neighbors.length > 0) {
            neighbors.forEach( node => {
              if (!visited.has(node.toString())) {
                visited.add(node.toString());
                stack.push(node);
              }
            })
          }
        }
      }
    });
  })

  return islandCount;
}

  // Create a visited set to store visited nodes
  // Initialize count to 0
  // Iterate through all indices in matrix
    // If an index contains a 1 and has not been visited,
    // increment island count and start traversing neighbors
      // DO THE THING (increment island count by 1)
      // Initialize a stack with current index
      // Add stringified version of current index to the visited set
      // While stack contains elements
        // Pop element from stack
        // Get valid neighbors of current element
        // Iterate over neigbors
          // If neighbor has not been visited
            // Add neighbor to stack
            // Mark neighbor as visited
  // Return island count


// Uncomment the lines below for local testing
 const matrix = [
                 [1,1,1,0,0],
                 [0,1,1,0,1],
                 [0,1,1,0,1]
               ]

 //console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
 //console.log(getNeighbors(2,4, matrix)) // [[1,4]]

 const matrix2 = [
                     [1,1,1,0,1],
                     [0,0,0,0,1],
                     [1,0,0,1,0],
                 ]

 console.log(countIslands(matrix)) // 2
 console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];
