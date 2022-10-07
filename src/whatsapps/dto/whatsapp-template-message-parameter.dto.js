"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WhatsappTemplateMessageParameterInput = exports.WhatsappTemplateMessageParameterArgs = void 0;
var graphql_1 = require("@nestjs/graphql");
var whatsapp_template_message_body_dto_1 = require("../dto/whatsapp-template-message-body.dto");
var whatsapp_template_message_button_input_1 = require("./whatsapp-template-message-button.input");
var WhatsappTemplateMessageParameterArgs = /** @class */ (function () {
    function WhatsappTemplateMessageParameterArgs() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return [whatsapp_template_message_body_dto_1.WhatsappTemplateMessageBodyArgs]; })
    ], WhatsappTemplateMessageParameterArgs.prototype, "body");
    __decorate([
        (0, graphql_1.Field)(function () { return [whatsapp_template_message_button_input_1.WhatsappTemplateMessageButtonArgs]; }, { nullable: true })
    ], WhatsappTemplateMessageParameterArgs.prototype, "buttons");
    WhatsappTemplateMessageParameterArgs = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageParameterArgs);
    return WhatsappTemplateMessageParameterArgs;
}());
exports.WhatsappTemplateMessageParameterArgs = WhatsappTemplateMessageParameterArgs;
var WhatsappTemplateMessageParameterInput = /** @class */ (function () {
    function WhatsappTemplateMessageParameterInput() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return [whatsapp_template_message_body_dto_1.WhatsappTemplateMessageBodyInput]; })
    ], WhatsappTemplateMessageParameterInput.prototype, "body");
    __decorate([
        (0, graphql_1.Field)(function () { return [whatsapp_template_message_button_input_1.WhatsappTemplateMessageParameterButtonInput]; }, { nullable: true })
    ], WhatsappTemplateMessageParameterInput.prototype, "buttons");
    WhatsappTemplateMessageParameterInput = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], WhatsappTemplateMessageParameterInput);
    return WhatsappTemplateMessageParameterInput;
}());
exports.WhatsappTemplateMessageParameterInput = WhatsappTemplateMessageParameterInput;
