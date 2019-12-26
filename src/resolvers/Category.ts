import { Query, Resolver, Mutation, Arg, Int, FieldResolver, Root } from 'type-graphql'
import { Category } from '../entity/Category'
import { CategoryInput } from './types/category-input'
import { ObjectID, Equal } from 'typeorm'

@Resolver(of => Category)
export default class CategoryParent {
  @Query(returns => [Category])
  async getAllCategory(): Promise<Category[]> {
    return await Category.find({ relations: ["parent"] })
  }

  @Mutation(returns => Category) 
  async addCategory(@Arg('payload') payload: CategoryInput): Promise<Category> {
    const { parentId } = payload
    const newItem = Category.create(payload)
    if (parentId) {
      const parent = await Category.findOne(parentId)
      newItem.parent = parent
    }
    return newItem.save()
  }

  @FieldResolver(() => [Category])
  async children(@Root() category: Category): Promise<Category[]> {
    return await Category.find({ where: { parent: category } })
  }
}