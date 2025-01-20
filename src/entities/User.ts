import { ObjectId } from "mongodb"
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm"
import { Task } from "./Task"

@Entity()
export class User {
    @ObjectIdColumn()
    userId: ObjectId

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Task, (task) => task.user)
    task: Task[]

}