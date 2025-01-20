import { ObjectId } from "mongodb"
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm"
import { Task } from "./task.model"

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, (task) => task.user)
    task: Task[]

}