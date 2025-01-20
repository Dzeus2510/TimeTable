import { CategoryController } from "./controllers/CategoryController";
import { UserController } from "./controllers/UserController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
},{
    method: "get",
    route: "/users/:input",
    controller: UserController,
    action: "one"
},{
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
},{
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update"
},{
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "delete"
},{
    method: "get",
    route: "/category",
    controller: CategoryController,
    action: "all"
},{
    method: "get",
    route: "/category/:id",
    controller: CategoryController,
    action: "one"
},{
    method: "post",
    route: "/category",
    controller: CategoryController,
    action: "save"
}
]
