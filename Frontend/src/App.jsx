import Card from './components/questionsCard'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/"/>
        <Route path = "/play" element = {<Card/>}/>
      </Routes>
    </>
  )
}

export default App
