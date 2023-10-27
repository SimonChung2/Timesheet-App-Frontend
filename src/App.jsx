import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Timer from "./components/Timer"
import Login from "./components/Login"
import './App.css' 

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/timer" element={<Timer/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
