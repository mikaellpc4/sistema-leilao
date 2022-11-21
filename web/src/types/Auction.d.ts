type Auction = {
  props: {
    id: string,
    name: string,
    imageLink: string,
    description: string,
    minimumBid: number,
    actualBid: number | null,
    buyerId: string | null,
    buyer: { id: string, name: string }
    soldTo: string | null,
    createdAt: number,
    endAt: number,
  }
}
