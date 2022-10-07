"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WhatsappTemplateMessageSchema = exports.WhatsappTemplateMessage = void 0;
var graphql_1 = require("@nestjs/graphql");
var mongoose_1 = require("@nestjs/mongoose");
var whatsapp_template_message_button_entity_1 = require("./whatsapp-template-message-button.entity");
var whatsapp_template_message_category_enum_1 = require("./whatsapp-template-message-category.enum");
var whatsapp_template_message_language_enum_1 = require("./whatsapp-template-message-language.enum");
var whatsapp_template_message_parameter_entity_1 = require("./whatsapp-template-message-parameter.entity");
var whatsapp_template_message_status_enum_1 = require("./whatsapp-template-message-status.enum");
var WhatsappTemplateMessage = /** @class */ (function () {
    function WhatsappTemplateMessage() {
    }
    __decorate([
        (0, graphql_1.Field)(function () { return graphql_1.ID; })
    ], WhatsappTemplateMessage.prototype, "_id");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessage.prototype, "name");
    __decorate([
        (0, graphql_1.Field)(function () { return whatsapp_template_message_status_enum_1.WhatsappTemplateMessageStatusEnum; }),
        (0, mongoose_1.Prop)({ type: String, "default": whatsapp_template_message_status_enum_1.WhatsappTemplateMessageStatusEnum.Pending })
    ], WhatsappTemplateMessage.prototype, "status");
    __decorate([
        (0, graphql_1.Field)(function () { return whatsapp_template_message_category_enum_1.WhatsappTemplateMessageCategoryEnum; }),
        (0, mongoose_1.Prop)({ type: String })
    ], WhatsappTemplateMessage.prototype, "category");
    __decorate([
        (0, graphql_1.Field)(function () { return whatsapp_template_message_language_enum_1.WhatsappTemplateMessageLanguageEnum; }),
        (0, mongoose_1.Prop)({ type: String })
    ], WhatsappTemplateMessage.prototype, "language");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessage.prototype, "bodyText");
    __decorate([
        (0, graphql_1.Field)(function () { return [String]; }, { nullable: true }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessage.prototype, "exampleBodyText");
    __decorate([
        (0, graphql_1.Field)(function () { return whatsapp_template_message_parameter_entity_1.WhatsappTemplateMessageParameter; }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessage.prototype, "parameters");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessage.prototype, "footer");
    __decorate([
        (0, graphql_1.Field)(function () { return String; }, { nullable: true, description: 'Id get from qontak' }),
        (0, mongoose_1.Prop)({ type: String })
    ], WhatsappTemplateMessage.prototype, "whatsAppTemplateMessageID");
    __decorate([
        (0, graphql_1.Field)(function () { return [whatsapp_template_message_button_entity_1.WhatsappTemplateMessageComponent]; }),
        (0, mongoose_1.Prop)()
    ], WhatsappTemplateMessage.prototype, "buttons");
    WhatsappTemplateMessage = __decorate([
        (0, mongoose_1.Schema)({ timestamps: true }),
        (0, graphql_1.ArgsType)(),
        (0, graphql_1.ObjectType)()
    ], WhatsappTemplateMessage);
    return WhatsappTemplateMessage;
}());
exports.WhatsappTemplateMessage = WhatsappTemplateMessage;
exports.WhatsappTemplateMessageSchema = mongoose_1.SchemaFactory.createForClass(WhatsappTemplateMessage);
// WhatsappSchema.index({ email: 1 });
