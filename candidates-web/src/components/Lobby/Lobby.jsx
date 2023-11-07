import './Lobby.scss'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setRecruiterName } from '../../redux/generalSlice'

export const Lobby = () => {
  const dispatch = useDispatch()
  const spanInput = useRef(null)
  const [recruiterNameValue, setRecruiterNameValue] = useState('')

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let animationFrameId = null
  let intervalId = null

  // Animation loop for the title letters
  const letterAnimation = useCallback(() => {
    let iteration = 0

    const animate = () => {
      if (spanInput.current) {
        spanInput.current.innerText = spanInput.current.dataset.value
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return spanInput.current.dataset.value[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          })
          .join('')

        if (iteration >= spanInput.current.dataset.value.length) {
          iteration = 0 // Reset the iteration for continuous animation
        } else {
          animationFrameId = requestAnimationFrame(animate)
          iteration += 1 / 3
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }, [letters])

  // Start the animation loop on component mount
  useEffect(() => {
    intervalId = setInterval(() => {
      letterAnimation()
    }, 5000)

    return () => {
      // Clean up the animation frames and interval on component unmount
      clearInterval(intervalId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [letterAnimation])

  // checks if the user pressed Enter to validate the key
  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      localStorage.setItem('RECRUITER_NAME', recruiterNameValue)
      dispatch(setRecruiterName(recruiterNameValue))
    }
  }

  // updates the api key whenever the user press a key
  const handleChange = (event) => {
    setRecruiterNameValue(event.target.value)
  }

  return (
    <div className="lobby">
      <div className='row'>
        <h1 id="title" className="centered">Welcome to</h1>
      </div>
      <div className='row'>
        <h1 className="centered">
          <span className="fancy"><b>Candidate Management App</b></span>
        </h1>
      </div>

      <div className='row'>
        <div className='col-md-8 offset-md-2 mt-5'>
          <span className='spanInput'
            ref={spanInput}
            data-value="Enter your name">Enter your name</span>
          <input
            type='text'
            className="form-control candidateInput"
            placeholder="Recruiter Name..."
            maxLength="20"
            value={recruiterNameValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}></input>
        </div>
      </div>
    </div>
  )
}
