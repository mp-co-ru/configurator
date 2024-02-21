import { INode, objectClass } from "../components/interfaces";
import { getNode } from "./base";

class PeresvetGetError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function getRootObjects(peresvetUrl: string) {
  try {
    const objects = await getNode(peresvetUrl, "prsObject");
    const rootObjects = objects;
    return rootObjects;
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}

export async function getRootTags(peresvetUrl: string) {
  try {
    const tags = await getNode(peresvetUrl, "prsTag");
    const rootTags = tags;
    return rootTags;
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}

export async function getChildren(
  peresvetUrl: string,
  objClass: objectClass,
  id: string
): Promise<INode[]> {
  try {
    if (objClass === "prsObject" && id) {
      const objectChildren = await getNode(peresvetUrl!, objClass, 1, id);
      const tagChildren = await getNode(peresvetUrl!, "prsTag", 1, id);
      return objectChildren.concat(tagChildren);
    } else if (objClass === "prsTag" && id) {
      const alertChildren = await getNode(peresvetUrl!, "prsAlert", 1, id);
      return alertChildren;
    } else {
      const children = await getNode(peresvetUrl!, objClass, 1, id);
      return children;
    }
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}
