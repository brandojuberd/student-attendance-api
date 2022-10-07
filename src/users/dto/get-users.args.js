"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetUsersArgs = void 0;
var graphql_1 = require("@nestjs/graphql");
// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
var GetUsersArgs = /** @class */ (function () {
    function GetUsersArgs() {
    }
    __decorate([
        (0, graphql_1.Field)({ nullable: true })
    ], GetUsersArgs.prototype, "_id");
    GetUsersArgs = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], GetUsersArgs);
    return GetUsersArgs;
}());
exports.GetUsersArgs = GetUsersArgs;
