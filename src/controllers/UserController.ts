import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export class UserController{
    private userRepository = AppDataSource.getMongoRepository(User)
    
}
