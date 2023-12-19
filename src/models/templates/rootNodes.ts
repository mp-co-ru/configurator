import { INode } from "../interfaces";

export const objectRootNode: INode = {
  id: "",
  attributes: {
    cn: "Объекты",
    objectClass: "prsObject",
    prsActive: false,
    prsDefault: false,
    description: "Root Object Node",
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
    description: "Root Tag Node",
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
    description: "Root DataStorage Node",
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
