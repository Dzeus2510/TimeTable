import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Category } from "../models/category.model";
import { Validation } from "./validation";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category)
    private validation : Validation
        constructor() {
            this.validation = new Validation();
        }

    async getAllCategory() {
        try {
            const categoryList = this.categoryRepository.find()
            return await this.validation.findItem(categoryList)
        } catch (error) {
            throw new Error(`Error getting all category: ${error.message}`);
        }
    }

    async getCategory(id: string) {
        try {
            await this.validation.invalidId(id)

            let objUid = new ObjectId(id)
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })

            await this.validation.findItem(category)
        } catch (error) {
            throw new Error(`Error getting category: ${error.message}`);
        }
    }

    async getOneByName(name: string) {
        try {
            await this.validation.checkInput([name])
            const category = await this.categoryRepository.findOne({ where: { categoryName: name } })
            await this.validation.findItem(category)
        } catch (error) {
            throw new Error(`Error getting category: ${error.message}`);
        }
    }

    async create(categoryName: string) {
        try {
            await this.validation.checkInput([categoryName])

            const category = Object.assign(new Category, { categoryName })
            return this.categoryRepository.save(category)
        } catch (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }

    async update(id: string, categoryName: string) {
        try {
            await this.validation.checkInput([id, categoryName])
            await this.validation.invalidId(id)

            let objUid = new ObjectId(id)
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            await this.validation.findItem(category)

            return this.categoryRepository.update(category, { categoryName })
        } catch (error) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    }

    async delete(id: string) {
        try {
            await this.validation.invalidId(id)
            
            let objUid = new ObjectId(id)
            const category = await this.categoryRepository.findOne({ where: { _id: objUid } })
            await this.validation.findItem(category)

            return this.categoryRepository.delete(category)
        } catch (error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }
}