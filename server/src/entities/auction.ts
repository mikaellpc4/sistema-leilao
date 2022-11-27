import { v4 } from 'uuid';
import dayjs from 'dayjs';
import normalizeMoney from '@services/normalizeMoney';

interface AuctionProps {
  id?: string;
  name: string;
  imageLink: string;
  description: string;

  minimumBid: number;
  actualBid?: number | null;

  soldFor?: number | null;
  buyerId?: string | null;

  createdAt?: number | null;
  endAt: number;

  tagId?: string | null;
}

export default class Auction {
  private props: AuctionProps;

  constructor(props: AuctionProps) {
    if (!props.id) {
      let finalProps = {
        ...props,
        id: v4(),
        actualBid: null,
        soldFor: null,
        buyerId: null,
        createdAt: dayjs().unix(),
      };
      if (typeof props.tagId === 'undefined') {
        finalProps = { ...finalProps, tagId: null };
      }
      this.props = finalProps;
      return;
    }
    this.props = props;
  }

  getData() {
    return this.props;
  }

  getId() {
    return this.props.id;
  }

  getName() {
    return this.props.name;
  }

  getCreatedAt() {
    return this.props.createdAt;
  }
}
