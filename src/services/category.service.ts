import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Category } from "../models/category.model";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category)

    private async checkCategoryExist(category): Promise<void> {
        if (!category) {
            throw new Error("Category does not exists")
        }
        return category
    }

    private async checkInput(inputs: string[]): Promise<void> {
        for (let input of inputs) {
            if (!input) {
                throw new Error("Please input all fields")
            }
        }
    }

    private async invalidId(id: string): Promise<void> {
        if (!ObjectId.isValid(id)) {
            throw new Error("Please input valid ID")
        }
    }

    //return all categories
    async getAll() {
        try {
            const categoryList = this.categoryRepository.find()
            await this.checkCategoryExist(categoryList)
            return categoryList
        } catch (error) {
            return error
        }
    }

    //return one category by id
    async getOneById(id: string) {
        try {
            await this.invalidId(id)

            let objUid = new ObjectId(id)
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })

            await this.checkCategoryExist(category)
        } catch (error) {
            return error
        }
    }

    //return one category by name
    async getOneByName(name: string) {
        try {
            await this.checkInput([name])
            const category = await this.categoryRepository.findOne({ where: { categoryName: name } })
            await this.checkCategoryExist(category)
        } catch (error) {
            return error
        }
    }

    //create a new category
    async create(categoryName: string) {
        try {
            await this.checkInput([categoryName])

            const category = Object.assign(new Category, { categoryName })
            return this.categoryRepository.save(category)
        } catch (error) {
            return error
        }
    }

    //update a category
    async update(id: string, categoryName: string) {
        try {
            await this.checkInput([id, categoryName])
            await this.invalidId(id)

            let objUid = new ObjectId(id)
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            await this.checkCategoryExist(category)

            return this.categoryRepository.update(category, { categoryName })
        } catch (error) {
            return error
        }
    }

    //delete a category
    async delete(id: string) {
        try {
            await this.invalidId(id)
            
            let objUid = new ObjectId(id)
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            await this.checkCategoryExist(category)

            return this.categoryRepository.delete(category)
        } catch (error) {
            return error
        }
    }
}