import { AstralObjects, AstralObjectsKeys } from './../utils/configData'
import { cloneDeep } from 'lodash'

const ContentMapType = (response) => {
  const mappedResponse = cloneDeep(response.data.map.content).map(row => {
    row = row.map(cell => {
      switch (cell?.type) {
        case AstralObjectsKeys.SPACE:
          cell = cloneDeep(AstralObjects[AstralObjectsKeys.SPACE])
          break
        case AstralObjectsKeys.POLYANET:
          cell = cloneDeep(AstralObjects[AstralObjectsKeys.POLYANET])
          break
        case AstralObjectsKeys.SOLOON: {
          const color = cell.color
          cell = cloneDeep(AstralObjects[AstralObjectsKeys.SOLOON])
          cell.color = color
          cell.setImage()
          break
        }
        case AstralObjectsKeys.COMETH: {
          const direction = cell.direction
          cell = cloneDeep(AstralObjects[AstralObjectsKeys.COMETH])
          cell.direction = direction
          cell.setImage()
          break
        }
      }
      return cell
    })
    return row
  })
  return {
    contentMap: mappedResponse
  }
}

export default ContentMapType
