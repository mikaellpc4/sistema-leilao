import AuctionCard from "../components/AuctionCard"
import Carousel from "../components/Carousel"
import getServerSideProps from "../services/GetServerSideProps"


const Home = () => {
  const { data: auctions } = getServerSideProps<auctions[]>('/auctions')

  return (
    <div>
      <Carousel />
      <div className="px-5 py-6 flex flex-col gap-5">
        <h1 className='font-bold text-2xl'> Leilões em andamento </h1>
        {auctions?.map((auction) => {
          return (
            <AuctionCard key={auction.props.id} props={auction.props} />
          )
        })}
      </div>
    </div>
  )
}

export default Home
