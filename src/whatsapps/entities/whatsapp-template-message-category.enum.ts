import { registerEnumType } from '@nestjs/graphql';
import { convertEnumToValuesMap } from 'src/common/helpers/enum-to-array-object.helper';

export enum WhatsappTemplateMessageCategoryEnum {

	AccountUpdate =	"ACCOUNT_UPDATE",
	PaymentUpdate =	"PAYMENT_UPDATE",
	PersonalFinanceUpdate =	"PERSONAL_FINANCE_UPDATE",
 	ShippingUpdate	= "SHIPPING_UPDATE",
	ReservationUpdate =	"RESERVATION_UPDATE",
	IssueResolution =	"ISSUE_RESOLUTION",
	AppointmentUpdate =	"APPOINTMENT_UPDATE",
	TransportationUpdate =	"TRANSPORTATION_UPDATE",
	TicketUpdate =	"TICKET_UPDATE",
	AlertUpdate =	"ALERT_UPDATE",
	AutoReply =	"AUTO_REPLY"
}

registerEnumType(WhatsappTemplateMessageCategoryEnum, {
	name: 'WhatsappTemplateMessageCategoryEnum',
	valuesMap: convertEnumToValuesMap(WhatsappTemplateMessageCategoryEnum),
});