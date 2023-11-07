/* eslint-disable react/prop-types */
import { CancelRequestToken, GetRequestToken, UpdateCandidate } from '../../services/candidatesService'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'

let requestToken

const RejectedReasons = ({ row }) => {
  const [rejectedReasons, setRejectedReasons] = useState([])
  const [rejectedReasonsSelected, setRejectedReasonsSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSavedLabel, setShowSavedLabel] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const general = useSelector((state) => state.general)

  // when the component is rendered, ask for a token for the requests
  // and gets the candidates
  useEffect(() => {
    setRejectedReasons(general.REJECTED_REASONS)

    if (row.data.reasonCodes) {
      // Parse the comma-separated reason codes into an array of codes
      const selectedReasons = row.data.reasonCodes?.split(',').map(code => parseInt(code))

      // Filter the general.REJECTED_REASONS to get the selected reasons
      const selectedReasonsData = general.REJECTED_REASONS.filter(reason => selectedReasons.includes(reason.value))

      // Set the selected reasons in the state
      setRejectedReasonsSelected(selectedReasonsData)
    }

    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [])

  const handleRejectedReasonsChange = (selected) => {
    setRejectedReasonsSelected(selected)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setShowSavedLabel(true)
      setErrorMessage('')

      requestToken = await GetRequestToken()
      const reasonCodes = rejectedReasonsSelected.map(item => item.value).join(',')
      const reason = rejectedReasonsSelected.map(item => item.label).join(',')

      const request = {
        reasonCodes,
        reason,
        last_modified_by: general.RECRUITER_NAME
      }

      const response = await UpdateCandidate({ requestToken, request, id: row.data._id })

      // updates the row to change the color of the row
      row.data.reason = response.data.candidateUpdated.reason
      row.data.reasonCodes = response.data.candidateUpdated.reasonCodes
    } catch (error) {
      setErrorMessage('An error occurred while saving.')
      setShowSavedLabel(false)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setShowSavedLabel(false)
      }, 2000)
    }
  }

  return (
    <div className='rejected-reasons-container'>
      <div className='col-md-2'>
        <label><b>Select Rejected Reasons:</b></label>
        <Select
          className='rejected-reason-select'
          isMulti
          options={rejectedReasons}
          value={rejectedReasonsSelected}
          onChange={handleRejectedReasonsChange}
        />
        <button className='btn btn-success' onClick={() => handleSave()}>Save Reasons</button>
        {
          loading && <label className='text-warning'>Saving...</label>
        }{
          !loading && !errorMessage && showSavedLabel && <label className='text-success'>Saved!</label>
        }
      </div>
    </div>
  )
}

export default RejectedReasons
