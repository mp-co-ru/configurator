import { ITag } from "../interfaces";

export const EmptyTag: ITag = {
  id: null,
  children: null,
  isOpen: false,
  parentId: "",
  attributes: {
    cn: "",
    description: "",
    objectClass: "prsTag",
    prsJsonConfigString: "",
    prsActive: false,
    prsDefault: false,
    prsEntityTypeCode: 0,
    prsIndex: 0,
    prsArchive: false,
    prsCompress: false,
    prsMaxLineDev: 0,
    prsStep: false,
    prsUpdate: false,
    prsValueTypeCode: 0,
    prsDefaultValue: "",
    prsMeasureUnits: "",
  },
};
