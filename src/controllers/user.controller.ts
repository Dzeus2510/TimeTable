import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";

export class UserController{
    private userService: UserService
        constructor() {
            this.userService = new UserService();
        }
    

    //verify token
    private async verifyToken(Request, Response): Promise<void> {
        try{
            const token = Request.headers.authorization.split(' ')[1];
            console.log("token: ", token)
            if(!token) {
                throw new Error("Access Denied")
            }
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const verified = jwt.verify(token, jwtSecretKey)
            console.log("verified: ", verified)
            return verified
        }  catch (error) {
            throw new Error(`Error verifying token: ${error.message}`);
        }
    }

    private async removeToken(Request, Response): Promise<void> {
        try{
            console.log(Request.headers.authorization)
            delete Request.headers.authorization
            console.log(Request.headers.authorization)
        }  catch (error) {
            throw new Error(`Error removing token: ${error.message}`);
        }
    }

    //return all users
    async getAll(Request, Response, NextFunction){
        await this.verifyToken(Request, Response)
        return this.userService.getAll()
    }

    //return one user by id
    async getOne(Request, Response, NextFunction){
        return this.userService.getOne(Request.params.id)
    }

    //register a new user
    async register(Request, Response, NextFunction){
        const { name, email, password } = Request.body
        return Promise.resolve(this.userService.register(name, email, password))
    }

    //login
    async login(Request, Response, NextFunction){
        const { email, password } = Request.body
        return Promise.resolve(this.userService.login(email, password))
    }

    //update
    async update(Request, Response, NextFunction){
        const id = Request.params.id
        const { name } = Request.body
        return Promise.resolve(this.userService.update(id, name))
    }

    //change password
    async changePassword(Request, Response, NextFunction){
        const id = Request.params.id
        const { oldPassword , newPassword } = Request.body
        return Promise.resolve(this.userService.changePassword(id, oldPassword, newPassword))
    }

    //logout
    async logout(Request, Response, NextFunction){
        try {
            console.log("Start logging out")
            this.removeToken(Request, Response)
            console.log(Request.headers.authorization)
            return "Logged out"
        } catch (error) {
            throw new Error(`Error logging out: ${error.message}`);
        }
    }
}
