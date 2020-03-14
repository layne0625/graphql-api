import { InputType, Field, ID, Int } from 'type-graphql'
import { GoodsSku } from '../../entity/GoodsSku'

@InputType()
class AttrInput {
  @Field()
  name: string

  @Field()
  value: string
}

@InputType()
export class SkuInput implements Partial<GoodsSku> {
  @Field()
  name: string

  @Field(type => [String])
  imgList: string[]

  @Field()
  price: number

  @Field({ nullable: true })
  originPrice?: number

  @Field({ nullable: true })
  description?: string

  @Field(type => ID)
  itemId: number

  @Field(type => Int, { nullable: true })
  inventoryQuantity?: number

  @Field(type => [AttrInput])
  attrs: AttrInput[]
}