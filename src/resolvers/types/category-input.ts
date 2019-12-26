import { InputType, Field, Int, ID } from 'type-graphql'
import { Category, CategoryLevel } from '../../entity/Category'

@InputType()
export class CategoryInput implements Partial<Category>{
  @Field()
  name: string

  @Field(type => Int, { defaultValue: CategoryLevel.first })
  level?: number

  @Field(type => ID, { nullable: true })
  parentId?: number
}