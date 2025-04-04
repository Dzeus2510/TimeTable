import { UserService } from "../services/user.service";

export class UserController{
    private userService: UserService
        constructor() {
            this.userService = new UserService();
        }
    

    async getAllUsers(Request, Response, NextFunction){
        const token = Request.headers.authorization.split(' ')[1]
        return this.userService.getAll(token)
    }

    async getUser(Request, Response, NextFunction){
        const token = Request.headers.authorization.split(' ')[1];
        await this.userService.verifyToken(token)
        return this.userService.getOne(Request.params.id)
    }

    async register(Request, Response, NextFunction){
        const { name, email, password } = Request.body
        return Promise.resolve(this.userService.register(name, email, password))
    }

    async login(Request, Response, NextFunction){
        try{
            const { email, password } = Request.body
            Promise.resolve(this.userService.login(email, password))
            return Response.status(200).json({message: "Logged in"}, Request.headers.authorization.split(' ')[1])
        } catch (error) {
            return Response.status(400).json({message: error.message})
        }
        
    }

    async updateUser(Request, Response, NextFunction){
        try{
            const id = Request.params.id
            const { name } = Request.body
            return Promise.resolve(this.userService.update(id, name))
        } catch (error) {
            return Response.status(400).json({message: error.message})
        }
    }

    async changePassword(Request, Response, NextFunction){
        try{
            const id = Request.params.id
            const { oldPassword , newPassword } = Request.body
            return Promise.resolve(this.userService.changePassword(id, oldPassword, newPassword))
        } catch (error) {
            return Response.status(400).json({message: error.message})
        }
    }

    async logout(Request, Response, NextFunction){
        try {
            const token = Request.headers.authorization.split(' ')[1];
            const verified = await this.userService.verifyToken(token)
            Promise.resolve(this.userService.removeToken(verified.id))
            return "Logged out"
        } catch (error) {
            throw new Error(`Error logging out: ${error.message}`);
        }
    }
}
