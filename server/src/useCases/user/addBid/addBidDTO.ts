type TAddBidRequestDTO = {
  auctionId: string,
  bidValue: number,
  bidUserId: string,
}

type TAddBidResponseDTO = {
  bidValue: number,
  newUserBalance: number
}

export { TAddBidRequestDTO, TAddBidResponseDTO };
