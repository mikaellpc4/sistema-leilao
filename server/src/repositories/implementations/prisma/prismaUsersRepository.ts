import User from '@entities/user';
import IUserRepository from '@repositories/IUsersRepository';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class PrismaUserRepository implements IUserRepository {
  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return new User(user);
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return new User(user);
    }
    return null;
  }

  async getUsers(): Promise<User[]> {
    const users = await prisma.users.findMany();
    const findedUsers = users.map((user) => new User(user));
    return findedUsers;
  }

  async save(user: User): Promise<void> {
    const id = user.getId() as string;
    const role = user.getRole() as Role;
    const {
      name,
      email,
      password,
    } = user.getData();
    await prisma.users.create({
      data: {
        id,
        name,
        email,
        password,
        role,
      },
    });
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      const userPassword = user.password;
      const passwordsMatches = await bcrypt.compare(password, userPassword);
      if (passwordsMatches) {
        return new User(user);
      }
    }
    return null;
  }

  async addRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const { refreshTokens } = user;
      // Maximo de 5 sessões
      if (refreshTokens.length >= 5) {
        refreshTokens.shift();
      }
      refreshTokens.push(refreshToken);
      await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          refreshTokens: {
            set: refreshTokens,
          },
        },
      });
    }
  }

  async removeRefreshToken(refreshToken: string): Promise<void> {
    const user = await prisma.users.findFirst({
      where: {
        refreshTokens: {
          has: refreshToken,
        },
      },
    });
    if (user) {
      const { refreshTokens } = user;
      const tokenIndex = refreshTokens.indexOf(refreshToken);
      refreshTokens.splice(tokenIndex, 1);
      const userId = user.id;
      await prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          refreshTokens,
        },
      });
    }
  }
}
