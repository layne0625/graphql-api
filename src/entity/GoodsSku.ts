import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { GoodsItem } from './GoodsItem'

@ObjectType()
class Attr {
  @Field()
  name: string

  @Field()
  value: string
}

@Entity()
@ObjectType()
export class GoodsSku {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field(type => [Attr])
  @Column('simple-json')
  attrs?: Attr[]

  @Field()
  @Column()
  price: number


  @Field({ nullable: true })
  @Column({ nullable: true })
  originPrice?: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  unit?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  image?: string

  @Field(type => Int)
  @Column()
  inventoryQuantity: number

  @Field(type => GoodsItem)
  @ManyToOne(type => GoodsItem, goodsItem => goodsItem.skuList)
  item: GoodsItem

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}