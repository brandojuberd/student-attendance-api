"use strict";
exports.__esModule = true;
exports.WhatsappTemplateMessageCategoryEnum = void 0;
var graphql_1 = require("@nestjs/graphql");
var enum_to_array_object_helper_1 = require("../../common/helpers/enum-to-array-object.helper");
var WhatsappTemplateMessageCategoryEnum;
(function (WhatsappTemplateMessageCategoryEnum) {
    WhatsappTemplateMessageCategoryEnum["AccountUpdate"] = "ACCOUNT_UPDATE";
    WhatsappTemplateMessageCategoryEnum["PaymentUpdate"] = "PAYMENT_UPDATE";
    WhatsappTemplateMessageCategoryEnum["PersonalFinanceUpdate"] = "PERSONAL_FINANCE_UPDATE";
    WhatsappTemplateMessageCategoryEnum["ShippingUpdate"] = "SHIPPING_UPDATE";
    WhatsappTemplateMessageCategoryEnum["ReservationUpdate"] = "RESERVATION_UPDATE";
    WhatsappTemplateMessageCategoryEnum["IssueResolution"] = "ISSUE_RESOLUTION";
    WhatsappTemplateMessageCategoryEnum["AppointmentUpdate"] = "APPOINTMENT_UPDATE";
    WhatsappTemplateMessageCategoryEnum["TransportationUpdate"] = "TRANSPORTATION_UPDATE";
    WhatsappTemplateMessageCategoryEnum["TicketUpdate"] = "TICKET_UPDATE";
    WhatsappTemplateMessageCategoryEnum["AlertUpdate"] = "ALERT_UPDATE";
    WhatsappTemplateMessageCategoryEnum["AutoReply"] = "AUTO_REPLY";
})(WhatsappTemplateMessageCategoryEnum = exports.WhatsappTemplateMessageCategoryEnum || (exports.WhatsappTemplateMessageCategoryEnum = {}));
(0, graphql_1.registerEnumType)(WhatsappTemplateMessageCategoryEnum, {
    name: 'WhatsappTemplateMessageCategoryEnum',
    valuesMap: (0, enum_to_array_object_helper_1.convertEnumToValuesMap)(WhatsappTemplateMessageCategoryEnum)
});
