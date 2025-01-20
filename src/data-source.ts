import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Event } from "./entities/Event";
import { Task } from "./entities/Task";
import { User } from "./entities/User";

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

