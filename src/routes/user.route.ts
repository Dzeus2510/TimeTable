import { UserController } from "../controllers/user.controller";

export const UserRoute = [
    {
        method: "get",
        route: "/user",
        controller: UserController,
        action: "all"
    },{
        method: "get",
        route: "/user/:input",
        controller: UserController,
        action: "one"
    },{
        method: "post",
        route: "/user",
        controller: UserController,
        action: "save"
    },{
        method: "put",
        route: "/user/:id",
        controller: UserController,
        action: "update"
    },{
        method: "delete",
        route: "/user/:id",
        controller: UserController,
        action: "delete"
    }
]
