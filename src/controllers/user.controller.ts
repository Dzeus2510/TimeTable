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
        Promise.resolve(this.userService.register(name, email, password))
        return Response.status(201).json({message: "User created Successfully"})
    }

    async login(Request, Response, NextFunction){
        try{
            const { email, password } = Request.body
            const result = await this.userService.login(email, password)
            return Response.status(200).json({
                message: "Logged in",
                user: result.user,
                token: result.token
            })
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

            if (!verified) {
                return Response.status(401).json({ message: "Unauthorized" });
            }
            await this.userService.removeToken(verified.id, token)
            return Response.status(200).json({message: "Logged out"})
        } catch (error) {
            return Response.status(400).json({message: error.message})
        }
    }

    async getUserSessions(Request, Response, NextFunction){
        try {
            const token = Request.headers.authorization.split(' ')[1];
            const verified = await this.userService.verifyToken(token)
            if (!verified) {
                return Response.status(401).json({message: "Invalid token"});
            }
            const sessions = await this.userService.getUserSessions(verified.id);
            return Response.status(200).json({sessions: sessions.length})
        } catch (error) {
            return Response.status(400).json({message: error.message})
        }
    }
        
        // Add endpoint to logout from all devices
    async logoutAll(Request, Response, NextFunction){
        try {
            const token = Request.headers.authorization.split(' ')[1];
            const verified = await this.userService.verifyToken(token)
            if (!verified) {
                return Response.status(401).json({message: "Invalid token"});
            }
            await this.userService.removeAllTokens(verified.id)
            return Response.status(200).json({message: "Logged out from all devices"})
        } catch (error) {
            return Response.status(400).json({message: error.message})
        }
    }
}
