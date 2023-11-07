import ContentMapType from './../contentTypes/contentMap'

describe('ContentMapType', () => {
  it('should map SPACE type correctly', () => {
    const response = {
      data: {
        map: {
          content: [
            [{ type: 'SPACE' }]
          ]
        }
      }
    }
    const mappedContent = ContentMapType(response)
    expect(mappedContent.contentMap[0][0].type).toBe('SPACE')
  })

  it('should map POLYANET type correctly', () => {
    const response = {
      data: {
        map: {
          content: [
            [{ type: 'POLYANET' }]
          ]
        }
      }
    }
    const mappedContent = ContentMapType(response)
    expect(mappedContent.contentMap[0][0].type).toBe('POLYANET')
  })

  it('should map SOLOON type correctly with color', () => {
    const response = {
      data: {
        map: {
          content: [
            [{ type: 'SOLOON', color: 'red' }]
          ]
        }
      }
    }
    const mappedContent = ContentMapType(response)
    expect(mappedContent.contentMap[0][0].type).toBe('SOLOON')
    expect(mappedContent.contentMap[0][0].color).toBe('red')
  })

  it('should map COMETH type correctly with direction', () => {
    const response = {
      data: {
        map: {
          content: [
            [{ type: 'COMETH', direction: 'left' }]
          ]
        }
      }
    }
    const mappedContent = ContentMapType(response)
    expect(mappedContent.contentMap[0][0].type).toBe('COMETH')
    expect(mappedContent.contentMap[0][0].direction).toBe('left')
  })
})
