"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WhatsappTemplateMessageComponent = void 0;
var graphql_1 = require("@nestjs/graphql");
var mongoose_1 = require("@nestjs/mongoose");
/**
 * Example from qontak
     *	"url": "https://lovecare.id/{{1}}",
        "text": "Ke Aplikasi",
        "type": "URL",
        "example": "[\"https://lovecare.id//redirect?redirect_url=lovecaremobile%3A%2F%2Fhome\"]"
     */
var WhatsappTemplateMessageComponent = /** @class */ (function () {
    function WhatsappTemplateMessageComponent() {
    }
    __decorate([
        (0, graphql_1.Field)(),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessageComponent.prototype, "type");
    __decorate([
        (0, graphql_1.Field)(),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessageComponent.prototype, "text");
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessageComponent.prototype, "url");
    __decorate([
        (0, graphql_1.Field)(function () { return [String]; }, { nullable: true }),
        (0, mongoose_1.Prop)({ type: [String] })
    ], WhatsappTemplateMessageComponent.prototype, "example");
    WhatsappTemplateMessageComponent = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.ObjectType)()
    ], WhatsappTemplateMessageComponent);
    return WhatsappTemplateMessageComponent;
}());
exports.WhatsappTemplateMessageComponent = WhatsappTemplateMessageComponent;
