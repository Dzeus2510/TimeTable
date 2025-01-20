"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Category_1 = require("./entities/Category");
const Event_1 = require("./entities/Event");
const Task_1 = require("./entities/Task");
const User_1 = require("./entities/User");
dotenv_1.default.config();
console.log("Entities:", Category_1.Category, Event_1.Event, Task_1.Task, User_1.User);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    synchronize: true,
    logging: false,
    migrationsRun: true,
    entities: [Category_1.Category, Event_1.Event, Task_1.Task, User_1.User], // Explicitly list entities
    migrations: ["src/migration/*.ts"],
    useUnifiedTopology: true,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Entities loaded:", exports.AppDataSource.entityMetadatas.map(meta => meta.name));
})
    .catch((error) => console.error("Error:", error));
