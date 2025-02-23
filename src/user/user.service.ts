import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  async createUser(createUserDto: any) {
    return await this.userRepository.createUser(createUserDto);
  }
}
