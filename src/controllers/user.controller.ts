import { UserService } from "../services/user.service";

export class UserController{
    private userService: UserService
        constructor() {
            this.userService = new UserService();
        }
    
    //return all users
    async getAll(Request, Response, NextFunction){
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
}
