import { Query, Resolver, Mutation, Arg, FieldResolver, Args } from "type-graphql";
import { Repository, Like } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { GoodsItem } from '../entity/GoodsItem'
import { GoodsInput } from "./types/goods-input";
import { Category } from "../entity/Category";
import { QueryPagination } from './types/common'

@Resolver(of => GoodsItem)
export default class GoodsItemsResolver {
  constructor(
    @InjectRepository(GoodsItem) private readonly goodsItemRepository: Repository<GoodsItem>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) { }

  @Query(type => [GoodsItem])
  async getGoodsList(@Arg('params') params: QueryPagination) {
    const { pageNo, pageSize, keyword } = params
    const skip = (pageNo - 1) * pageSize
    const options = {
      relations: ['categories', 'skuList'],
      skip,
      take: pageSize,
      where: {
        name: Like(`%${keyword}%`)
      }
    }
    return await this.goodsItemRepository.find(options)
  }

  @Mutation(returns => GoodsItem)
  async addGoodsItem(@Arg('payload') payload: GoodsInput): Promise<GoodsItem> {
    const { categoriesIds, ...rests } = payload
    const categoryEntities = await this.categoryRepository.findByIds(categoriesIds)
    const goodsItem = this.goodsItemRepository.create(rests)
    goodsItem.categories = categoryEntities
    return await this.goodsItemRepository.save(goodsItem)
  }
}