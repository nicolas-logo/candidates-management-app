import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { InfoMessages } from './InfoMessages'
import renderer from 'react-test-renderer'

afterEach(() => {
  cleanup()
})

describe('InfoMessages tests', () => {
  it('should renders error message when `apiErrorMessage` prop is not null', () => {
    const apiErrorMessage = 'Error: Unable to retrieve photos.'
    const { getByText } = render(<InfoMessages apiErrorMessage={apiErrorMessage} />)
    const errorMessageElement = getByText(apiErrorMessage)
    expect(errorMessageElement).toBeInTheDocument()
    expect(errorMessageElement).toHaveClass('text-danger')
  })

  it('should renders "Loading..." message when `loading` prop is true', () => {
    const loading = true
    const { getByText } = render(<InfoMessages loading={loading} />)
    const loadingMessage = getByText('Loading...')
    expect(loadingMessage).toBeInTheDocument()
    expect(loadingMessage).toHaveClass('text-white')
  })

  it('should should match the snapshot', () => {
    const tree = renderer.create((<InfoMessages loading={false} imagesLength={0} />)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
