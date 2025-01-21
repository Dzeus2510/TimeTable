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
        return this.userService.getOne(Request.params.input)
    }

    //register a new user
    async register(Request, Response, NextFunction){
        const { name, email, password } = Request.body
        return Promise.resolve(this.userService.register(name, email, password))
    }

    async login(Request, Response, NextFunction){
        const { email, password } = Request.body
        return Promise.resolve(this.userService.login(email, password))
    }
}
