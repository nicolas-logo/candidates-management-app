import axios from 'axios'
import { errorTypes } from '../utils/configData'

const ROOT_API_URL = 'http://localhost:4000/api'

const GetRequestToken = () => {
  const requestToken = axios.CancelToken.source()
  return requestToken
}

const CancelRequestToken = ({ requestToken }) => {
  try {
    requestToken.cancel()
  } catch (error) {
    console.log('CancelRequestToken error:', error)
  }
}

const GetCandidates = async ({ requestToken, filters }) => {
  try {
    let url = `${ROOT_API_URL}/candidates`

    // Check if filters object is not empty
    if (filters && Object.keys(filters).length > 0) {
      url += '?' // Start of query string

      // Iterate through the filters object and add query parameters to the URL
      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          if (url.charAt(url.length - 1) !== '?') {
            // If not the first query parameter, add an "&" to separate parameters
            url += '&'
          }

          // Add the filter as a query parameter
          url += `${key}=${encodeURIComponent(filters[key])}`
        }
      }
    }

    const response = await axios.get(url, {
      cancelToken: requestToken.token
    })
    return response.data
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const UpdateCandidate = async ({ requestToken, request, id }) => {
  try {
    const url = `${ROOT_API_URL}/candidates/${id}`
    const response = await axios.put(url, {
      cancelToken: requestToken.token,
      ...request
    })

    return response
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const GetRejectedReasons = async ({ requestToken }) => {
  try {
    const url = `${ROOT_API_URL}/rejectedReasons`

    const response = await axios.get(url, {
      cancelToken: requestToken.token
    })
    return response.data
  } catch (error) {
    return error.response ? ErrorHandler(error.response.data.error) : ErrorHandler(error)
  }
}

const ErrorHandler = (error) => {
  switch (error.code) {
    case errorTypes.ERR_CANCELED:
      return {
        error: true,
        message: 'Request canceled'
      }
    case errorTypes.ERR_BAD_REQUEST:
      return {
        error: true,
        message: error.response.data.message
      }
    case errorTypes.CANDIDATE_SUBMITTED:
      return {
        error: true,
        message: error.message,
        errorCode: errorTypes.CANDIDATE_SUBMITTED
      }
    default: return { error: true, message: error.message }
  }
}

export { GetRequestToken, CancelRequestToken, GetCandidates, GetRejectedReasons, UpdateCandidate }
