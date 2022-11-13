import { Link, useLocation } from "react-router-dom"

const Header = () => {

  const { pathname } = useLocation()

  if (pathname === '/user/login' || pathname === '/user/register') {
    return null
  }

  return (
    <nav className="bg-green-600 h-24 p-4">
      <div className="flex justify-end items-center h-[100%] gap-5">
        <span className="text-white font-semibold"> LC 3.00 </span>
        <div className="rounded-full bg-white p-[2px]">
          <div className="rounded-full bg-gray-200 w-8 h-8 text-center">
            <span className="leading-loose"> M </span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
