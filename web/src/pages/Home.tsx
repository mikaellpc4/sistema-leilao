import React, { useEffect, Fragment } from 'react'
import AuctionCard from "../components/AuctionCard"
import Carousel from "../components/Carousel"
import { useInfiniteQuery } from '@tanstack/react-query'
import Api from "../services/Api"
import { AiOutlineLoading } from "react-icons/ai"
import { useInView } from 'react-intersection-observer'


const Home = () => {
  const { ref, inView } = useInView()
  const { data, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery(['auctions'], async ({ pageParam = '' }) => {
    const res = await Api.get<Auction[]>(`/auctions?limit=5&cursor=${pageParam}`)
    return res
  }, {
    getNextPageParam: (lastPage, data) => {
      const lastQuery = data[data.length - 1]
      if (lastQuery.length === 0) {
        return undefined
      }
      const lastAuction = lastPage[lastPage.length - 1]
      return lastAuction.props.id
    }, staleTime: 1000 * 120 // 2 minute
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

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
            {data.pages.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group.map((auction) => {
                    return (
                      <AuctionCard key={auction.props.id} props={auction.props} />
                    )
                  })}
                </Fragment>
              )
            })
            }
          </>
        }
        {isFetchingNextPage &&
          <div className="h-[10vh] flex items-center justify-center -mb-10">
            <AiOutlineLoading className='text-green-400 animate-[spin_.6s_linear_infinite]' size={30} />
          </div>
        }
        <br ref={ref} />
      </div>
    </div>
  )
}

export default Home
