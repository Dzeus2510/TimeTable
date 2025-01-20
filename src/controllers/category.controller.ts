import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Category } from "../models/category.model";

export class CategoryController {
    private categoryRespository = AppDataSource.getRepository(Category)

    //return all categories
    async getAll(Response, Request, NextFunction){
        const categoryList = this.categoryRespository.find()
        if (categoryList == null){
            return "There are no Category"
        }
        return categoryList
    }

    //return one category by name or id
    async getOne(Request, Response, NextFunction){
        if(!Request.params.input){
            return "Input sth"
        }

        if(!ObjectId.isValid(Request.params.input)){
            const name = Request.params.input
            const category = await this.categoryRespository.find({
                where: { categoryName: name}})
            if (!category)
                return "No Category Found"
        return category
        }

        let objUid = new ObjectId(Request.params.input)

        const category = await this.categoryRespository.findOne({ where: { _id: objUid} })
        if (!category)
            return "No Category Found"

        return category
    }

    //create a new category
    async create(Request, Response, NextFunction){
        const { categoryName } = Request.body

        const category = Object.assign(new Category, {categoryName})

        return this.categoryRespository.save(category)
    }

    //update a category
    async update(Request, Response, NextFunction){
        const { categoryName } = Request.body

        let objUid = new ObjectId(Request.params.id)
        
        let categoryToUpdate = await this.categoryRespository.findOneBy({ _id: objUid })
        
        if(!categoryToUpdate)
            return "Category not Found"
        
        return this.categoryRespository.update(categoryToUpdate, { categoryName })
    }

    //delete a category
    async delete(Request, Response, NextFunction){
        let objUid = new ObjectId(Request.params.id)
        
        let categoryToDelete = await this.categoryRespository.findOneBy({ _id: objUid })
        
        if(!categoryToDelete)
            return "Category not Found"
        
        return this.categoryRespository.delete(categoryToDelete)
    }
}