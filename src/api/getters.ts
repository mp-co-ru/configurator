import { INode, defaultAttributes, objectClass } from "../components/interfaces";
import { getNode/*, getServiceEndpoint*/ } from "./base";
import { objectRootNode,
  tagRootNode,
  dataStorageRootNode,
  connectorRootNode } from "../models/rootNodes"

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

/*
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
*/

export async function getChildren(
  peresvetUrl: string,
  childrenRequest: string,
  objClass: objectClass,
  id: string
): Promise<INode[]> {
  try {
    let children: INode[] = []

    if ((objClass === "") && (id === "")) {
      // особый случай. узел - корневой
      children.push(objectRootNode)
      children.push(tagRootNode)
      children.push(dataStorageRootNode)
      children.push(connectorRootNode)

      return children
    }

    // обработаем случаи, когда создаются вспомогательные узлы
    if (id !== "") {
      if (objClass === "prsObject") {
        // кликаем на объект
        children.push({
          id: "",
          getChildrenRequest: `/v1/objects/?q={"base":"${id}"}`,
          attributes: { ...defaultAttributes,
            cn: "Объекты",
            objectClass: "prsObject"
          },
          children: [],
          isOpen: false,
          _static: true
        } as INode );

        children.push({
          id: "",
          getChildrenRequest: `/v1/tags/?q={"base":"${id}"}`,
          attributes: { ...defaultAttributes,
            cn: "Теги",
            objectClass: "prsTag"
          },
          children: [],
          isOpen: false,
          _static: true
        } as INode );
      }
    } else { // то есть id = "", то есть это - вспомогательный узел
      children = children.concat(await getNode(peresvetUrl!, childrenRequest!));
      /*
      if (children.length > 0) {
        let child_class = children[0].attributes["objectClass"];
        let end_point = getServiceEndpoint(child_class);
        children.forEach(
          function (child) {
            child.getChildrenRequest = `http://${peresvetUrl}/${end_point}/?q={"base":${}}`
          }
        )
      }
      */
    }

    if (childrenRequest === "") {
      return [] as INode[];
    }

    return children;

    /*
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
    */
  } catch (e: any) {
    throw new PeresvetGetError(e.message);
  }
}
