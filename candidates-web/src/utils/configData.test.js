import {
  moonColors,
  cometDirections,
  AstralObjects,
  AstralObjectsKeys,
  DefaultAstralObject,
  directions,
  awaitEndpointTime
} from './../utils/configData'

describe('AstralObjects', () => {
  it('should define moonColors correctly', () => {
    expect(moonColors).toEqual({
      BLUE: 'blue',
      RED: 'red',
      PURPLE: 'purple',
      WHITE: 'white'
    })
  })

  it('should define cometDirections correctly', () => {
    expect(cometDirections).toEqual({
      UP: 'up',
      DOWN: 'down',
      LEFT: 'left',
      RIGHT: 'right'
    })
  })

  it('should define AstralObjects correctly', () => {
    expect(AstralObjects).toEqual({
      null: {
        name: 'SPACE',
        type: null,
        image: expect.any(String)
      },
      0: {
        name: 'POLYANET',
        type: 0,
        image: expect.any(String)
      },
      1: {
        name: 'SOLOON',
        type: 1,
        image: expect.any(String),
        color: moonColors.BLUE,
        changeColor: expect.any(Function),
        setImage: expect.any(Function),
        isLast: expect.any(Function)
      },
      2: {
        name: 'COMETH',
        type: 2,
        image: expect.any(String),
        direction: cometDirections.UP,
        changeDirection: expect.any(Function),
        setImage: expect.any(Function),
        isLast: expect.any(Function)
      }
    })
  })

  it('should define AstralObjectsKeys correctly', () => {
    expect(AstralObjectsKeys).toEqual({
      SPACE: null,
      POLYANET: 0,
      SOLOON: 1,
      COMETH: 2
    })
  })

  it('should define DefaultAstralObject correctly', () => {
    expect(DefaultAstralObject).toBe(0)
  })

  it('should define directions correctly', () => {
    expect(directions).toEqual([
      [-1, 0], // Up
      [1, 0], // Down
      [0, -1], // Left
      [0, 1] // Right
    ])
  })

  it('should define awaitEndpointTime correctly', () => {
    expect(awaitEndpointTime).toBe(1500)
  })
})
