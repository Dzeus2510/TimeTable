import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { CategoryRoutes } from "./category.route";
import { TaskRoutes } from "./task.route";
import { UserRoutes } from "./user.route";

const router = Router();

router.get("/protected-route", authMiddleware, (req, res) => {
    res.json({message: "Authenticated", userId: req.body.userId});
});

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
registerRoutes(TaskRoutes);

export default router;