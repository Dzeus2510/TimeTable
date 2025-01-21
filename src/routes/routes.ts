import { Router } from "express";
import { CategoryRoutes } from "./category.route";
import { UserRoutes } from "./user.route"; // Assuming you have a similar structure for user routes

const router = Router();

const registerRoutes = (routes) => {
    routes.forEach(route => {
        router[route.method](route.route, (req, res, next) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
                    .catch(err => next(err));
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
};

registerRoutes(CategoryRoutes);
registerRoutes(UserRoutes);

export default router;