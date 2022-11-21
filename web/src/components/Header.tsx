import { Navigate, useLocation } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import { useState, useContext } from 'react'
import { FiUser } from 'react-icons/fi'
import ProfileModal from "./ProfilePopup"
import normalizeMoney from "../services/normalizeMoney"

const Header = () => {

  const { pathname } = useLocation()

  if (pathname === '/user/login' || pathname === '/user/register') {
    return null
  }

  const { user } = useContext(AuthContext);

  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false)

  const [redirect, setRedirect] = useState(false)

  const handleProfileClick = () => {
    if (user.name === '') {
      setRedirect(true)
      return
    }
    setIsOpenProfileModal(!isOpenProfileModal)
  }

  return (
    <nav className="bg-green-600 h-24 p-4">
      {redirect && <Navigate to={'/user/login'} />}
      <div className="flex justify-end items-center h-[100%] gap-5">
        {user.name !== '' && user.LCoins !== null &&
          <span className="text-white font-semibold">
            LC {normalizeMoney(user.LCoins)}
          </span>
        }
        <div
          className="rounded-full bg-white p-[2px]">
          <div className="relative rounded-full bg-gray-200 w-8 h-8 text-center flex items-center justify-center">
            {user.name !== ''
              ? <span onClick={handleProfileClick}> {user.name.slice(0, 1)} </span>
              : <FiUser onClick={handleProfileClick} className="absolute" size={25} />
            }
            <ProfileModal isOpen={isOpenProfileModal} closeModal={() => setIsOpenProfileModal(false)} />
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Header
