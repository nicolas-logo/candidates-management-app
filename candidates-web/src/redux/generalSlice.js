import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  RECRUITER_NAME: '',
  REJECTED_REASONS: []
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setRecruiterName: (state, action) => {
      state.RECRUITER_NAME = action.payload
    },
    setRejectedReasons: (state, action) => {
      state.REJECTED_REASONS = action.payload
    }
  }
})

export const {
  setRecruiterName,
  setRejectedReasons
} = generalSlice.actions
export default generalSlice.reducer
