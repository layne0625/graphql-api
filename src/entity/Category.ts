import { ObjectType, Field, ID, Int } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

export enum CategoryLevel {
  first,
  second,
  third
}

@Entity()
@ObjectType()
export class Category {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field(type => Int, { defaultValue: CategoryLevel.first })
  @Column({ default: CategoryLevel.first })
  level: number

  @Field(type => Category, { nullable: true })
  @ManyToOne(type => Category, category => category.parent)
  parent?: Category

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string
}