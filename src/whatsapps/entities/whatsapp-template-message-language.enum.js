"use strict";
exports.__esModule = true;
exports.WhatsappTemplateMessageLanguageEnum = void 0;
var graphql_1 = require("@nestjs/graphql");
var enum_to_array_object_helper_1 = require("../../common/helpers/enum-to-array-object.helper");
var WhatsappTemplateMessageLanguageEnum;
(function (WhatsappTemplateMessageLanguageEnum) {
    WhatsappTemplateMessageLanguageEnum["English"] = "en";
    WhatsappTemplateMessageLanguageEnum["EnglishUS"] = "en_US";
    WhatsappTemplateMessageLanguageEnum["Filipino"] = "fil";
    WhatsappTemplateMessageLanguageEnum["Indonesian"] = "id";
    WhatsappTemplateMessageLanguageEnum["Malay"] = "ms";
    WhatsappTemplateMessageLanguageEnum["Thai"] = "th";
    WhatsappTemplateMessageLanguageEnum["PortugueseBR"] = "pt_BR";
})(WhatsappTemplateMessageLanguageEnum = exports.WhatsappTemplateMessageLanguageEnum || (exports.WhatsappTemplateMessageLanguageEnum = {}));
(0, graphql_1.registerEnumType)(WhatsappTemplateMessageLanguageEnum, {
    name: 'WhatsappTemplateMessageLanguageEnum',
    valuesMap: (0, enum_to_array_object_helper_1.convertEnumToValuesMap)(WhatsappTemplateMessageLanguageEnum)
});
