import { ObjectId } from "mongodb";
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Event{
    @ObjectIdColumn()
    eventId: ObjectId

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

    @ManyToOne(() => Category, (category) => category.categoryId)
    @JoinColumn({ name: 'categoryId' })
    category: Category
}