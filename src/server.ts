import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import * as Redis from "redis";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
        origin: 'http://localhost:5000', // Your React app URL
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))
const port = process.env.PORT || 3000;

app.use("/", routes);

app.get('/', (req, res) =>{
    res.send("Test Nodemon Server")
});

export const redisToken = Redis.createClient({});

redisToken.on('connect', () => {
    console.log('Redis client connected');
})

redisToken.on('error', (error) => {
    console.error('Redis not connected', error);
})


AppDataSource.initialize()
    .then(async () => {
        await redisToken.connect();
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));
    
app.listen(port, () => console.log(
    '[SERVER] server listening at port: ' + port
))
