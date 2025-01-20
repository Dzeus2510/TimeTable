import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Category{
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    categoryName: string
}
