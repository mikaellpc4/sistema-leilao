interface auctions {
  props: {
    id: string,
    name: string,
    imageLink: string,
    description: string,
    minimumBid: number,
    actualBid: number | null,
    buyerName: string | null,
    soldTo: string | null,
    createdAt: number,
    endAt: number,
  }
}
