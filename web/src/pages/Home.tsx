import AuctionCard from "../components/AuctionCard"
import Carousel from "../components/Carousel"
import { useQuery } from '@tanstack/react-query'
import Api from "../services/Api"
import { AiOutlineLoading } from "react-icons/ai"


const Home = () => {
  const { data, isError, isFetching } = useQuery(['auctions'], () => Api.get<IAuction[]>('/auctions'), {
    staleTime: 1000 * 60 // 60 seconds
  })

  if (isError) return <span> Ocorreu um erro, tente novamente mais tarde </span>

  return (
    <div>
      <Carousel />
      <div className="px-3 py-6 flex flex-col gap-5">
        {!data
          ?
          <div className="w-[100%] h-[55vh] flex items-center justify-center">
            <AiOutlineLoading className='text-green-400 animate-[spin_.6s_linear_infinite]' size={80} />
          </div>
          :
          <>
            <h1 className='font-bold text-2xl'> Leilões em andamento </h1>
            {data?.map((auction) => {
              return (
                <AuctionCard key={auction.props.id} props={auction.props} />
              )
            })
            }
          </>
        }
      </div>
    </div>
  )
}

export default Home
