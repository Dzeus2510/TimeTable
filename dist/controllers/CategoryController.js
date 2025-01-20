"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const mongodb_1 = require("mongodb");
const data_source_1 = require("../data-source");
const Category_1 = require("../entities/Category");
class CategoryController {
    constructor() {
        this.categoryRespository = data_source_1.AppDataSource.getRepository(Category_1.Category);
    }
    async all(Response, Request, NextFunction) {
        const categoryList = this.categoryRespository.find();
        if (categoryList == null) {
            return "There are no Category";
        }
        return categoryList;
    }
    async one(Request, Response, NextFunction) {
        if (!Request.params.input) {
            return "Input sth";
        }
        if (!mongodb_1.ObjectId.isValid(Request.params.input)) {
            const name = Request.params.input;
            const category = await this.categoryRespository.find({
                where: { categoryName: name }
            });
            if (!category)
                return "No Category Found";
            return category;
        }
        let objUid = new mongodb_1.ObjectId(Request.params.input);
        const category = await this.categoryRespository.findOne({ where: { categoryId: objUid } });
        if (!category)
            return "No Category Found";
        return category;
    }
    async save(Request, Response, NextFunction) {
        const { categoryName } = Request.body;
        const category = Object.assign(new Category_1.Category, { categoryName });
        return this.categoryRespository.save(category);
    }
}
exports.CategoryController = CategoryController;
