import { IDataStorage } from "../interfaces";

export const EmptyDataStorage: IDataStorage = {
  id: "",
  children: null,
  isOpen: false,
  parentId: "",
  attributes: {
    cn: "",
    description: "",
    objectClass: "prsDataStorage",
    prsJsonConfigString: "",
    prsActive: false,
    prsDefault: false,
    prsEntityTypeCode: 0,
    prsIndex: 0,
  },
};
