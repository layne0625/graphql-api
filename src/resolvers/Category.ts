import { Query, Resolver, Mutation, Arg, FieldResolver, Root } from 'type-graphql'
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Category } from '../entity/Category'
import { CategoryInput } from './types/category-input'

@Resolver(of => Category)
export default class CategoryParent {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}
  @Query(returns => [Category])
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ["parent"] })
  }

  @Mutation(returns => Category) 
  async addCategory(@Arg('payload') payload: CategoryInput): Promise<Category> {
    const { parentId } = payload
    const newItem = this.categoryRepository.create(payload)
    if (parentId) {
      const parent = await this.categoryRepository.findOne(parentId)
      newItem.parent = parent
    }
    return await this.categoryRepository.save(newItem)
  }

  @FieldResolver(() => [Category])
  async children(@Root() category: Category): Promise<Category[]> {
    return await this.categoryRepository.find({ where: { parent: category } })
  }
}