import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User } from '../entity/User'
import { AddUserInput } from './types/user-input'

@Resolver(of => User)
export default class UserResolver {
  @Query(returns => [User])
  async getUsers(): Promise<User[]> {
    return await User.find()
  }
  
  @Mutation(returns => User)
  addUser(@Arg('data') newUserOption: AddUserInput): Promise<User> {
    const recipe = User.create(newUserOption)
    return recipe.save()
  }
}