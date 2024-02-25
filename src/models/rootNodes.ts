import { INode } from "../components/interfaces";

export const objectRootNode: INode = {
  id: "",
  attributes: {
    cn: "Объекты",
    objectClass: "prsObject",
    prsActive: false,
    prsDefault: false,
    description: "Объекты",
  },
  children: [],
  isOpen: false,
  _static: true,
};

export const tagRootNode: INode = {
  id: "",
  attributes: {
    cn: "Теги",
    objectClass: "prsTag",
    prsActive: false,
    prsDefault: false,
    description: "Теги",
  },
  children: [],
  isOpen: false,
  _static: true,
};

export const dataStorageRootNode: INode = {
  id: "",
  attributes: {
    cn: "Хранилища данных",
    objectClass: "prsDataStorage",
    prsActive: false,
    prsDefault: false,
    description: "Хранилища данных",
  },
  children: [],
  isOpen: false,
  _static: true,
};

export const connectorRootNode: INode = {
  id: "",
  attributes: {
    cn: "Коннекторы",
    objectClass: "prsConnector",
    prsActive: false,
    prsDefault: false,
    description: "Коннекторы",
  },
  children: [],
  isOpen: false,
  _static: true,
};

export const rootNode: INode = {
  id: "",
  attributes: {
    cn: "Модель",
    objectClass: "",
    prsActive: false,
    prsDefault: false,
    description: "Root Node",
  },
  children: [],
  isOpen: false,
  _static: true,
};
