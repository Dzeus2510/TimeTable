import { ObjectId } from 'mongodb';
import { AppDataSource } from '../data-source';
import { Task } from '../models/task.model';
export class TaskService{
    private taskRepository = AppDataSource.getMongoRepository(Task)

    private async invalidId(id: string): Promise<void> {
        if (!ObjectId.isValid(id)) {
            throw new Error("Please input valid ID")
        }
    }

    private async findTask(task): Promise<void> {
        if (task == null) {
            throw new Error("There are no Task")
        }
        return task
    }

    private async checkInput(inputs : any[]): Promise<void> {
        for (let input of inputs) {
            if (!input) {
                throw new Error("Please input all fields")
            }
        }
    }

    async getAllTask() {
        try{
            const taskList = this.taskRepository.find()
            return await this.findTask(taskList)
        } catch (error) {
            throw new Error(`Error getting all tasks: ${error.message}`);
        }
    }

    async getTask(id: string) {
        try {
            await this.invalidId(id)

            let objUid = new ObjectId(id)
            const task = await this.taskRepository.findOne({ where: { _id: objUid } })
    
            return await this.findTask(task)
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
    }

    async saveTask(task: Task) {
        try {
            await this.checkInput([task.title, task.description, task.startDate, task.startTime, task.isRepeat, task.repeatDate, task.notifying])

            const taskList = await this.taskRepository.find(e => e.startDate == task.startDate)
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
            await this.invalidId(id)
            await this.checkInput([task.title, task.description, task.startDate, task.startTime, task.isRepeat, task.repeatDate, task.notifying])

            let objUid = new ObjectId(id)
            const updatedTask = await this.taskRepository.update(objUid, task)
            return updatedTask
        } catch (error) {
            throw new Error(`Error updating task: ${error.message}`);
        }
    }

    async removeTask(id: string) {
        try {
            await this.invalidId(id)

            let objUid = new ObjectId(id)
            const deletedTask = await this.taskRepository.delete(objUid)
            return deletedTask
        } catch (error) {
            throw new Error(`Error deleting task: ${error.message}`);
        }
    }
}
