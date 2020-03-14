import { InputType, Int, Field } from 'type-graphql'

@InputType()
export class QueryPagination {
  @Field(type => Int, { defaultValue: 1 })
  pageNo: number

  @Field(type => Int, { defaultValue: 10 })
  pageSize: number

  @Field(type => String, { nullable: true })
  keyword?: string
}