import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

export class CategoryController {
    private categoryRespository = AppDataSource.getRepository(Category)
    async all(Response, Request, NextFunction){
        const categoryList = this.categoryRespository.find()
        if (categoryList == null){
            return "There are no Category"
        }
        return categoryList
    }

    async one(Request, Response, NextFunction){
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

        const category = await this.categoryRespository.findOne({ where: { categoryId: objUid} })
        if (!category)
            return "No Category Found"

        return category
    }

    async save(Request, Response, NextFunction){
        const { categoryName } = Request.body

        const category = Object.assign(new Category, {categoryName})

        return this.categoryRespository.save(category)
    }
}