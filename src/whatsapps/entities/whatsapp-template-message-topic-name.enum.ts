import { registerEnumType } from '@nestjs/graphql';
import { convertEnumToValuesMap } from 'src/common/helpers/enum-to-array-object.helper';

export enum WhatsappTemplateMessageNameEnum {
  RequestReminderCustomer = 'request_reminder_customer', //deprecated
  RequestApprovedCustomer = 'request_approved_customer',
  VisitReportingCustomer = 'visit_reporting_customer',
  RequestOrderCustomer = 'request_order_customer_v2',
  RequestOrderCaregiver = 'request_order_caregiver',
  RequestPaidCustomer = 'request_paid_customer',
  RequestPaidCaregiver = 'request_paid_caregiver',
  RequestOrderCustomerType2 = 'request_order_customer_type2',
  RequestCancelledByCaregiverCustomer = 'request_cancelledbycaregiver_customer',
  RequestApprovalReminderEmployee = 'request_approval_reminder_employee',
  RequestPaymentReminderCustomer = 'request_payment_reminder_customer',
  RequestOrderReminderCustomer = 'request_order_reminder_customer',
  CsReview = 'cs_review',

  //delete this enums
  // RequestOrderNotification = "request_order_notification",
  // RequestPaidNotification = "request_paid_notification",
}

registerEnumType(WhatsappTemplateMessageNameEnum, {
  name: 'WhatsappTemplateMessageNameEnum',
  valuesMap: convertEnumToValuesMap(WhatsappTemplateMessageNameEnum),
});
