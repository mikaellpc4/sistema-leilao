import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className='flex flex-col w-auto h-[80vh] items-center justify-center bg-gray-200 gap-5'>
      <h1 className="font-bold text-2xl"> Está pagina não existe </h1>
      <Link className="underline text-lg" to='/'> Voltar para pagina inicial </Link>
    </div>
  )
}

export default NotFound
