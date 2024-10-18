import Home from './pages/home'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import PageNotFound from './pages/pagenotfound'
import Upload from './pages/upload'
import Nav from './pages/components/nav'

function App() {


  return (
    <>
      <Nav/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App;
