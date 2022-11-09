import User from '@entities/user';

interface IUsersRepository {
  // delete(email: string): Promise<void>
  // GetUser
  getUserById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUsers(): Promise<User[]>

  // Credentials
  save(user: User): Promise<void>
  login(email: string, password: string): Promise<User | null>

  // Tokens
  addRefreshToken(userId: string, refreshToken: string): Promise<void>
  removeRefreshToken(refreshToken: string): Promise<void>
}

export default IUsersRepository;
