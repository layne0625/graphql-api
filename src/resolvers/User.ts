import { Query, Resolver, Mutation, Arg, createMethodDecorator } from "type-graphql";
import { Repository, getManager, EntitySchema } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from '../entity/User'
import { AddUserInput } from './types/user-input'

@Resolver(of => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(returns => [User])
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find()
  }

  @ValidateDuplicate(User, 'phone', '手机号已存在')
  @Mutation(returns => User)
  async addUser(@Arg('payload') newUserOption: AddUserInput): Promise<User> {
    const recipe = this.userRepository.create(newUserOption)
    return await this.userRepository.save(recipe)
  }
}

export function ValidateDuplicate(entity: Function, column?: string, errorMsg?: string) {
  return createMethodDecorator(async ({ args }, next) => {
      if (args.payload && args.payload[column]) {
        const entityManager = getManager()
        const item = await entityManager.find(entity, { where: { [column]: args.payload[column] } })
        if (item.length > 0) {
          throw new Error(errorMsg || '字段重复')
        }
      }
    return next()
  })
}