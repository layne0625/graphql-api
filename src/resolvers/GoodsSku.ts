import { Query, Resolver, Mutation, Arg, ID } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { GoodsSku } from '../entity/GoodsSku'
import { GoodsItem } from '../entity/GoodsItem'
import { SkuInput } from './types/sku'


@Resolver(of => GoodsSku)
export default class GoodsSkuResolver {
  constructor(
    @InjectRepository(GoodsSku) private readonly skuRepository: Repository<GoodsSku>,
    @InjectRepository(GoodsItem) private readonly itemRepository: Repository<GoodsItem>
  ) { }

  // @Query(type => [GoodsSku])
  // async getSkuListByItemId(@Arg('itemId', type => ID) itemId: number): Promise<GoodsSku[]> {
  //   return await this.skuRepository.find({
  //     where: { itemId },
  //     relations: ['item']
  //   })
  // }

  @Mutation(returns => GoodsSku)
  async addGoodsSku(@Arg('payload') payload: SkuInput): Promise<GoodsSku> {
    const { itemId, ...rests } = payload
    const goodsItem = await this.itemRepository.findOne(itemId)
    if (goodsItem) {
      const sku = await this.skuRepository.create(rests)
      sku.item = goodsItem
      return this.skuRepository.save(sku)
    } else {
      return null
    }

  }
}