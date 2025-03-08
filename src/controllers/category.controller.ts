import { CategoryService } from "../services/category.service";

export class CategoryController {
    private categoryService: CategoryService
    constructor() {
        this.categoryService = new CategoryService();
    }

    //return all categories
    async getAllCategory(Response, Request, NextFunction){
        return this.categoryService.getAllCategory()
    }

    //return one category by name or id
    async getCategory(Request, Response, NextFunction){
        return this.categoryService.getCategory(Request.params.input)
    }

    //create a new category
    async createCategory(Request, Response, NextFunction){
        const { categoryName } = Request.body
        return Promise.resolve(this.categoryService.create(categoryName))
    }

    //update a category
    async updateCategory(Request, Response, NextFunction){
        const { categoryName } = Request.body
        return Promise.resolve(this.categoryService.update(Request.params.id, categoryName))
    }

    //delete a category
    async deleteCategory(Request, Response, NextFunction){
        return Promise.resolve(this.categoryService.delete(Request.params.id))
    }
}