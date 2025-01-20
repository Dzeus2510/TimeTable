import dotenv from "dotenv";
import express from "express";
import { ObjectId } from "mongodb";
import { AppDataSource } from "./data-source";
import { Category } from "./entities/Category";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send("Test Nodemon Server")
});

app.listen(port, () => console.log(
    '[SERVER] server listening at port: ' + port
))

AppDataSource.initialize()
    .then(async () => {
        /*console.log("Add New Category");
        const name = "testAdd3";
        const category = new Category();
        category.categoryName = name;
        await AppDataSource.getRepository(Category).save(category);
        console.log("Saved");*/

        console.log("Get all");
        const allCategories = await AppDataSource.getRepository(Category).find();
        console.log(allCategories);

        console.log("Get One by Name");
        const categoryName = "testAdd3";
        const foundNamedCategory = await AppDataSource.getRepository(Category).findOneBy({ categoryName });
        console.log("Found it by name: ", foundNamedCategory);

        console.log(foundNamedCategory.categoryId);

        console.log("Get One");
        let categoryId = foundNamedCategory.categoryId;
        console.log("Category ID", categoryId);
        const foundCategory = await AppDataSource.getRepository(Category).findOneBy({ categoryId: new ObjectId("678da78b33d10084b927fd44") });
        console.log("Found it", foundCategory);
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));