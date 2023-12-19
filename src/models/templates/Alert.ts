import { IAlert } from "../interfaces";

export const EmptyAlert: IAlert = {
  id: "",
  children: null,
  isOpen: false,
  parentId: "",
  attributes: {
    cn: "",
    description: "",
    objectClass: "prsAlert",
    prsJsonConfigString: "",
    prsActive: false,
    prsDefault: false,
    prsEntityTypeCode: 0,
    prsIndex: 0,
  },
};
