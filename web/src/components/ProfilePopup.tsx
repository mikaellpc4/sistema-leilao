import { useContext } from 'react'
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthProvider"

type ProfileModalProps = {
  isOpen: boolean,
  closeModal: () => void
}

const ProfileModal = ({ isOpen, closeModal }: ProfileModalProps) => {
  if (!isOpen) return null
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="absolute bg-gray-200 h-24 top-14 z-40 right-0 py-5 px-3 ">
      <div className='absolute -top-2 right-[3%] bg-gray-200 w-5 h-5 rotate-45'></div>
      <ul className='w-32 h-[100%] flex flex-col items-center justify-center font-bold gap-3'>
        {user.role === 'ADMIN' && <Link to='/admin' onClick={closeModal}> Adicionar LCoins </Link>}
        <a onClick={() => { logout(); closeModal() }} > Logout </a>
      </ul>
    </div>
  )
}

export default ProfileModal
