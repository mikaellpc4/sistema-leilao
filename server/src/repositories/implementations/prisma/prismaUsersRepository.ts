import User from '@entities/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import IUserRepository from '@repositories/IUsersRepository';
import bcrypt from 'bcrypt';

import prisma from '@services/database';

export default class PrismaUserRepository implements IUserRepository {
  async getUserById(id: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        LCoins: true,
        role: true,
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
        email: email.toLowerCase(),
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
    } = user.getData() as {
      name: string,
      email: string,
      password: string
    };
    try {
      await prisma.users.create({
        data: {
          id,
          name,
          email: email.toLowerCase(),
          password,
          role,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        console.log(e.message);
      }
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        email: email.toLowerCase(),
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

  async addLCoins(userId: string, LCoins: number): Promise<void> {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        LCoins: {
          increment: LCoins,
        },
      },
    });
  }

  async removeCoins(userId: string, LCoins: number): Promise<void> {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        LCoins: {
          decrement: LCoins,
        },
      },
    });
  }

  async checkUserBalance(userId: string): Promise<number> {
    const { LCoins } = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        LCoins: true,
      },
    }) as { LCoins: number };
    return LCoins;
  }
}
