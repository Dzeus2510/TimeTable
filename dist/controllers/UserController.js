"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
class UserController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getMongoRepository(User_1.User);
    }
}
exports.UserController = UserController;
