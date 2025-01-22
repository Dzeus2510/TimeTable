import * as bcrypt from "bcrypt";
import { ObjectId } from 'mongodb';
import { AppDataSource } from '../data-source';
import { User } from '../models/user.model';

export class UserService {
    private userRepository = AppDataSource.getMongoRepository(User)
    private saltRounds = 10

    private async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            return hashedPassword;
        } catch (error){
            throw new Error(`Error hashing password: ${error.message}`);
        }
    }
    
    private async invalidId(id: string): Promise<void> {
        if (!ObjectId.isValid(id)) {
            throw new Error("Please input valid ID")
        }
    }

    private async findUser(user): Promise<void> {
        if (user == null) {
            throw new Error("There are no User")
        }
        return user
    }

    private async checkInput(inputs : string[]): Promise<void> {
        for (let input of inputs) {
            if (!input) {
                throw new Error("Please input all fields")
            }
        }
    }

    private async checkUserExist(user): Promise<void> {
        if (user) {
            throw new Error("User already exists")
        }
    }

    private async checkPassword(password, userPassword): Promise<void> {
        if (!await bcrypt.compare(password, userPassword)){
            throw new Error("Incorrect Password")
        }
    }

    //return all users
    async getAll() {
        try{
            const userList = this.userRepository.find()
            return await this.findUser(userList)
        } catch (error) {
            throw new Error(`Error getting all users: ${error.message}`);
        }
    }

    //return one user by id
    async getOne(id: string) {
        try{
            await this.invalidId(id)

            let objUid = new ObjectId(id)
            const user = await this.userRepository.findOne({ where: { _id: objUid } })
    
            return await this.findUser(user)
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`);
        }
    }

    //register a new user
    async register(name : string , email : string, rawPassword : string) {
        try{
            await this.checkInput([name, email, rawPassword])

            const userExisted = await this.userRepository.findOne({ where: { email } })
            await this.checkUserExist(userExisted)

            const password = await this.hashPassword(rawPassword)
        
            const user = Object.assign(new User, {name, email, password})
            return this.userRepository.save(user)
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }

    //login
    async login(email: string, password: string) {
        try{
            await this.checkInput([email, password])

            const user = await this.userRepository.findOne({ where: { email } })
            await this.findUser(user)

            await this.checkPassword(password, user.password)
            return user
        } catch (error) {
            throw new Error(`Error logging in: ${error.message}`);
        }
    }

    //update user
    async update(id: string, name: string) {
        try{
            await this.invalidId(id)
            await this.checkInput([name])

            let objUid = new ObjectId(id)
            const user = await this.userRepository.findOne({ where: { _id: objUid } })
            await this.findUser(user)

            return this.userRepository.update({_id: objUid}, { name })
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    //change password
    async changePassword(id: string, oldPassword: string, newPassword: string) {
        try{
            await this.invalidId(id)
            await this.checkInput([oldPassword, newPassword])

            let objUid = new ObjectId(id)
            const user = await this.userRepository.findOne({ where: { _id: objUid } })
            await this.findUser(user)

            await this.checkPassword(oldPassword, user.password)
            const password = await this.hashPassword(newPassword)

            return this.userRepository.update({_id: objUid}, { password })
        } catch (error) {
            throw new Error(`Error changing password: ${error.message}`);
        }
    }
}