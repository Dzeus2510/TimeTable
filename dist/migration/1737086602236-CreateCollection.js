"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCollection1737086602236 = void 0;
class CreateCollection1737086602236 {
    async up(queryRunner) {
        // Create the collections explicitly
        const mongoDriver = queryRunner.connection.driver;
        const db = mongoDriver.databaseConnection;
        if (db) {
            // Ensure collections are created if they don't exist
            await db.createCollection("category");
            await db.createCollection("event");
            await db.createCollection("task");
            await db.createCollection("user");
            console.log("Collections created: category, event, task, user");
        }
        else {
            throw new Error("Failed to access MongoDB connection.");
        }
    }
    async down(queryRunner) {
        const mongoDriver = queryRunner.connection.driver; // Explicitly cast to any if using TypeORM < 0.3.x
        const db = mongoDriver.databaseConnection;
        if (db) {
            // Drop collections
            await db.dropCollection("category");
            await db.dropCollection("event");
            await db.dropCollection("task");
            await db.dropCollection("user");
            console.log("Collections dropped: category, event, task, user");
        }
        else {
            throw new Error("Failed to access MongoDB connection.");
        }
    }
}
exports.CreateCollection1737086602236 = CreateCollection1737086602236;
