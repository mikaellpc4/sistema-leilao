import { Link, Navigate, useLocation } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import { useState, useContext, useEffect } from 'react'
import { FiUser } from 'react-icons/fi'
import ProfilePopup from "./ProfilePopup"

const Header = () => {

  const { pathname } = useLocation()

  if (pathname === '/user/login' || pathname === '/user/register') {
    return null
  }

  const { user } = useContext(AuthContext);

  const [openProfile, setOpenProfile] = useState(false)

  const [redirect, setRedirect] = useState(false)

  const handleProfileClick = () => {
    if (user.name === '') {
      setRedirect(true)
      return
    }
    setOpenProfile(!openProfile)
  }

  return (
    <nav className="bg-green-600 h-24 p-4">
      {redirect && <Navigate to={'/user/login'} />}
      <div className="flex justify-end items-center h-[100%] gap-5">
        {user.name !== '' && user.LCoins !== null &&
          <span className="text-white font-semibold">
            LC {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(user.LCoins / 100)}
          </span>
        }
        <div
          className="rounded-full bg-white p-[2px]">
          <div className="relative rounded-full bg-gray-200 w-8 h-8 text-center flex items-center justify-center">
            {user.name !== ''
              ? <span onClick={handleProfileClick}> {user.name.slice(0, 1)} </span>
              : <FiUser onClick={handleProfileClick} className="absolute" size={25} />
            }
            {openProfile && <ProfilePopup />}
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Header
