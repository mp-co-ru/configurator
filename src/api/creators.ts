import { sendNode } from "../api/base";
import { IAttributes, objectClass } from "../components/interfaces";

export async function createNode(
  peresvetUrl: string,
  objClass: objectClass,
  attributes: IAttributes,
  parentId?: string | null
) {
  const objects = await sendNode(peresvetUrl, objClass, attributes, parentId);
  if (objects) {
    const rootObjects = objects;
    return rootObjects;
  }
  return null;
}
