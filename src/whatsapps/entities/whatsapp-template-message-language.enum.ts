import { registerEnumType } from '@nestjs/graphql';
import { convertEnumToValuesMap } from 'src/common/helpers/enum-to-array-object.helper';

export enum WhatsappTemplateMessageLanguageEnum {
	English = "en",
	EnglishUS = "en_US",
	Filipino = "fil",
	Indonesian = "id",
	Malay = "ms",
	Thai = "th",
	PortugueseBR = "pt_BR"
}

registerEnumType(WhatsappTemplateMessageLanguageEnum, {
	name: 'WhatsappTemplateMessageLanguageEnum',
	valuesMap: convertEnumToValuesMap(WhatsappTemplateMessageLanguageEnum),
});