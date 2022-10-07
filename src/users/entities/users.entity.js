"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var graphql_1 = require("@nestjs/graphql");
var mongoose_1 = require("@nestjs/mongoose");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.ID; })
    ], User.prototype, "_id");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, mongoose_1.Prop)({ type: String })
    ], User.prototype, "username");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, mongoose_1.Prop)({ type: String })
    ], User.prototype, "role");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, mongoose_1.Prop)({ type: String })
    ], User.prototype, "password");
    User = __decorate([
        (0, mongoose_1.Schema)({ timestamps: true }),
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.ObjectType)()
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
