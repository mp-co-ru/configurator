import { INode } from "../interfaces";

export const objectRootNode: INode = {
  id: "",
  attributes: {
    cn: "Объекты",
    objectClass: "prsObject",
    prsActive: false,
    prsDefault: false,
    description: "Объекты",
  },
  _internal: {
    children: [],
    isOpen: false,
    static: false,
  },
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
  _internal: {
    children: [],
    isOpen: false,
    static: false,
  },
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
  _internal: {
    children: [],
    isOpen: false,
    static: false,
  },
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
  _internal: {
    children: [],
    isOpen: false,
    static: false,
  },
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
  _internal: {
    children: [
      { ...objectRootNode },
      { ...tagRootNode },
      { ...dataStorageRootNode },
    ],
    isOpen: false,
    static: true,
  },
};
