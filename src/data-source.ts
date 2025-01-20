import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./models/category.model";
import { Event } from "./models/event.model";
import { Task } from "./models/task.model";
import { User } from "./models/user.model";

dotenv.config();

console.log("Entities:", Category, Event, Task, User);

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  entities: [Category, Event, Task, User], // Explicitly list entities
  migrations: [],
  useUnifiedTopology: true,
});

AppDataSource.initialize()
    .then(() => {
        console.log("Entities loaded:", AppDataSource.entityMetadatas.map(meta => meta.name));
    })
    .catch((error) => console.error("Error:", error));

