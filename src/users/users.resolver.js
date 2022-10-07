"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UsersResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var object_id_scalars_1 = require("../common/graphql/scalars/object-id.scalars");
var create_user_input_1 = require("./dto/create-user.input");
var get_users_args_1 = require("./dto/get-users.args");
var update_user_input_1 = require("./dto/update-user.input");
var users_list_object_1 = require("./dto/users-list.object");
var users_entity_1 = require("./entities/users.entity");
// ${1 : PascalCase}
// ${2 : camelCase}
var UsersResolver = /** @class */ (function () {
    //${1 : CapitalCase}
    //${2 : camelCase}
    function UsersResolver(usersService) {
        this.usersService = usersService;
    }
    UsersResolver.prototype.getUsers = function (query) {
        return this.usersService.find(query);
    };
    UsersResolver.prototype.findUserById = function (userId) {
        // findUser(@Args() query: GetUsersArgs) {
        return this.usersService.findById(userId);
    };
    UsersResolver.prototype.getUsersList = function (query) {
        return this.usersService.getUsersList(query);
    };
    UsersResolver.prototype.userCreate = function (body) {
        return this.usersService.create(body);
    };
    UsersResolver.prototype.userUpdate = function (userId, data) {
        return this.usersService.findByIdAndUpdate(userId, data, {
            "new": true
        });
    };
    UsersResolver.prototype.userDelete = function (userId) {
        return this.usersService.findByIdAndDelete(userId);
    };
    __decorate([
        (0, graphql_1.Query)(function () { return [users_entity_1.User]; }, { name: 'users' }),
        __param(0, (0, graphql_1.Args)('query', { type: function () { return get_users_args_1.GetUsersArgs; } }))
    ], UsersResolver.prototype, "getUsers");
    __decorate([
        (0, graphql_1.Query)(function () { return users_entity_1.User; }, { name: 'user' }),
        __param(0, (0, graphql_1.Args)('userId', { type: function () { return object_id_scalars_1.ObjectIdScalar; } }))
    ], UsersResolver.prototype, "findUserById");
    __decorate([
        (0, graphql_1.Query)(function () { return users_list_object_1.UsersList; }, { name: 'usersList' }),
        __param(0, (0, graphql_1.Args)('query', { type: function () { return get_users_args_1.GetUsersArgs; } }))
    ], UsersResolver.prototype, "getUsersList");
    __decorate([
        (0, graphql_1.Mutation)(function () { return users_entity_1.User; }),
        __param(0, (0, graphql_1.Args)('data', { type: function () { return create_user_input_1.CreateUserInput; } }))
    ], UsersResolver.prototype, "userCreate");
    __decorate([
        (0, graphql_1.Mutation)(function () { return users_entity_1.User; }),
        __param(0, (0, graphql_1.Args)('userId', { type: function () { return object_id_scalars_1.ObjectIdScalar; } })),
        __param(1, (0, graphql_1.Args)('data', { type: function () { return update_user_input_1.UpdateUserInput; } }))
    ], UsersResolver.prototype, "userUpdate");
    __decorate([
        (0, graphql_1.Mutation)(function () { return users_entity_1.User; }),
        __param(0, (0, graphql_1.Args)('userId', { type: function () { return object_id_scalars_1.ObjectIdScalar; } }))
    ], UsersResolver.prototype, "userDelete");
    UsersResolver = __decorate([
        (0, graphql_1.Resolver)(function () { return users_entity_1.User; })
    ], UsersResolver);
    return UsersResolver;
}());
exports.UsersResolver = UsersResolver;
