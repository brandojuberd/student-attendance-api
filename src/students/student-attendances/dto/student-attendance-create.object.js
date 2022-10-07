"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StudentCheckInObject = void 0;
var graphql_1 = require("@nestjs/graphql");
var student_attendance_entity_1 = require("../entities/student-attendance.entity");
// ${1 : PascalCase}
// ${2 : camelCase}
// This used for return collection/model object with count field
//
// Example implementation check PaymentLoansListObject
var StudentCheckInObject = /** @class */ (function () {
    function StudentCheckInObject() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return student_attendance_entity_1.StudentAttendance; }, { nullable: true })
    ], StudentCheckInObject.prototype, "studentAttendance");
    __decorate([
        (0, graphql_1.Field)()
    ], StudentCheckInObject.prototype, "message");
    StudentCheckInObject = __decorate([
        (0, graphql_1.ObjectType)()
    ], StudentCheckInObject);
    return StudentCheckInObject;
}());
exports.StudentCheckInObject = StudentCheckInObject;
