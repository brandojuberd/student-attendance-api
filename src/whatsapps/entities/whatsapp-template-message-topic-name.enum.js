"use strict";
exports.__esModule = true;
exports.WhatsappTemplateMessageNameEnum = void 0;
var graphql_1 = require("@nestjs/graphql");
var enum_to_array_object_helper_1 = require("../../common/helpers/enum-to-array-object.helper");
var WhatsappTemplateMessageNameEnum;
(function (WhatsappTemplateMessageNameEnum) {
    WhatsappTemplateMessageNameEnum["RequestReminderCustomer"] = "request_reminder_customer";
    WhatsappTemplateMessageNameEnum["RequestApprovedCustomer"] = "request_approved_customer";
    WhatsappTemplateMessageNameEnum["VisitReportingCustomer"] = "visit_reporting_customer";
    WhatsappTemplateMessageNameEnum["RequestOrderCustomer"] = "request_order_customer_v2";
    WhatsappTemplateMessageNameEnum["RequestOrderCaregiver"] = "request_order_caregiver";
    WhatsappTemplateMessageNameEnum["RequestPaidCustomer"] = "request_paid_customer";
    WhatsappTemplateMessageNameEnum["RequestPaidCaregiver"] = "request_paid_caregiver";
    WhatsappTemplateMessageNameEnum["RequestOrderCustomerType2"] = "request_order_customer_type2";
    WhatsappTemplateMessageNameEnum["RequestCancelledByCaregiverCustomer"] = "request_cancelledbycaregiver_customer";
    WhatsappTemplateMessageNameEnum["RequestApprovalReminderEmployee"] = "request_approval_reminder_employee";
    WhatsappTemplateMessageNameEnum["RequestPaymentReminderCustomer"] = "request_payment_reminder_customer";
    WhatsappTemplateMessageNameEnum["RequestOrderReminderCustomer"] = "request_order_reminder_customer";
    WhatsappTemplateMessageNameEnum["CsReview"] = "cs_review";
    //delete this enums
    // RequestOrderNotification = "request_order_notification",
    // RequestPaidNotification = "request_paid_notification",
})(WhatsappTemplateMessageNameEnum = exports.WhatsappTemplateMessageNameEnum || (exports.WhatsappTemplateMessageNameEnum = {}));
(0, graphql_1.registerEnumType)(WhatsappTemplateMessageNameEnum, {
    name: 'WhatsappTemplateMessageNameEnum',
    valuesMap: (0, enum_to_array_object_helper_1.convertEnumToValuesMap)(WhatsappTemplateMessageNameEnum)
});
