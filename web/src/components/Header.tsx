import { Link, useLocation } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import { useState, useEffect,useContext } from 'react'
import { FiUser } from 'react-icons/fi'

const Header = () => {

  const { pathname } = useLocation()

  if (pathname === '/user/login' || pathname === '/user/register') {
    return null
  }

  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-green-600 h-24 p-4">
      <div className="flex justify-end items-center h-[100%] gap-5">
        {user.name !== '' &&
          <span className="text-white font-semibold"> LC {new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(user.LCoins / 100)} </span>
        }
        <div className="rounded-full bg-white p-[2px]">
          <div className="relative rounded-full bg-gray-200 w-8 h-8 text-center flex items-center justify-center">
            {user.name !== ''
              ? <span> {user.name.slice(0, 1)} </span>
              : <FiUser className="absolute" size={25} />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
