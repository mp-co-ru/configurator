import { INode } from "../components/interfaces";

export const objectRootNode: INode = {
  id: "",
  attributes: {
    cn: "Objects",
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
    cn: "Tags",
    objectClass: "prsTag",
    prsActive: false,
    prsDefault: false,
    description: "Root Tag Node",
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
  children: [{ ...objectRootNode }, { ...tagRootNode }],
  isOpen: false,
  _static: true,
};
