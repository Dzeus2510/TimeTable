// External Dependencies
import * as dotenv from "dotenv";
import * as mongodb from "mongodb";
// Global Variables
export const collections: { user?: mongodb.Collection, category?: mongodb.Collection, task?: mongodb.Collection, event?: mongodb.Collection} = {}
// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
    const mongoUrl = process.env.MONGO_URL?.toString() || ""
    
    const client: mongodb.MongoClient = new mongodb.MongoClient(mongoUrl);
            
    await client.connect();
        
    const db: mongodb.Db = client.db(process.env.DB_NAME);
    const userCollectionName = process.env.USER_COLLECTION_NAME?.toString() || ""
    const categoryCollectionName = process.env.CATEGORY_COLLECTION_NAME?.toString() || ""
    const taskCollectionName = process.env.TASK_COLLECTION_NAME?.toString() || ""
    const eventCollectionName = process.env.EVENT_COLLECTION_NAME?.toString() || ""

    const userCollection: mongodb.Collection = db.collection(userCollectionName);
    const categoryCollection: mongodb.Collection = db.collection(categoryCollectionName);
    const taskCollection: mongodb.Collection = db.collection(taskCollectionName);
    const eventCollection: mongodb.Collection = db.collection(eventCollectionName);

    collections.user = userCollection;
    collections.category = categoryCollection;
    collections.task = taskCollection;
    collections.event = eventCollection;

        console.log(`Successfully connected to database: ${db.databaseName} and collection: $usersCollection.collectionName}`);
}