"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Task.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Task.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Task.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('time'),
    __metadata("design:type", Date)
], Task.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('time'),
    __metadata("design:type", Date)
], Task.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Task.prototype, "isRepeat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Task.prototype, "repeatDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Task.prototype, "isDone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Task.prototype, "notifying", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.task),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User_1.User)
], Task.prototype, "user", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)()
], Task);
