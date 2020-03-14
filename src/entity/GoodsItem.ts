import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Category } from './Category'
import { GoodsSku } from './GoodsSku'

@ObjectType()
@Entity()
export class GoodsItem {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    mainImage?: string;

    @Field(type => [String], { nullable: true })
    @Column('simple-array', { nullable: true })
    images?: string[];

    @Field(type => [Category])
    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[]

    @Field(type => [GoodsSku], { nullable: true })
    @OneToMany(type => GoodsSku, goodsSku => goodsSku.item, { nullable: true })
    skuList?: GoodsSku[]

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

}
