/* eslint-disable no-fallthrough */
import { useState, useEffect, useCallback } from 'react'
import { GetRequestToken, CancelRequestToken, GetCandidates, GetRejectedReasons } from '../../services/candidatesService'
import { useDispatch, useSelector } from 'react-redux'
import { InfoMessages } from '../InfoMessages/InfoMessages'
import CandidatesTable from '../CandidatesTable/candidatesTable'
import { setRecruiterName, setRejectedReasons } from '../../redux/generalSlice'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { radios, radiosValues } from '../../utils/configData'
import _ from 'lodash'

import './Candidates.scss'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

let requestToken

const Candidates = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState('')
  const [candidates, setCandidates] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [radioValue, setRadioValue] = useState(radiosValues.ALL)
  const general = useSelector((state) => state.general)
  const [firstLoadEnded, setFirstLoadEnded] = useState(false)

  // when the component is rendered, ask for a token for the requests
  // and gets the candidates
  useEffect(() => {
    const fetchData = async () => {
      await fetchCandidates({})
      await fetchRejectedReasons()
      // eslint-disable-next-line no-debugger
      debugger
      setFirstLoadEnded(true) // Set loading state to true when data is loaded
    }

    fetchData()
    return () => {
      // canceling flying requests on component unmount
      CancelRequestToken({ requestToken })
    }
  }, [])

  // get candidates from the api
  const fetchCandidates = useCallback(async (page) => {
    requestToken = await GetRequestToken()

    const filters = {}
    page ? filters.page = page : filters.page = currentPage
    if (!_.isNil(searchText)) filters.filter = searchText
    if (radioValue === radiosValues.ONLY_MINE) {
      filters.onlyMe = general.RECRUITER_NAME
      filters.page = 1
    }

    setLoading(true)
    setCandidates([])
    try {
      const response = await GetCandidates({
        requestToken,
        filters
      })

      if (!response.error) {
        setApiErrorMessage('')
        setCandidates(response.candidates)
        setTotalPages(response.totalPages)
        setCurrentPage(response.currentPage)
      } else {
        setApiErrorMessage(response.message)
      }
    } catch (error) {
      setApiErrorMessage('An error occurred while fetching candidates.')
    } finally {
      setLoading(false)
    }
  }, [searchText, radioValue])

  // attached to redux to avoid recalls on rerenders on Reject Component
  const fetchRejectedReasons = async () => {
    requestToken = await GetRequestToken()
    const response = await GetRejectedReasons({ requestToken })

    const mappedOptions = response.rejectedReasons.map((reason) => ({
      label: reason.reason,
      value: reason.code
    }))
    dispatch(setRejectedReasons(mappedOptions))
  }

  // resets the saved recruiter name
  const forgetRecruiterName = useCallback(() => {
    localStorage.removeItem('RECRUITER_NAME')
    dispatch(setRecruiterName(null))
  }, [dispatch])

  // Creates a debounce function for GetCoins
  const fetchCandidatesDebounced = _.debounce(fetchCandidates, 500)

  const handleSearchText = (text) => {
    setSearchText(text)
  }

  // uses debounce to wait until the user stop typing
  useEffect(() => {
    fetchCandidatesDebounced()
    return () => fetchCandidatesDebounced.cancel()
  }, [searchText, radioValue])

  const handleSwitchChange = (value) => {
    setRadioValue(value)
  }

  return (
    <div>
      { firstLoadEnded && <div className='table-container container'>
        <div className='table-responsive'>
          <h1>Your Desktop: <span className='text-warning'><b>{general.RECRUITER_NAME}</b></span></h1>
          <div>
            <button
              name='change-candidate'
              className='btn btn-danger'
              onClick={() => forgetRecruiterName()}>Change Recruiter</button>
          </div>
          <div>
            <ButtonGroup toggle>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? 'outline-warning' : 'outline-success'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(event) => handleSwitchChange(event.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <input
                placeholder="Search for candidate..."
                value={searchText}
                className='form-control btn-search'
                onChange={(event) => { handleSearchText(event.target.value) }} />
          </div>
          <CandidatesTable fetchCandidates={fetchCandidates} currentPage={currentPage} candidates={candidates} totalPages={totalPages} />
        </div>
        <InfoMessages apiErrorMessage={apiErrorMessage} loading={loading} />

          <div>
        </div>
      </div>}
    </div>
  )
}

export default Candidates
