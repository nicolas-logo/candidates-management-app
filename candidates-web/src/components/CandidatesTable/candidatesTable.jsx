/* eslint-disable react/prop-types */
import { candidateColumns, conditionalRowStyles } from '../../utils/configData'
import DataTable from 'react-data-table-component'
import RejectedReasons from '../RejectedReasons/RejectedReasons'

const CandidatesTable = ({ candidates, currentPage, totalPages, fetchCandidates }) => {
  // const [searchText, setSearchText] = useState('')
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

  return (
    <div className='container candidates-table'>
      <DataTable
        title='Candidates'
        columns={columns}
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
    </div>
  )
}

export default CandidatesTable
