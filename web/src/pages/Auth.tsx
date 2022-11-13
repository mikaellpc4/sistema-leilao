import { HiOutlineMail } from 'react-icons/hi'

const Auth = () => {
  return (
    <div className="bg-gray-200 w-[100vw] h-[100vh] flex flex-col items-center justify-center px-6 gap-8">
      <h2 className="text-xl font-bold"> Bem vindo </h2>
      <div className="flex flex-col w-[100%] gap-4">
        <div className='relative'>
          <input placeholder="E-mail" className="w-[100%] pl-14 h-14 rounded-lg" />
          <HiOutlineMail size={35} className='absolute top-2 left-3 text-gray-300'/>
        </div>
        <div className='relative'>
          <input placeholder="E-mail" className="w-[100%] pl-14 h-14 rounded-lg" />
          <HiOutlineMail size={35} className='absolute top-2 left-3 text-gray-300'/>
        </div>
      </div>
      <button className="bg-green-400 w-[100%] h-14 rounded-lg"> Entrar </button>
    </div>
  )
}

export default Auth
