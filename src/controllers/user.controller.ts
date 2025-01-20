import { AppDataSource } from "../data-source";
import { User } from "../models/user.model";

export class UserController{
    private userRepository = AppDataSource.getMongoRepository(User)
    
}
