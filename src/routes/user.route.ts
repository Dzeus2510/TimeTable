import { UserController } from "../controllers/user.controller";

export const UserRoutes = [
    {
        method: "get",
        route: "/user",
        controller: UserController,
        action: "getAll"
    },{
        method: "get",
        route: "/user/:id",
        controller: UserController,
        action: "getOne"
    },{
        method: "post",
        route: "/user/register",
        controller: UserController,
        action: "register"
    },{
        method: "post",
        route: "/user",
        controller: UserController,
        action: "login"
    },{
        method: "delete",
        route: "/user/:id",
        controller: UserController,
        action: "delete"
    }
]
