/* eslint-disable react/prop-types */
import { candidateColumns, conditionalRowStyles } from '../../utils/configData'
import DataTable from 'react-data-table-component'
import RejectedReasons from '../RejectedReasons/RejectedReasons'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const CandidatesTable = ({ candidates, currentPage, totalPages, fetchCandidates }) => {
  const [hiddenColumns, setHiddenColumns] = useState([])
  const general = useSelector((state) => state.general)

  useEffect(() => {
    const savedHiddenColumnsRaw = localStorage.getItem(_.upperCase(general.RECRUITER_NAME))
    if (!_.isNil(savedHiddenColumnsRaw)) {
      setHiddenColumns(JSON.parse(savedHiddenColumnsRaw))
    }
  }, [])

  const handleTableChange = ({ page }) => {
    fetchCandidates(page)
  }

  const isURL = (str) => {
    // A simple check to determine if a string is a URL
    const urlPattern = /^https?:\/\/\S+/
    return urlPattern.test(str)
  }

  const columns = Object.keys(candidateColumns).map((key) => ({
    name: candidateColumns[key],
    selector: key,
    cell: (row) => (
      isURL(row[key])
        ? (<a href={row[key]} target="_blank" rel="noopener noreferrer">Visit Profile</a>)
        : (row[key].toString())
    )
  }))

  const options = columns.map(column => ({
    label: column.name,
    value: column.selector
  }))

  const handleChange = selectedOptions => {
    const selectedColumns = selectedOptions.map(option => option.value)
    setHiddenColumns(selectedColumns)

    localStorage.setItem(_.upperCase(general.RECRUITER_NAME), JSON.stringify(selectedColumns))
  }

  return (
    <div className='container candidates-table col-md-12'>
      <div className='hidden-columns-container'>
        <label>Hidden Columns:</label>
        <Select
          isMulti
          options={options}
          value={hiddenColumns.map(column => ({ label: _.upperCase(column), value: column }))}
          onChange={handleChange}
          placeholder="Select columns to hide..."
        />
      </div>
      {
        <DataTable
          title='Candidates'
          columns={columns.filter(column => !hiddenColumns.includes(column.selector))}
          data={candidates}
          pagination
          paginationServer
          expandableRowsComponent={(row) => <RejectedReasons row={row} />}
          expandableRows
          paginationTotalRows={totalPages * candidates.length}
          onChangePage={(page) => handleTableChange({ page })}
          paginationDefaultPage={currentPage}
          subHeader
          conditionalRowStyles={conditionalRowStyles}
          highlightOnHover
          dense
          noHeader
        />
      }
    </div>
  )
}

export default CandidatesTable
