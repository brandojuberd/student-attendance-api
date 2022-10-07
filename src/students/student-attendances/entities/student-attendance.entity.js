"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentAttendanceSchema = exports.ReadStudentAttendanceInput = exports.UpsertStudentAttendanceInput = exports.StudentAttendance = void 0;
var graphql_1 = require("@nestjs/graphql");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_helper_1 = require("../../../common/helpers/mongoose.helper");
var student_entity_1 = require("../../entities/student.entity");
// Delete this guide before push ====
// ${1 : PascalCase} ex: OpenRequest
// ${2 : camelCase}  ex: openRequest
// Used for field with value object inside of model/collection
// Example implementation on User.membership field that have class UserMembership as its value
// ===================================
var StudentAttendance = /** @class */ (function () {
    function StudentAttendance() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return student_entity_1.Student; }),
        (0, mongoose_1.Prop)({ type: mongoose_helper_1.ObjectId, ref: student_entity_1.Student.name })
    ], StudentAttendance.prototype, "student");
    __decorate([
        (0, graphql_1.Field)(function () { return Date; }),
        (0, mongoose_1.Prop)({ type: Date })
    ], StudentAttendance.prototype, "checkIn");
    __decorate([
        (0, graphql_1.Field)(function () { return Date; }, { nullable: true }),
        (0, mongoose_1.Prop)({ type: Date })
    ], StudentAttendance.prototype, "checkOut");
    StudentAttendance = __decorate([
        (0, mongoose_1.Schema)(),
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.ObjectType)()
    ], StudentAttendance);
    return StudentAttendance;
}());
exports.StudentAttendance = StudentAttendance;
var UpsertStudentAttendanceInput = /** @class */ (function () {
    function UpsertStudentAttendanceInput() {
    }
    UpsertStudentAttendanceInput = __decorate([
        (0, graphql_1.InputType)()
    ], UpsertStudentAttendanceInput);
    return UpsertStudentAttendanceInput;
}());
exports.UpsertStudentAttendanceInput = UpsertStudentAttendanceInput;
// Usually used for query
// Rarely used
var ReadStudentAttendanceInput = /** @class */ (function () {
    function ReadStudentAttendanceInput() {
    }
    ReadStudentAttendanceInput = __decorate([
        (0, graphql_1.InputType)()
    ], ReadStudentAttendanceInput);
    return ReadStudentAttendanceInput;
}());
exports.ReadStudentAttendanceInput = ReadStudentAttendanceInput;
exports.StudentAttendanceSchema = mongoose_1.SchemaFactory.createForClass(StudentAttendance);
