import { registerEnumType } from '@nestjs/graphql';
import { convertEnumToValuesMap } from 'src/common/helpers/enum-to-array-object.helper';

/**
 * Pending: This is when a business first submits a template that hasn’t yet been on-boarded and approved.
 * Approved: The template is approved to be sent on our platform.
 * Rejected: The template is rejected to be on-boarded to our platform.
 * Flagged: This is a warned state. When the quality rating reaches a low (red) state, the template is moved to a Flagged status. 
 * 		If the quality rating improves to a high (green) or medium (yellow) state over 7 days, the template returns to an Approved status.
 * Disabled: After a template enters Flagged Status, if the quality rating does not improve within 7 days, 
 * 		the template across all languages will be Disabled. When disabled, a template cannot be edited or used for sending messages.
 */

export enum WhatsappTemplateMessageStatusEnum {
	Pending = "Pending",
	Approved = "Approved",
	Rejected = "Rejected",
	Flagged = "Flagged",
	Disabled = "Disabled"
}

registerEnumType(WhatsappTemplateMessageStatusEnum, {

	name: 'WhatsappTemplateMessageStatusEnum',
	valuesMap: convertEnumToValuesMap(WhatsappTemplateMessageStatusEnum),

});