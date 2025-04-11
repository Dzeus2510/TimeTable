import { TaskService } from '../services/task.service';

export class TaskController{
    private taskService: TaskService
        constructor() {
            this.taskService = new TaskService();
        }

    async getAllTask(Request, Response, NextFunction) {
        return this.taskService.getAllTask()
    }

    async getUserTask(Request, Response, NextFunction) {
        const token = Request.headers.authorization.split(' ')[1]
        return this.taskService.getUserTask(token.userId)
    }

    async getTask(Request, Response, NextFunction) {
        return this.taskService.getTask(Request.params.id)
    }

    async saveTask(Request, Response, NextFunction) {
        return this.taskService.saveTask(Request.body)
    }

    async updateTask(Request, Response, NextFunction) {
        return this.taskService.updateTask(Request.params.id, Request.body)
    }

    async removeTask(Request, Response, NextFunction) {
        return this.taskService.removeTask(Request.params.id)
    }

    async checkDone(Request, Response, NextFunction){
        return this.taskService.checkDone(Request.params.id)
    }
}