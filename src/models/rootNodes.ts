import { INode } from "../components/interfaces";

export const objectRootNode: INode = {
  id: "",
  attributes: {
    cn: "Объекты",
    objectClass: "prsObject",
    prsActive: false,
    prsDefault: false,
    description: "Root Object Node",
  },
  children: [],
  isOpen: false,
  _static: false,
};

export const tagRootNode: INode = {
  id: "",
  attributes: {
    cn: "Теги",
    objectClass: "prsTag",
    prsActive: false,
    prsDefault: false,
    description: "Root Tag Node",
  },
  children: [],
  isOpen: false,
  _static: false,
};

export const alertsRootNode: INode = {
  id: "",
  attributes: {
    cn: "Тревоги",
    objectClass: "prsAlert",
    prsActive: false,
    prsDefault: false,
    description: "Root Alerts Node",
  },
  children: [],
  isOpen: false,
  _static: false,
};

export const dataStorageRootNode: INode = {
  id: "",
  attributes: {
    cn: "Хранилища данных",
    objectClass: "prsDataStorage",
    prsActive: false,
    prsDefault: false,
    description: "Root DataStorage Node",
  },
  children: [],
  isOpen: false,
  _static: false,
};

export const rootNode: INode = {
  id: "",
  attributes: {
    cn: "Root",
    objectClass: "",
    prsActive: false,
    prsDefault: false,
    description: "Root Node",
  },
  children: [
    { ...objectRootNode },
    { ...tagRootNode },
    { ...dataStorageRootNode },
    { ...alertsRootNode },
  ],
  isOpen: false,
  _static: true,
};
