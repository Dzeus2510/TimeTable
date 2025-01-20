import { CategoryController } from "../controllers/category.controller";

export const CategoryRoute = [
    {
        method: "get",
        route: "/category",
        controller: CategoryController,
        action: "all"
    },{
        method: "get",
        route: "/category/:input",
        controller: CategoryController,
        action: "one"
    },{
        method: "post",
        route: "/category",
        controller: CategoryController,
        action: "save"
    },{
        method: "put",
        route: "/category/:id",
        controller: CategoryController,
        action: "update"
    },{
        method: "delete",
        route: "/category/:id",
        controller: CategoryController,
        action: "delete"
    }
]