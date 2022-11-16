import { useEffect, useState } from 'react'
import UseAuth from '../context/UseAuth'
import GetEndingAt from '../services/GetEndingAt'
import BidModal from './BidModal'

const AuctionCard = ({ props }: IAuctions) => {

  const [endingIn, setEndingIn] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  })

  const [createdAt, setCreatedAt] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [bidValue, setBidValue] = useState('')
  const [minimumBidValue, setMinimumBidValue] = useState('')

  const [modalOpen, setModalOpen] = useState(false)

  const isFinished = (time: { days: string, hours: string, minutes: string, seconds: string }) => {
    let finished = false;
    Object.keys(time)
      .forEach(key => {
        if (parseInt(time[key as keyof typeof time]) < 0) finished = true
      })
    return finished
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEndingIn(GetEndingAt(props.endAt))
    }, 1000)
    setCreatedAt(new Date(props.createdAt * 1000).toLocaleDateString())
    if (props.buyer) {
      const fullBuyerName = props.buyer?.name.split(' ')
      setBuyerName(`${fullBuyerName[0]} ${fullBuyerName[1]}`)
    }
    if (props.actualBid) {
      setBidValue(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(props.actualBid / 100))
    }
    if (props.minimumBid) {
      setMinimumBidValue(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(props.minimumBid / 100))
    }
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg shadow-2xl border border-gray-200 w-auto pt-6">
      <div className='flex items-center justify-center mb-3'>
        <img className='' src={props.imageLink} />
      </div>
      <hr />
      <div className="px-4">
        <div className="flex flex-col gap-4">
          <span className="text-[12px] text-gray-500 self-end"> Data do leilão: {createdAt} </span>
          <h2 className="text-xl font-bold"> {props.name} </h2>
        </div>
        <p> {props.description} </p>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="flex flex-col items-center font-bold">
          <h3 className="text-lg"> Tempo restante: </h3>
          <div>
            {isFinished(endingIn)
              ? <span className='font-normal'> Leilão encerrado </span>
              :
              <>
                <span className={`${parseInt(endingIn.days) <= 0 ? 'hidden' : ''} text-green-400 text-xl`}> {endingIn.days}D </span>
                <span className="text-green-400 text-xl">
                  {`${endingIn.hours}:${endingIn.minutes}:${endingIn.seconds}`}
                </span>
              </>
            }
          </div>
        </div>
        <div className="font-bold">
          <h3 className="text-lg"> Ultimo Lance: </h3>
          {props.buyer !== null
            ?
            <>
              <span className="text-purple-400 text-xl">
                {buyerName}
                <span className='text-yellow-400 text-lg'> {bidValue} </span>
              </span>
            </>
            :
            <>
              <span className='font-normal text-xl'>
                Lance minimo: <span className='text-yellow-400 font-bold'> {minimumBidValue} </span>
              </span>
            </>
          }
        </div>
      </div>
      <div className={`${isFinished(endingIn) ? 'bg-gray-400' : 'bg-green-400'} h-12 rounded-b-lg flex justify-center`}>
        <button className="text-white text-lg w-[100%]" disabled={isFinished(endingIn)} onClick={() => {
          const { auth } = UseAuth()
          if (auth?.user) {
            setModalOpen(true)
            return
          }
          
        }} >
          Dar Lance
        </button>
      </div>
      <BidModal isOpen={modalOpen} closeModal={
        () => setModalOpen(false)} auction={{ id: props.id, name: props.name, minimumBid: minimumBidValue, actualBid: bidValue }
        } />
    </div>
  )
}
export default AuctionCard
