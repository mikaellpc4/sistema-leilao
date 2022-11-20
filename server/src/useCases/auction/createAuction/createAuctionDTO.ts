type ICreateAuctionRequestDTO = {
  name: string;
  imageLink: string;
  description: string;

  minimumBid: number;

  endAt: number;
  tagId?: string;
}

export default ICreateAuctionRequestDTO;
