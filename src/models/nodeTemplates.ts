import { IAlert, IDataStorage, IObject, ITag, IConnector } from "../components/interfaces";

export const EmptyTag: ITag = {
  id: null,
  children: [],
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

export const EmptyObject: IObject = {
  id: "",
  children: [],
  isOpen: false,
  parentId: "",
  _static: false,
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

export const EmptyAlert: IAlert = {
  id: "",
  children: [],
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

export const EmptyConnector: IConnector = {
  id: "",
  children: [],
  isOpen: false,
  parentId: "",
  attributes: {
    cn: "",
    description: "",
    objectClass: "prsConnector",
    prsJsonConfigString: "",
    prsActive: true,
    prsDefault: false
  },
};

export const EmptyDataStorage: IDataStorage = {
  id: "",
  children: [],
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
