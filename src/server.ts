import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes/routes";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/", routes);

app.get('/', (req, res) =>{
    res.send("Test Nodemon Server")
});

AppDataSource.initialize()
    .then(async () => {})
    .catch((error) => console.error("Error during Data Source initialization:", error));
    
app.listen(port, () => console.log(
    '[SERVER] server listening at port: ' + port
))
