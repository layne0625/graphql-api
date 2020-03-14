import { InputType, Field, ID } from 'type-graphql'
import { GoodsItem } from '../../entity/GoodsItem'

@InputType()
export class GoodsInput implements Partial<GoodsItem> {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(type => [ID])
  categoriesIds: []
}