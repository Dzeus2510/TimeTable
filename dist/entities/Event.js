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
exports.Event = void 0;
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
let Event = class Event {
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Event.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "eventTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "eventDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Event.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('time'),
    __metadata("design:type", Date)
], Event.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('time'),
    __metadata("design:type", Date)
], Event.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.categoryId),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", Category_1.Category)
], Event.prototype, "category", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
