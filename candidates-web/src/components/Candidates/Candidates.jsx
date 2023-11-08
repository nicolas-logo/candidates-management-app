/* eslint-disable no-fallthrough */
import { useState, useEffect, useCallback, useMemo } from 'react'
import { GetRequestToken, CancelRequestToken, GetCandidates, GetRejectedReasons } from '../../services/candidatesService'
import { useDispatch, useSelector } from 'react-redux'
import { InfoMessages } from '../InfoMessages/InfoMessages'
import CandidatesTable from '../CandidatesTable/candidatesTable'
import RadioOptions from '../RadioOptions/RadioOptions'
import { setRecruiterName, setRejectedReasons } from '../../redux/generalSlice'
import { radios, radiosValues, approveRadio, approveRadioValues, debounceTimeMs } from '../../utils/configData'
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
  const [radioApprovedValue, setRadioApprovedValue] = useState(approveRadioValues.APPROVED_REJECTED)
  const general = useSelector((state) => state.general)
  const [firstLoadEnded, setFirstLoadEnded] = useState(false)

  // when the component is rendered, ask for a token for the requests
  // and gets the candidates
  useEffect(() => {
    const fetchData = async () => {
      await fetchCandidates({})
      await fetchRejectedReasons()

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

    // build the filters
    const filters = {}
    page ? filters.page = page : filters.page = currentPage
    if (!_.isNil(searchText)) filters.filter = searchText
    if (radioValue === radiosValues.ONLY_MINE) {
      filters.onlyMe = general.RECRUITER_NAME
      filters.page = 1
    }

    if (radioApprovedValue === approveRadioValues.APPROVED || radioApprovedValue === approveRadioValues.REJECTED) {
      // rejectedEqualTo: true = rejected.
      // rejectedEqualTo: false = approved.
      filters.rejectedEqualTo = radioApprovedValue === approveRadioValues.REJECTED
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
  }, [searchText, radioValue, radioApprovedValue])

  // Gets the Rejected Reasons list
  // attached to redux to avoid recalls on rerenders on Reject Component
  const fetchRejectedReasons = async () => {
    try {
      requestToken = await GetRequestToken()
      const response = await GetRejectedReasons({ requestToken })

      // maps the options to be showed on the select component
      const mappedOptions = response.rejectedReasons.map((reason) => ({
        label: reason.reason,
        value: reason.code
      }))
      dispatch(setRejectedReasons(mappedOptions))
    } catch (error) {
      setApiErrorMessage('An error occurred while fetching candidates.')
    }
  }

  // resets the saved recruiter name
  const forgetRecruiterName = useCallback(() => {
    localStorage.removeItem('RECRUITER_NAME')
    dispatch(setRecruiterName(null))
  }, [dispatch])

  // Creates a debounce function for fetchCandidates
  const fetchCandidatesDebounced = useMemo(() => _.debounce(fetchCandidates, debounceTimeMs), [fetchCandidates])

  // update the search text, triggering fetchCandidates
  const handleSearchText = useCallback((text) => {
    setSearchText(text)
  }, [])

  // uses debounce to wait until the user stop typing
  useEffect(() => {
    fetchCandidatesDebounced()
    return () => fetchCandidatesDebounced.cancel()
  }, [searchText, radioValue, radioApprovedValue])

  // update the ALL/Only Me radio value, triggering fetchCandidates
  const handleSwitchLastModifiedChange = useCallback((value) => {
    setRadioValue(value)
  }, [])

  // update the Approved & Rejected/Approved/Rejected radio value, triggering fetchCandidates
  const handleSwitchApprovedChange = useCallback((value) => {
    setRadioApprovedValue(value)
  }, [])

  return (
    <div className='col-md-11 mx-auto'>
      { firstLoadEnded && <div className='table-container container'>
        <div className='table-responsive'>
          <h1>Your Desktop: <span className='text-warning'><b>{general.RECRUITER_NAME}</b></span></h1>
          <div>
            <button
              name='change-candidate'
              className='btn btn-danger'
              onClick={() => forgetRecruiterName()}>Change Recruiter</button>
          </div>
          <h3 className='filter-header'>Filters:</h3>
          <RadioOptions radioName="last-modified" radios={radios} radioValue={radioValue} handleSwitchChange={handleSwitchLastModifiedChange}></RadioOptions>
          <RadioOptions radioName="approved" radios={approveRadio} radioValue={radioApprovedValue} handleSwitchChange={handleSwitchApprovedChange}></RadioOptions>
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
