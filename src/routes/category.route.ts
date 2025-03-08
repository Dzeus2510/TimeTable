import { CategoryController } from "../controllers/category.controller";

export const CategoryRoutes = [
    {
        method: "get",
        route: "/category",
        controller: CategoryController,
        action: "getAllCategory"
    },{
        method: "get",
        route: "/category/:input",
        controller: CategoryController,
        action: "getCategory"
    },{
        method: "post",
        route: "/category",
        controller: CategoryController,
        action: "createCategory"
    },{
        method: "put",
        route: "/category/:id",
        controller: CategoryController,
        action: "updateCategory"
    },{
        method: "delete",
        route: "/category/:id",
        controller: CategoryController,
        action: "deleteCategory"
    }
]