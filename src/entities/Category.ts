import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Category{
    @ObjectIdColumn()
    categoryId: ObjectId

    @Column()
    categoryName: string
}
