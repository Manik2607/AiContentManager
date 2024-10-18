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

function App() {


  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gradient-to-bl from-purple-800 to-orange-400">
        <Nav />
        <div className="flex flex-row w-full h-full">
          <Router>
            <SideNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/files" element={<FilesPage />} />
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
