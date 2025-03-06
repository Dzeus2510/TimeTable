import { TaskService } from '../services/task.service';

export class TaskController{
    private taskService: TaskService
        constructor() {
            this.taskService = new TaskService();
        }

    async getAllTask(Request, Response, NextFunction) {
        return this.taskService.getAllTask()
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
}