"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
exports.connectToDatabase = connectToDatabase;
// External Dependencies
const dotenv = __importStar(require("dotenv"));
const mongodb = __importStar(require("mongodb"));
// Global Variables
exports.collections = {};
// Initialize Connection
async function connectToDatabase() {
    dotenv.config();
    const mongoUrl = process.env.MONGO_URL?.toString() || "";
    const client = new mongodb.MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const userCollectionName = process.env.USER_COLLECTION_NAME?.toString() || "";
    const categoryCollectionName = process.env.CATEGORY_COLLECTION_NAME?.toString() || "";
    const taskCollectionName = process.env.TASK_COLLECTION_NAME?.toString() || "";
    const eventCollectionName = process.env.EVENT_COLLECTION_NAME?.toString() || "";
    const userCollection = db.collection(userCollectionName);
    const categoryCollection = db.collection(categoryCollectionName);
    const taskCollection = db.collection(taskCollectionName);
    const eventCollection = db.collection(eventCollectionName);
    exports.collections.user = userCollection;
    exports.collections.category = categoryCollection;
    exports.collections.task = taskCollection;
    exports.collections.event = eventCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: $usersCollection.collectionName}`);
}
