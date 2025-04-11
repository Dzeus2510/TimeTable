import { TaskController } from '../controllers/task.controller';

export const TaskRoutes = [
    {
        method: "get",
        route: "/task/all",
        controller: TaskController,
        action: "getAllTask"
    },{
        method: "get",
        route: "/task",
        controller: TaskController,
        action: "getUserTask"
    },{
        method: "get",
        route: "/task/:id",
        controller: TaskController,
        action: "getTask"
    },{
        method: "post",
        route: "/task",
        controller: TaskController,
        action: "saveTask"
    },{
        method: "post",
        route: "/task/:id",
        controller: TaskController,
        action: "updateTask"
    },{
        method: "delete",
        route: "/task/:id",
        controller: TaskController,
        action: "removeTask"
    },{
        method: "put",
        route: "/task/:id",
        controller: TaskController,
        action: "checkDone"
    }
]