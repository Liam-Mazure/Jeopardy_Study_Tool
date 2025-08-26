import Card from './components/questionsCard'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element={<Navigate to="/play" replace/>}/>
        <Route path = "/play" element = {<Card/>}/>
      </Routes>
    </>
  )
}

export default App
