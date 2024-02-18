import { IConnector } from "../interfaces";

export const EmptyAlert: IConnector = {
  id: "",
  children: null,
  isOpen: false,
  parentId: "",
  attributes: {
    cn: "",
    description: "",
    objectClass: "prsConnector",
    prsJsonConfigString: "",
    prsActive: false,
    prsDefault: false
  },
};
