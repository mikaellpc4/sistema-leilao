import { v4 } from 'uuid';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password?: string;
  LCoins?: number;
  refreshTokens?: string[];
  role?: Role;
}

export default class User {
  private props: UserProps;

  constructor(props: UserProps) {
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

  getEmail() {
    return this.props.email;
  }

  getPassword() {
    return this.props.password;
  }

  getRole() {
    return this.props.role;
  }

  getRefreshTokens() {
    return this.props.refreshTokens;
  }

  setRefreshTokens(refreshTokens: string[]) {
    this.props.refreshTokens = refreshTokens;
  }
}
