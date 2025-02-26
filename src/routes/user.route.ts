import { UserController } from "../controllers/user.controller";

export const UserRoutes = [
    {
        method: "get",
        route: "/user",
        controller: UserController,
        action: "getAllUsers"
    },{
        method: "get",
        route: "/user/:id",
        controller: UserController,
        action: "getUser"
    },{
        method: "post",
        route: "/user/register",
        controller: UserController,
        action: "register"
    },{
        method: "post",
        route: "/user/login",
        controller: UserController,
        action: "login"
    },{
        method: "put",
        route: "/user/password/:id",
        controller: UserController,
        action: "changePassword"
    },{
        method: "put",
        route: "/user/:id",
        controller: UserController,
        action: "updateUser"
    },{
        method: "delete",
        route: "/user/logout",
        controller: UserController,
        action: "logout"
    }
]
