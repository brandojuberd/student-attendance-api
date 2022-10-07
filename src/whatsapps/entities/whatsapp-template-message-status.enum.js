"use strict";
exports.__esModule = true;
exports.WhatsappTemplateMessageStatusEnum = void 0;
var graphql_1 = require("@nestjs/graphql");
var enum_to_array_object_helper_1 = require("../../common/helpers/enum-to-array-object.helper");
/**
 * Pending: This is when a business first submits a template that hasn’t yet been on-boarded and approved.
 * Approved: The template is approved to be sent on our platform.
 * Rejected: The template is rejected to be on-boarded to our platform.
 * Flagged: This is a warned state. When the quality rating reaches a low (red) state, the template is moved to a Flagged status.
 * 		If the quality rating improves to a high (green) or medium (yellow) state over 7 days, the template returns to an Approved status.
 * Disabled: After a template enters Flagged Status, if the quality rating does not improve within 7 days,
 * 		the template across all languages will be Disabled. When disabled, a template cannot be edited or used for sending messages.
 */
var WhatsappTemplateMessageStatusEnum;
(function (WhatsappTemplateMessageStatusEnum) {
    WhatsappTemplateMessageStatusEnum["Pending"] = "Pending";
    WhatsappTemplateMessageStatusEnum["Approved"] = "Approved";
    WhatsappTemplateMessageStatusEnum["Rejected"] = "Rejected";
    WhatsappTemplateMessageStatusEnum["Flagged"] = "Flagged";
    WhatsappTemplateMessageStatusEnum["Disabled"] = "Disabled";
})(WhatsappTemplateMessageStatusEnum = exports.WhatsappTemplateMessageStatusEnum || (exports.WhatsappTemplateMessageStatusEnum = {}));
(0, graphql_1.registerEnumType)(WhatsappTemplateMessageStatusEnum, {
    name: 'WhatsappTemplateMessageStatusEnum',
    valuesMap: (0, enum_to_array_object_helper_1.convertEnumToValuesMap)(WhatsappTemplateMessageStatusEnum)
});
