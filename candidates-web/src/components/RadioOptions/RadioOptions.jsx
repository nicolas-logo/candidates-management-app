/* eslint-disable react/prop-types */
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const RadioOptions = ({ radios, radioValue, handleSwitchChange, radioName }) => {
  return (
    <div>
      <ButtonGroup toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}-${radioName}`}
            type="radio"
            variant={radio.className}
            name={`radio-${idx}-${radioName}`}
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(event) => handleSwitchChange(event.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default RadioOptions
