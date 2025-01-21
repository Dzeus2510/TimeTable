import { CategoryService } from "../services/category.service";

export class CategoryController {
    private categoryService: CategoryService
    constructor() {
        this.categoryService = new CategoryService();
    }

    //return all categories
    async getAll(Response, Request, NextFunction){
        return this.categoryService.getAll()
    }

    //return one category by name or id
    async getOne(Request, Response, NextFunction){
        return this.categoryService.getOneById(Request.params.input)
    }

    //create a new category
    async create(Request, Response, NextFunction){
        const { categoryName } = Request.body
        Promise.resolve(this.categoryService.create(categoryName))
        return "Category Created"
    }

    //update a category
    async update(Request, Response, NextFunction){
        const { categoryName } = Request.body
        Promise.resolve(this.categoryService.update(Request.params.id, categoryName))
        return "Category Updated"
    }

    //delete a category
    async delete(Request, Response, NextFunction){
        Promise.resolve(this.categoryService.delete(Request.params.id))
        return "Category Deleted"
    }
}