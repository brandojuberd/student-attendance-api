"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SendDirectMessageArgs = void 0;
var graphql_1 = require("@nestjs/graphql");
var whatsapp_template_message_parameter_dto_1 = require("./whatsapp-template-message-parameter.dto");
var SendDirectMessageArgs = /** @class */ (function () {
    function SendDirectMessageArgs() {
        this.countryCode = "62";
        this.toName = "";
    }
    __decorate([
        (0, graphql_1.Field)()
    ], SendDirectMessageArgs.prototype, "telephoneNumber");
    __decorate([
        (0, graphql_1.Field)({ defaultValue: "62" })
    ], SendDirectMessageArgs.prototype, "countryCode");
    __decorate([
        (0, graphql_1.Field)()
    ], SendDirectMessageArgs.prototype, "whatsAppTemplateMessageID");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "If not provided using default channel from BE" })
    ], SendDirectMessageArgs.prototype, "channelIntegrationID");
    __decorate([
        (0, graphql_1.Field)({ nullable: true, description: "receiver customer name", defaultValue: "" })
    ], SendDirectMessageArgs.prototype, "toName");
    __decorate([
        (0, graphql_1.Field)()
    ], SendDirectMessageArgs.prototype, "messageTopicName");
    __decorate([
        (0, graphql_1.Field)(function () { return whatsapp_template_message_parameter_dto_1.WhatsappTemplateMessageParameterArgs; })
    ], SendDirectMessageArgs.prototype, "parameters");
    SendDirectMessageArgs = __decorate([
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.InputType)()
    ], SendDirectMessageArgs);
    return SendDirectMessageArgs;
}());
exports.SendDirectMessageArgs = SendDirectMessageArgs;
