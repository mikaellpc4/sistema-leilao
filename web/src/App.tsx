import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
