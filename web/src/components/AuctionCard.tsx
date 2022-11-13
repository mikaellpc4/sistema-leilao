import { useEffect, useState } from 'react'
import GetEndingAt from '../services/GetEndingAt'

const AuctionCard = ({ props }: auctions) => {

  const createdAt = new Date(props.createdAt * 1000).toLocaleDateString()

  const [endingIn, setEndingIn] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  })

  const isFinished = (time: { days: string, hours: string, minutes: string, seconds: string }) => {
    let finished = false;
    Object.keys(time)
      .forEach(key => {
        if(parseInt(time[key as keyof typeof time]) < 0) finished = true
      })
    return finished
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEndingIn(GetEndingAt(props.endAt))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg shadow-2xl border border-gray-200 w-auto pt-6">
      <div className='flex items-center justify-center'>
        <img className='' src={props.imageLink} />
      </div>
      <hr />
      <div className="px-4">
        <div className="flex flex-col">
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
              ? <span> Este leilão se encerrou </span>
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
          {props.actualBid !== null && props.actualBid > 0
            ?
            <>
              <span className="text-purple-400 text-[1.15rem]"> {props.buyerName} </span>
              <span className="text-yellow-400 text-[1.15rem]"> {props.actualBid} </span>
            </>
            :
            <span className='font-normal text-md'> Nenhum lance foi feito </span>
          }
        </div>
      </div>
      <div className={`${isFinished(endingIn) ? 'bg-gray-400' : 'bg-green-400'} h-12 rounded-b-lg flex justify-center`}>
        <button className="text-white text-lg w-[100%]" disabled={isFinished(endingIn)} > Dar Lance </button>
      </div>
    </div>
  )
}
export default AuctionCard
