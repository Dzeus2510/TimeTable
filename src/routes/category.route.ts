import { CategoryController } from "../controllers/category.controller";

export const CategoryRoutes = [
    {
        method: "get",
        route: "/category",
        controller: CategoryController,
        action: "getAll"
    },{
        method: "get",
        route: "/category/:input",
        controller: CategoryController,
        action: "getOne"
    },{
        method: "post",
        route: "/category",
        controller: CategoryController,
        action: "create"
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