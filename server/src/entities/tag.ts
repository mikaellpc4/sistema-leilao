import { v4 } from 'uuid';

interface TagProps {
  id?: string;
  name: string;
  thumbnailLink: string;
}

export default class Tag {
  private props: TagProps;

  constructor(props: TagProps) {
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
