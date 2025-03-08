import { ObjectId } from 'mongodb';
import { AppDataSource } from '../data-source';
import { Task } from '../models/task.model';
import { Validation } from './validation';

export class TaskService{
    private taskRepository = AppDataSource.getMongoRepository(Task)
    private validation : Validation
    constructor() {
        this.validation = new Validation();
    }

    async getAllTask() {
        try {
            const taskList = this.taskRepository.find()
            return await this.validation.findItem(taskList)
        } catch (error) {
            throw new Error(`Error getting all tasks: ${error.message}`);
        }
    }

    async getTask(id: string) {
        try {
            await this.validation.invalidId(id)

            let objUid = new ObjectId(id)
            const task = await this.taskRepository.findOne({ where: { _id: objUid } })
    
            return await this.validation.findItem(task)
        } catch (error) {
            throw new Error(`Error getting task: ${error.message}`);
        }
    }

    async validateTask(existTask: Task, newTask: Task){
        if (existTask.startTime <= newTask.startTime && newTask.startTime <= existTask.endTime ||
            existTask.startTime <= newTask.endTime && newTask.endTime <= existTask.endTime ||
            newTask.startTime <= existTask.startTime && existTask.endTime <= newTask.endTime) {
            throw new Error("There's already a task: " + existTask.title + " on " + existTask.startTime + " - " + existTask.endTime)
        }
        if ( newTask.startTime >= newTask.endTime) {
            throw new Error("Invalid time")
        }
    }

    async saveTask(task: Task) {
        try {
            await this.validation.checkInput([task.title, task.description, task.startDate, task.startTime, task.endTime, task.isRepeat, task.notifying])
            const taskList = await this.taskRepository.find({where : {startDate : task.startDate}})
            for (let existTask of taskList) {
                await this.validateTask(existTask, task)
            }
            const newTask = await this.taskRepository.save(task)
            return newTask
        } catch (error) {
            throw new Error(`Error saving task: ${error.message}`);
        }
    }

    async updateTask(id: string, task: Task) {
        try {
            await this.validation.invalidId(id)
            await this.validation.checkInput([task.title, task.description, task.startDate, task.startTime, task.endTime, task.isRepeat, task.notifying])
            
            const taskList = await this.taskRepository.find(e => e.startDate == task.startDate && e._id != id)
            for (let existTask of taskList) {
                await this.validateTask(existTask, task)
            }

            let objUid = new ObjectId(id)
            const updatedTask = await this.taskRepository.update(objUid, task)
            return updatedTask
        } catch (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    }

    async removeTask(id: string) {
        try {
            await this.validation.invalidId(id)
            const objUid = new ObjectId(id)
            const task = await this.taskRepository.findOne({ where: { _id: objUid } })
            await this.validation.findItem(task)

            const deletedTask = await this.taskRepository.delete(objUid)
            return deletedTask
        } catch (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    }

    async checkDone(id: string){
        try{
            await this.validation.invalidId(id)
            const objUid = new ObjectId(id)
            const task = await this.taskRepository.findOne({ where: { _id: objUid } })
            await this.validation.findItem(task)

            task.isDone = true
            task.endTime = new Date()
            return await this.taskRepository.update(objUid, task)

        } catch (error) {
            throw new Error(`Error checking done task: ${error.message}`);
        }
    }

    //TODO: check validate task (no endTime)
}
