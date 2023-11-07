import { render, screen, fireEvent } from '@testing-library/react'
import MegaverseTable from './candidatesTable'

describe('MegaverseTable', () => {
  it('it renders the MegaverseTable component with the 3 buttons', () => {
    render(<MegaverseTable />)

    expect(screen.getByText('Save Megaverse'))
    expect(screen.getByText('Reset Megaverse'))
    expect(screen.getByText('Change Candidate Id'))
  })

  it('handles reset button click', () => {
    const megaverse = {
      contentMap: [[null]]
    }
    const saveMegaverse = jest.fn()
    const forgetCandidateId = jest.fn()
    const loading = false

    render(
      <MegaverseTable
        megaverse={megaverse}
        saveMegaverse={saveMegaverse}
        forgetCandidateId={forgetCandidateId}
        loading={loading}
      />
    )

    // Get the reset button and click it
    const resetButton = screen.getByText('Reset Megaverse')
    fireEvent.click(resetButton)

    expect(saveMegaverse).toHaveBeenCalled()
  })
})
