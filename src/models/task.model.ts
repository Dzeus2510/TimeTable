import { ObjectId } from "mongodb"
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm"
import { User } from "./user.model"

@Entity()
export class Task{
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'date'})
    startDate: Date

    @Column('time')
    startTime: Date

    @Column('time')
    endTime?: Date

    @Column()
    isRepeat: boolean

    @Column()
    repeatDate: string[]

    @Column()
    isDone?: boolean

    @Column()
    notifying: boolean

    @ManyToOne(() => User, (user) => user.task)
    @JoinColumn({ name: 'userId'})
    user: User
}