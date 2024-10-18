import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>
        hello world
      </h1>
      <Button>click</Button>
    </>
  )
}

export default App
