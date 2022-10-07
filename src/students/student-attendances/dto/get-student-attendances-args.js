"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GetStudentAttendancesArgs = void 0;
var graphql_1 = require("@nestjs/graphql");
var date_range_args_1 = require("../../../common/dto/date-range.args");
var object_id_scalars_1 = require("../../../common/graphql/scalars/object-id.scalars");
// ${1 : PascalCase}
// This used for query
// DO NOT FORGET TO DELETE 'extends PaginationArgs' if it is not used
var GetStudentAttendancesArgs = /** @class */ (function () {
    function GetStudentAttendancesArgs() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return object_id_scalars_1.ObjectIdScalar; }, { nullable: true })
    ], GetStudentAttendancesArgs.prototype, "student");
    __decorate([
        (0, graphql_1.Field)(function () { return date_range_args_1.DateRangeArgs; }, { nullable: true })
    ], GetStudentAttendancesArgs.prototype, "dateRange");
    GetStudentAttendancesArgs = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], GetStudentAttendancesArgs);
    return GetStudentAttendancesArgs;
}());
exports.GetStudentAttendancesArgs = GetStudentAttendancesArgs;
