import { sandboxMatrixLength } from './configData'

// function that return the number of differences to be show in the request counter
export const countDifferentCells = (array1, array2) => {
  if (array1.length !== array2.length || array1[0].length !== array2[0].length) {
    throw new Error('Arrays must have the same dimensions')
  }

  let differentCells = 0

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      if (JSON.stringify(array1[i][j]) !== JSON.stringify(array2[i][j])) {
        differentCells++
      }
    }
  }

  return differentCells
}

// creates a 2d array for the sandbox
export const create2DArraySandbox = () => {
  const rows = sandboxMatrixLength
  const cols = sandboxMatrixLength
  const sandbox = {}
  const matrix = []

  for (let i = 0; i < rows; i++) {
    const row = []

    for (let j = 0; j < cols; j++) {
      row.push(null)
    }

    matrix.push(row)
  }

  sandbox.contentMap = matrix
  return sandbox
}
