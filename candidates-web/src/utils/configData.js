export const candidateColumns = {
  name: 'NAME',
  document: 'DOCUMENT',
  cv_zonajobs: 'CV ZONA JOBS',
  cv_bumeran: 'CV BUMERAN',
  phone: 'PHONE',
  email: 'EMAIL',
  date: 'DATE',
  age: 'AGE',
  has_university: 'HAS UNIVERSITY',
  career: 'CAREER',
  graduated: 'GRADUATED',
  courses_approved: 'COURSES APPROVED',
  location: 'LOCATION',
  accepts_working_hours: 'ACCEPTS WORKING HOURS',
  desired_salary: 'DESIRED SALARY',
  had_interview: 'HAD INTERVIEW'
  // reason: 'REASON' -> removed, are shown on the children component
}

export const errorTypes = {
  ERR_CANCELED: 'ERR_CANCELED',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
  CANDIDATE_SUBMITTED: 'CANDIDATE_SUBMITTED'
}

export const radiosValues = {
  ALL: '1',
  ONLY_MINE: '2'
}

export const radios = [
  { name: 'ALL', value: radiosValues.ALL, className: 'outline-primary' },
  { name: 'Only Mine', value: radiosValues.ONLY_MINE, className: 'outline-warning' }
]

export const approveRadioValues = {
  APPROVED_REJECTED: '1',
  REJECTED: '2',
  APPROVED: '3'
}

export const approveRadio = [
  { name: 'Rejected & Approved', value: approveRadioValues.APPROVED_REJECTED, className: 'outline-primary' },
  { name: 'Rejected', value: approveRadioValues.REJECTED, className: 'outline-danger' },
  { name: 'Approved', value: approveRadioValues.APPROVED, className: 'outline-success' }
]

export const conditionalRowStyles = [
  {
    when: row => row.reason === '',
    style: {
      backgroundColor: '#6c976c',
      color: 'white'
    }
  },
  {
    when: row => row.reason !== '',
    style: {
      backgroundColor: '#df5b5b',
      color: 'white'
    }
  }
]
