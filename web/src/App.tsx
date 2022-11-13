import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/login' element={<Auth />} />
        <Route path='/user/register' element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
