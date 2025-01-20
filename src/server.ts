import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import { Category } from "./models/category.model";

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

        /*console.log("Get One by Name");
        const categoryName = "testUpdate";
        const foundNamedCategory = await AppDataSource.getRepository(Category).findOneBy({ categoryName });
        console.log("Found it by name: ", foundNamedCategory);

        console.log("Get One");
        let id = foundNamedCategory._id;
        const foundCategory = await AppDataSource.getRepository(Category).findOneBy({ _id: id });
        console.log("Found it", foundCategory);

        console.log("Update");
        const newName = "testUpdate2.0";
        const updatedCategory = await AppDataSource.getRepository(Category).update(foundCategory, { categoryName: newName });
        console.log(allCategories)*/
    })
    .catch((error) => console.error("Error during Data Source initialization:", error));