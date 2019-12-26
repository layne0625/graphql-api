import { InputType, Field } from 'type-graphql'
import { User } from '../../entity/User'

@InputType()
export class AddUserInput implements Partial<User>{
  @Field()
  name: string

  @Field({ nullable: true })
  nickname?: string

  @Field()
  phone: string
}