import { render, fireEvent, screen } from '@testing-library/react'
import RadioOptions from './RadioOptions'

describe('RadioOptions', () => {
  const radios = [
    { name: 'Option 1', value: '1', className: 'outline-primary' },
    { name: 'Option 2', value: '2', className: 'outline-warning' }
  ]
  const radioValue = '1'
  const handleSwitchChange = jest.fn()
  const radioName = 'testRadio'

  it('renders the radio options with the correct labels and values', () => {
    render(<RadioOptions radios={radios} radioValue={radioValue} handleSwitchChange={handleSwitchChange} radioName={radioName} />)

    radios.forEach((radio) => {
      const radioElement = screen.getByText(radio.name)
      expect(radioElement).toBeInTheDocument()
    })
  })

  it('calls handleSwitchChange when a radio option is selected', () => {
    render(<RadioOptions radios={radios} radioValue={radioValue} handleSwitchChange={handleSwitchChange} radioName={radioName} />)

    const option2Radio = screen.getByText('Option 2')

    fireEvent.click(option2Radio)

    expect(handleSwitchChange).toHaveBeenCalledWith('2')
  })
})
