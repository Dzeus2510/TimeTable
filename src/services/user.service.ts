import * as bcrypt from "bcrypt";
import { ObjectId } from 'mongodb';
import { AppDataSource } from '../data-source';
import { User } from '../models/user.model';

export class UserService {
    private userRepository = AppDataSource.getMongoRepository(User)
    private saltRounds = 10

    //return all users
    async getAll() {
        const userList = this.userRepository.find()
        if (userList == null) {
            return "There are no User"
        }
        return userList
    }

    //return one user by id
    async getOne(id: string) {
        if (!id) {
            return "Input something"
        }

        if (!ObjectId.isValid(id)) {
            return "Invalid ID"
        }

        let objUid = new ObjectId(id)

        const user = await this.userRepository.findOne({ where: { _id: objUid } })
        if (!user)
            return "No User Found"

        return user
    }

    //register a new user
    async register(name : string , email : string, rawPassword : string) {
        console.log("Got here in register")
            //check if all fields are inputted
            if (!name || !email || !rawPassword){
                return "Please input all fields"
            }
            //check if user already exists
            console.log("Pass Name Email Password")
            if (await this.userRepository.findOne({ where: { email } })){
                return "User already exists"
            }
            console.log("Pass Exist User")
            //crypte password
            const password = await this.hashPassword(rawPassword)
            console.log( password ,"Pass Crypte Password")
            //create new user
            const user = Object.assign(new User, {name, email, password})
            console.log("all good")
            return this.userRepository.save(user)
    }

    private async hashPassword(password: string): Promise<string> {
        try {
        // Generate a salt
        const salt = await bcrypt.genSalt(this.saltRounds)
        // Hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
        }
        catch (error)
        {
        throw new Error(`Error hashing password: ${error.message}`);
        }
    }
    
    async login(email: string, password: string) {
        //check if all fields are inputted
        if (!email || !password){
            return "Please input all fields"
        }
        //check if user exists
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user){
            return "User not found"
        }
        //check if password is correct
        if (!await bcrypt.compare(password, user.password)){
            return "Incorrect Password"
        }
        return user
    }
}