import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Category } from "../models/category.model";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category)

    //return all categories
    async getAll() {
        try {
            const categoryList = this.categoryRepository.find()
            //return if no category found
            if (categoryList == null) {
                return "There are no Category"
            }
            return categoryList
        } catch (error) {
            return error
        }
    }

    //return one category by id
    async getOneById(id: string) {
        try {
            //check if input is empty
            if (!id) {
                return "Input something"
            }
            //check if input is a valid ObjectId
            if (!ObjectId.isValid(id)) {
                return "Please input a valid ID"
            }
            //change input to ObjectId
            let objUid = new ObjectId(id)
            //find category by id
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            //return if no category found
            if (!category)
                return "No Category Found"
            return category
        } catch (error) {
            return error
        }
    }

    //return one category by name
    async getOneByName(name: string) {
        try {
            //check if input is empty
            if (!name) {
                return "Input something"
            }
            //find category by name
            const category = await this.categoryRepository.findOne({ where: { categoryName: name } })
            //return if no category found
            if (!category)
                return "No Category Found"
            return category
        } catch (error) {
            return error
        }
    }

    //create a new category
    async create(categoryName: string) {
        try {
            //check if all fields are inputted
            if (!categoryName) {
                return "Please input all fields"
            }
            //create new category
            const category = Object.assign(new Category, { categoryName })
            return this.categoryRepository.save(category)
        } catch (error) {
            return error
        }
    }

    //update a category
    async update(id: string, categoryName: string) {
        try {
            //check if all fields are inputted
            if (!categoryName) {
                return "Please input all fields"
            }
            //check if input is empty
            if (!id) {
                return "Input something"
            }
            //check if input is a valid ObjectId
            if (!ObjectId.isValid(id)) {
                return "Invalid ID"
            }
            //change input to ObjectId
            let objUid = new ObjectId(id)
            //find category by id
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            //return if no category found
            if (!category)
                return "No Category Found"
            //update category
            return this.categoryRepository.update(category, { categoryName })
        } catch (error) {
            return error
        }
    }

    //delete a category
    async delete(id: string) {
        try {
            //check if input is empty
            if (!id) {
                return "Input something"
            }
            //check if input is a valid ObjectId
            if (!ObjectId.isValid(id)) {
                return "Invalid ID"
            }
            //change input to ObjectId
            let objUid = new ObjectId(id)
            //find category by id
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            //return if no category found
            if (!category)
                return "No Category Found"
            //delete category
            return this.categoryRepository.delete(category)
        } catch (error) {
            return error
        }
    }
}