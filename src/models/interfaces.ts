export interface IAttributes {
  [index: string]: any;
  cn: String;
  objectClass: objectClass;
  prsActive: Boolean;
  prsDefault: Boolean;
  description?: String;
  prsJsonConfigString?: String;
  prsEntityTypeCode?: Number;
  prsIndex?: Number;
}

export interface IInternalAttr {
  static: Boolean;
  isOpen: Boolean;
  children: INode[];
}

export type objectClass =
  | ""
  | "prsObject"
  | "prsTag"
  | "prsDataStorage"
  | "prsAlert";

export const defaultAttributes: IAttributes = {
  cn: "",
  objectClass: "",
  prsActive: false,
  prsDefault: false,
  description: "",
  prsJsonConfigString: "",
  prsEntityTypeCode: 0,
  prsIndex: 0,
};

export interface INode {
  [index: string | number]:
    | boolean
    | string
    | IAttributes
    | IInternalAttr
    | null;
  id: string;
  attributes: IAttributes;
  _internal: IInternalAttr;
}

export interface INodeCreate {
  parentId: String | null;
  attributes: IAttributes;
}

export interface IHierarchyTree extends INode {}

interface ITagAttributes extends IAttributes {
  prsArchive?: Boolean;
  prsCompress?: Boolean;
  prsMaxLineDev?: Number;
  prsStep?: Boolean;
  prsUpdate?: Boolean;
  prsValueTypeCode?: Number;
  prsDefaultValue?: String;
  prsMeasureUnits?: String;
}

export interface ITag extends Omit<INode, "attributes"> {
  parentId: string;
  attributes: ITagAttributes | null;
}

export interface IObject extends Omit<INode, "attributes"> {
  parentId: string;
  attributes: IAttributes | null;
}

export interface IAlert extends Omit<INode, "attributes"> {
  parentId: string;
  attributes: IAttributes | null;
}

export interface IDataStorage extends Omit<INode, "attributes"> {
  parentId: string;
  attributes: IAttributes | null;
}

export type formTypeOptions = "edit" | "create";
export type nodeTypes = "Object" | "Tag" | "Alert" | "DataStorage";
