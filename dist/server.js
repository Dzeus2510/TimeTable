"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const Category_1 = require("./entities/Category");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("Test Nodemon Server");
});
app.listen(port, () => console.log('[SERVER] server listening at port: ' + port));
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("Add New Category");
    const name = "testAdd";
    const category = new Category_1.Category();
    category.categoryName = name;
    await data_source_1.AppDataSource.getRepository(Category_1.Category).save(category);
    console.log("Saved");
    console.log("Get all");
    const allCategories = await data_source_1.AppDataSource.getRepository(Category_1.Category).find();
    console.log(allCategories);
    console.log("Get One");
    const categoryName = "testAdd";
    const foundCategory = await data_source_1.AppDataSource.getRepository(Category_1.Category).findOneBy({ categoryName });
    console.log("Found it", foundCategory);
})
    .catch((error) => console.error("Error during Data Source initialization:", error));
