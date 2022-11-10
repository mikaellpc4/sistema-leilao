import { v4 } from 'uuid';
import Tag from './tag';
import User from './user';

interface AuctionProps {
  id?: string;
  name: string;
  imageLink: string;
  description: string;

  minimumBid: number;
  actualBid?: number;

  soldFor?: number;
  soldTo: User;

  createdAt: string;
  endAt: string;

  tag: Tag;
}

export default class Auction {
  private props: AuctionProps;

  constructor(props: AuctionProps) {
    if (!props.id) {
      const finalProps = { ...props, id: v4() };
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
}
