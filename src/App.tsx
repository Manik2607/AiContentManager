import Home from './pages/home'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import PageNotFound from './pages/pagenotfound'
import Upload from './pages/upload'
import Nav from './pages/components/nav'
import SideNav from './pages/components/sidenav'
import FilesPage from './pages/files'
import { Toaster } from './components/ui/toaster'
// import { useState } from 'react'
import GetStarted from './landing'
import Search from './pages/search'
import Bin from './pages/bin'

function App() {
  // const [show,setShow] = useState(true);

  // if (!show) {
  //   return <GetStarted setShow={setShow} />;
  // }


  return (
    <>
      <div className="fixed flex flex-col w-screen h-screen bg-gradient-to-bl from-purple-800 to-orange-400">
        <Nav />
        <div className="flex flex-row w-full h-full">
          <Router>
            <SideNav />
            <Routes>
              <Route path="/" element={<GetStarted />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/bin" element={<Bin />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
