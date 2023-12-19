import { IObject } from "../interfaces";

export const EmptyObject: IObject = {
  id: "",
  children: null,
  isOpen: false,
  parentId: "",
  attributes: {
    cn: "",
    description: "",
    objectClass: "prsObject",
    prsJsonConfigString: "",
    prsActive: false,
    prsDefault: false,
    prsEntityTypeCode: 0,
    prsIndex: 0,
  },
};
