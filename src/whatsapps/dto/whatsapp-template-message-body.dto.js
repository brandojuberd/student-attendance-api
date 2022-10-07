"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WhatsappTemplateMessageBodyInput = exports.WhatsappTemplateMessageBodyArgs = void 0;
var graphql_1 = require("@nestjs/graphql");
var WhatsappTemplateMessageBodyArgs = /** @class */ (function () {
    function WhatsappTemplateMessageBodyArgs() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: "must be number with type of string" })
    ], WhatsappTemplateMessageBodyArgs.prototype, "key");
    __decorate([
        (0, graphql_1.Field)({ description: "must be in snake case, max length 16" })
    ], WhatsappTemplateMessageBodyArgs.prototype, "value");
    __decorate([
        (0, graphql_1.Field)({ description: "the text that will be show in whatsapp message" })
    ], WhatsappTemplateMessageBodyArgs.prototype, "value_text");
    WhatsappTemplateMessageBodyArgs = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageBodyArgs);
    return WhatsappTemplateMessageBodyArgs;
}());
exports.WhatsappTemplateMessageBodyArgs = WhatsappTemplateMessageBodyArgs;
var WhatsappTemplateMessageBodyInput = /** @class */ (function () {
    function WhatsappTemplateMessageBodyInput() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: "must be number with type of string" })
    ], WhatsappTemplateMessageBodyInput.prototype, "key");
    __decorate([
        (0, graphql_1.Field)({ description: "must be in snake case, max length 16" })
    ], WhatsappTemplateMessageBodyInput.prototype, "value");
    WhatsappTemplateMessageBodyInput = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageBodyInput);
    return WhatsappTemplateMessageBodyInput;
}());
exports.WhatsappTemplateMessageBodyInput = WhatsappTemplateMessageBodyInput;
