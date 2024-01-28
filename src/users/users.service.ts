// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Add implementation to create a new user
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    // Add implementation to find a user by email address
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    // Add implementation to find a user by id
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateOneById(id: number, user: User): Promise<User> {
    // Add implementation to update a user
    return this.usersRepository.save({ ...user, id });
  }
}
