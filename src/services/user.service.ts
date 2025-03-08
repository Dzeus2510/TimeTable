import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from 'mongodb';
import { AppDataSource } from '../data-source';
import { User } from '../models/user.model';
import { redisToken } from "../server";
import { Validation } from "./validation";

export class UserService {
    private userRepository = AppDataSource.getMongoRepository(User)
    private saltRounds = 10
    private validation: Validation
    constructor() {
        this.validation = new Validation();
    }

    private async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            return hashedPassword;
        } catch (error){
            throw new Error(`Error hashing password: ${error.message}`);
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

    public async verifyToken(token): Promise<any> {
        try{
            if(!token) {
                throw new Error("Access Denied")
            }
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const verified = jwt.verify(token, jwtSecretKey)
            const redis = await redisToken.get(verified.id, token)

            if (redis == null) {
                return null
            } else {
                return verified
            }
        }  catch (error) {
            throw new Error(`Error verifying token: ${error.message}`);
        }
    }

    private async generateToken(data): Promise<string> {
        try{
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(data, jwtSecretKey)
            const userid = data.id.toString()

            await redisToken.set(userid, token)
            return token
        }  catch (error) {
            throw new Error(`Error generating token: ${error.message}`);
        }
    }

    async getAll(token) {
        try{
            const verified = await this.verifyToken(token)
            const userList = this.userRepository.find()
            if (verified == null) {
                throw new Error("Access Denied")
            }
            return await this.validation.findItem(userList)
        } catch (error) {
            throw new Error(`Error getting all users: ${error.message}`);
        }
    }

    async getOne(id: string) {
        try{
            await this.validation.invalidId(id)

            let objUid = new ObjectId(id)
            const user = await this.userRepository.findOne({ where: { _id: objUid } })
            return await this.validation.findItem(user)
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`);
        }
    }

    async register(name : string , email : string, rawPassword : string) {
        try{
            await this.validation.checkInput([name, email, rawPassword])

            const userExisted = await this.userRepository.findOne({ where: { email } })
            await this.checkUserExist(userExisted)

            const password = await this.hashPassword(rawPassword)
        
            const user = Object.assign(new User, {name, email, password})
            return this.userRepository.save(user)
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }

    async login(email: string, password: string) {
        try{
            await this.validation.checkInput([email, password])

            const user = await this.userRepository.findOne({ where: { email } })
            await this.validation.findItem(user)

            await this.checkPassword(password, user.password)
            const token = await this.generateToken({id: user._id, email: user.email, name: user.name})
            console.log("Token: ", token)

            return user + token
        } catch (error) {
            throw new Error(`Error logging in: ${error.message}`);
        }
    }

    async update(id: string, name: string) {
        try{
            await this.validation.invalidId(id)
            await this.validation.checkInput([name])

            let objUid = new ObjectId(id)
            const user = await this.userRepository.findOne({ where: { _id: objUid } })
            await this.validation.findItem(user)

            return this.userRepository.update({_id: objUid}, { name })
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async changePassword(id: string, oldPassword: string, newPassword: string) {
        try{
            await this.validation.invalidId(id)
            await this.validation.checkInput([oldPassword, newPassword])

            let objUid = new ObjectId(id)
            const user = await this.userRepository.findOne({ where: { _id: objUid } })
            await this.validation.findItem(user)

            await this.checkPassword(oldPassword, user.password)
            const password = await this.hashPassword(newPassword)

            return this.userRepository.update({_id: objUid}, { password })
        } catch (error) {
            throw new Error(`Error changing password: ${error.message}`);
        }
    }

    async removeToken(userId: string): Promise<void> {
        try{
            await redisToken.del(userId);
        }  catch (error) {
            throw new Error(`Error removing token: ${error.message}`);
        }
    }

}