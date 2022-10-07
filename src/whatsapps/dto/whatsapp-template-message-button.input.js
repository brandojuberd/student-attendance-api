"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WhatsappTemplateMessageButtonObject = exports.WhatsappTemplateMessageButtonArgs = exports.WhatsappTemplateMessageParameterButtonInput = exports.WhatsappTemplateMessageButtonInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var WhatsappTemplateMessageButtonInput = /** @class */ (function () {
    function WhatsappTemplateMessageButtonInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }) //'URL' / quick_reply
    ], WhatsappTemplateMessageButtonInput.prototype, "type");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: "to increase percentage to be approved and accelerate review time by Qontak input example" })
    ], WhatsappTemplateMessageButtonInput.prototype, "text");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true })
    ], WhatsappTemplateMessageButtonInput.prototype, "url");
    __decorate([
        (0, graphql_1.Field)(function () { return [String]; }, { nullable: true })
    ], WhatsappTemplateMessageButtonInput.prototype, "example");
    WhatsappTemplateMessageButtonInput = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageButtonInput);
    return WhatsappTemplateMessageButtonInput;
}());
exports.WhatsappTemplateMessageButtonInput = WhatsappTemplateMessageButtonInput;
var WhatsappTemplateMessageParameterButtonInput = /** @class */ (function () {
    function WhatsappTemplateMessageParameterButtonInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: "start from 0" })
    ], WhatsappTemplateMessageParameterButtonInput.prototype, "index");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: "type : url" })
    ], WhatsappTemplateMessageParameterButtonInput.prototype, "type");
    WhatsappTemplateMessageParameterButtonInput = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageParameterButtonInput);
    return WhatsappTemplateMessageParameterButtonInput;
}());
exports.WhatsappTemplateMessageParameterButtonInput = WhatsappTemplateMessageParameterButtonInput;
var WhatsappTemplateMessageButtonArgs = /** @class */ (function () {
    function WhatsappTemplateMessageButtonArgs() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: "start from 0" })
    ], WhatsappTemplateMessageButtonArgs.prototype, "index");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: "type : url" }) //'URL' / quick_reply
    ], WhatsappTemplateMessageButtonArgs.prototype, "type");
    __decorate([
        (0, graphql_1.Field)(function () { return String; })
    ], WhatsappTemplateMessageButtonArgs.prototype, "value");
    WhatsappTemplateMessageButtonArgs = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageButtonArgs);
    return WhatsappTemplateMessageButtonArgs;
}());
exports.WhatsappTemplateMessageButtonArgs = WhatsappTemplateMessageButtonArgs;
var WhatsappTemplateMessageButtonObject = /** @class */ (function () {
    function WhatsappTemplateMessageButtonObject() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return String; }) //'URL' / quick_reply
    ], WhatsappTemplateMessageButtonObject.prototype, "type");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { description: "Number / Link" })
    ], WhatsappTemplateMessageButtonObject.prototype, "text");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true })
    ], WhatsappTemplateMessageButtonObject.prototype, "url");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true })
    ], WhatsappTemplateMessageButtonObject.prototype, "phone_number");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true })
    ], WhatsappTemplateMessageButtonObject.prototype, "example");
    WhatsappTemplateMessageButtonObject = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.ObjectType)()
    ], WhatsappTemplateMessageButtonObject);
    return WhatsappTemplateMessageButtonObject;
}());
exports.WhatsappTemplateMessageButtonObject = WhatsappTemplateMessageButtonObject;
