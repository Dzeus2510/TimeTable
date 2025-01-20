import { ObjectId } from "mongodb";
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm";
import { Category } from "./category.model";

@Entity()
export class Event{
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    eventTitle: string

    @Column()
    eventDescription: string

    @Column({ type: 'date'})
    startDate: string

    @Column({ type: 'date'})
    endDate: Date

    @Column('time')
    startTime: Date

    @Column('time')
    endTime: Date

    @ManyToOne(() => Category, (category) => category._id)
    @JoinColumn({ name: 'categoryId' })
    category: Category
}