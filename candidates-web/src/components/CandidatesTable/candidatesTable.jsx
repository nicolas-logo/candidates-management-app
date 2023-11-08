/* eslint-disable react/prop-types */
import { candidateColumns, conditionalRowStyles } from '../../utils/configData'
import DataTable from 'react-data-table-component'
import RejectedReasons from '../RejectedReasons/RejectedReasons'
import Select from 'react-select'
import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const CandidatesTable = ({ candidates, currentPage, totalPages, fetchCandidates }) => {
  const [hiddenColumns, setHiddenColumns] = useState([])
  const general = useSelector((state) => state.general)

  // looks for the saved hidden columns on localStorage and load them
  useEffect(() => {
    const savedHiddenColumnsRaw = localStorage.getItem(_.upperCase(general.RECRUITER_NAME))
    if (!_.isNil(savedHiddenColumnsRaw)) {
      setHiddenColumns(JSON.parse(savedHiddenColumnsRaw))
    }
  }, [])

  // ask for the next page with the current filters
  const handleTableChange = ({ page }) => {
    fetchCandidates(page)
  }

  // Checks to determine if a string is a URL so is showed as a link
  const isURL = (str) => {
    const urlPattern = /^https?:\/\/\S+/
    return urlPattern.test(str)
  }

  // builds the columns and each cell, in case of the content is an URL, it's showed as a link
  const columns = useMemo(() => {
    return Object.keys(candidateColumns).map((key) => ({
      name: candidateColumns[key],
      selector: key,
      cell: (row) => (isURL(row[key])
        ? (
        <a href={row[key]} target="_blank" rel="noopener noreferrer">
          Visit Profile
        </a>
          )
        : (
            row[key].toString()
          ))
    }))
  }, [])

  // builds the columns to be showed on the hidden column component
  const options = useMemo(() => {
    return columns.map((column) => ({
      label: column.name,
      value: column.selector
    }))
  }, [columns])

  // updates the selected hidden columns on the component and on the localStorage for that recruiter name
  const handleChangeColumns = selectedOptions => {
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
          onChange={handleChangeColumns}
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
