import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;

  // The Partial is used so that typescript does not say that some functions are missing.
  // With the Partial we mocke ONLY what we want to use (In this case find() and create())

  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a mock copy of the users service
    const users: UserEntity[] = [];
    mockUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as UserEntity;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        // If someone asks for (Provide: UserService) USERSERVICE, then use these values (UseValue: mockUsersService)
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Create a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Throws an error if user signs up with email that is in use', async () => {
    await service.signup('test@test.com', 'test');
    await expect(service.signup('test@test.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('Throws if signin is called with an unused email', async () => {
    await expect(service.signin('test@test.com', 'test')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Throws if an invalid password is provided', async () => {
    await service.signup('test@test.com', 'password');
    await expect(
      service.signin('test@test.com', 'password123'),
    ).rejects.toThrow(BadRequestException);
  });

  it('Returns a user if correct password is provided', async () => {
    await service.signup('test@test.com', 'test123');

    const user = await service.signin('test@test.com', 'test123');
    expect(user).toBeDefined();
  });
});
