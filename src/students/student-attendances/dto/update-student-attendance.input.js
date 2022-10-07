"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateStudentAttendanceInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var create_student_attendance_input_1 = require("./create-student-attendance.input");
// ${1 : PascalCase}
var UpdateStudentAttendanceInput = /** @class */ (function (_super) {
    __extends(UpdateStudentAttendanceInput, _super);
    function UpdateStudentAttendanceInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateStudentAttendanceInput = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], UpdateStudentAttendanceInput);
    return UpdateStudentAttendanceInput;
}((0, graphql_1.PartialType)(create_student_attendance_input_1.CreateStudentAttendanceInput, graphql_1.InputType)));
exports.UpdateStudentAttendanceInput = UpdateStudentAttendanceInput;