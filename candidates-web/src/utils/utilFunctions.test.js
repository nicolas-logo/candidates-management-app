import { countDifferentCells } from './utilFuctions'

describe('countDifferentCells', () => {
  it('should return 0 for two equal 2x2 arrays', () => {
    const array1 = [[1, 2], [3, 4]]
    const array2 = [[1, 2], [3, 4]]
    expect(countDifferentCells(array1, array2)).toEqual(0)
  })

  it('should return 4 for two completely different 2x2 arrays', () => {
    const array1 = [[1, 2], [3, 4]]
    const array2 = [[5, 6], [7, 8]]
    expect(countDifferentCells(array1, array2)).toEqual(4)
  })

  it('should return 2 for two arrays with 2 different cells', () => {
    const array1 = [[1, 2], [3, 4]]
    const array2 = [[1, 6], [7, 4]]
    expect(countDifferentCells(array1, array2)).toEqual(2)
  })

  it('should throw an error for arrays with different dimensions', () => {
    const array1 = [[1, 2], [3, 4]]
    const array2 = [[1, 2, 3], [4, 5, 6]]
    expect(() => countDifferentCells(array1, array2)).toThrow('Arrays must have the same dimensions')
  })
})
