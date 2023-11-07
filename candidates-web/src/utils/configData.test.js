import {
  candidateColumns,
  errorTypes,
  radiosValues,
  approveRadioValues,
  conditionalRowStyles,
  radios,
  approveRadio
} from './configData'

describe('Constants and Objects Tests', () => {
  test('candidateColumns should match the expected structure', () => {
    const expectedColumns = {
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
    }
    expect(candidateColumns).toEqual(expectedColumns)
  })

  test('errorTypes should match the expected structure', () => {
    const expectedTypes = {
      ERR_CANCELED: 'ERR_CANCELED',
      ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
      CANDIDATE_SUBMITTED: 'CANDIDATE_SUBMITTED'
    }
    expect(errorTypes).toEqual(expectedTypes)
  })

  test('radiosValues should match the expected values', () => {
    expect(radiosValues).toEqual({
      ALL: '1',
      ONLY_MINE: '2'
    })
  })

  test('radios should have the correct structure', () => {
    const expectedRadios = [
      { name: 'ALL', value: radiosValues.ALL, className: 'outline-primary' },
      { name: 'Only Mine', value: radiosValues.ONLY_MINE, className: 'outline-warning' }
    ]
    expect(radios).toEqual(expectedRadios)
  })

  test('approveRadioValues should match the expected values', () => {
    expect(approveRadioValues).toEqual({
      APPROVED_REJECTED: '1',
      REJECTED: '2',
      APPROVED: '3'
    })
  })

  test('approveRadio should have the correct structure', () => {
    const expectedApproveRadio = [
      { name: 'Rejected & Approved', value: approveRadioValues.APPROVED_REJECTED, className: 'outline-primary' },
      { name: 'Rejected', value: approveRadioValues.REJECTED, className: 'outline-danger' },
      { name: 'Approved', value: approveRadioValues.APPROVED, className: 'outline-success' }
    ]
    expect(approveRadio).toEqual(expectedApproveRadio)
  })

  test('conditionalRowStyles should have the correct structure', () => {
    const expectedStyles = [
      {
        when: expect.any(Function),
        style: {
          backgroundColor: '#6c976c',
          color: 'white'
        }
      },
      {
        when: expect.any(Function),
        style: {
          backgroundColor: '#df5b5b',
          color: 'white'
        }
      }
    ]
    expect(conditionalRowStyles).toEqual(expectedStyles)
  })
})
