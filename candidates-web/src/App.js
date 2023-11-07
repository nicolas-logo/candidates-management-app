import Candidates from './components/Candidates/Candidates'
import { useSelector, useDispatch } from 'react-redux'
import { Lobby } from './components/Lobby/Lobby'
import { setRecruiterName } from './redux/generalSlice'

function App () {
  const dispatch = useDispatch()
  const RECRUITER_NAME = localStorage.getItem('RECRUITER_NAME')
  dispatch(setRecruiterName(RECRUITER_NAME))

  const general = useSelector((state) => state.general)

  return (
    <div className="App container col-md-12">
      {
        general.RECRUITER_NAME
          ? <Candidates />
          : <Lobby />
      }

    </div>
  )
}

export default App
