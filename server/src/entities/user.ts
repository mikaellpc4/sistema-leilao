import { v4 } from 'uuid';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  refreshTokens?: string[];
  role?: Role;
}

export default class User {
  private props: UserProps;

  constructor(props: UserProps) {
    // Se não possui ID se trata de um novo usuario
    if (!props.id) {
      // Utilizar formato de data Unix para maior compatibilidade entre varias DBs
      const finalProps = {
        // Criar o ID na propria API é recomendado no lugar de deixar a DB criar
        // Evita problemas em caso de troca de DB
        ...props, id: v4(),
      };
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
