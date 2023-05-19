import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersInput } from './create.users.input';
import { UpdateUsersInput } from './update.users.input';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async getUser(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
        relations: [
          'favoriteExercises',
          'favoriteExercises.exercise',
          'trainings',
          'trainings.exercises.exercise',
        ],
      });

      return {
        ...user,
      };
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
        relations: [
          'favoriteExercises',
          'favoriteExercises.exercise',
          'trainings',
          'trainings.exercises.exercise',
        ],
      });
      return {
        ...user,
      };
    } catch (e) {
      return null;
    }
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: [
        'favoriteExercises',
        'favoriteExercises.exercise',
        'trainings',
        'trainings.exercises.exercise',
      ],
    });

    return users.map((item) => ({
      ...item,
    }));
  }

  async createUser(createUsersInput: CreateUsersInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: createUsersInput.email },
    });

    if (user) {
      throw new BadRequestException('Email is already in use');
    }

    const newUser = await this.userRepository.save({
      ...createUsersInput,
      password: await hash(createUsersInput.password, 3),
    });

    return {
      ...newUser,
    };
  }

  async updateUser(updateUsersInput: UpdateUsersInput): Promise<User> {
    const user = updateUsersInput.email
      ? await this.userRepository.findOne({
          where: { email: updateUsersInput.email },
        })
      : null;

    if (user && user.id !== updateUsersInput.id) {
      throw new BadRequestException('Email is already in use');
    }

    if (updateUsersInput.password) {
      updateUsersInput.password = hash(updateUsersInput.password);
    }

    const prevUser = await this.getUser(updateUsersInput.id);

    const newUser = await this.userRepository.save(
      {
        ...prevUser,
        ...updateUsersInput,
      },
      { reload: true },
    );

    return {
      ...newUser,
    };
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete(id);
    return id;
  }
}
