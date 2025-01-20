import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCollection1737086602236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the collections explicitly
        const mongoDriver = queryRunner.connection.driver as any
        const db = mongoDriver.databaseConnection;

        if(db){
        // Ensure collections are created if they don't exist
        await db.createCollection("category");
        await db.createCollection("event");
        await db.createCollection("task");
        await db.createCollection("user");

        console.log("Collections created: category, event, task, user");
        } else {
            throw new Error("Failed to access MongoDB connection.");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const mongoDriver = queryRunner.connection.driver as any; // Explicitly cast to any if using TypeORM < 0.3.x
        const db = mongoDriver.databaseConnection;

        if (db) {
            // Drop collections
            await db.dropCollection("category");
            await db.dropCollection("event");
            await db.dropCollection("task");
            await db.dropCollection("user");

            console.log("Collections dropped: category, event, task, user");
        } else {
            throw new Error("Failed to access MongoDB connection.");
        }
    }

}
