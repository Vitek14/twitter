import { useState } from 'react'
import './App.css'
import UserPage from "./components/user_page/UserPage.jsx";

function App() {
  const [count, setCount] = useState(222)

  return (
    <>
      <UserPage/>
    </>
  )
}

export default App
