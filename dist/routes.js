"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const CategoryController_1 = require("./controllers/CategoryController");
const UserController_1 = require("./controllers/UserController");
exports.Routes = [{
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:input",
        controller: UserController_1.UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save"
    }, {
        method: "put",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "update"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "delete"
    }, {
        method: "get",
        route: "/category",
        controller: CategoryController_1.CategoryController,
        action: "all"
    }, {
        method: "get",
        route: "/category/:id",
        controller: CategoryController_1.CategoryController,
        action: "one"
    }, {
        method: "post",
        route: "/category",
        controller: CategoryController_1.CategoryController,
        action: "save"
    }
];
